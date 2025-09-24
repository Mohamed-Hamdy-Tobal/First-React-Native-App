import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";

const PostsList = () => {
  // State management
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  const POSTS_PER_PAGE = 20;

  // Fetch posts function
  const fetchPosts = async (skip = 0, isRefresh = false) => {
    try {
      console.log(`Fetching posts: skip=${skip}, limit=${POSTS_PER_PAGE}`);

      const response = await fetch(
        `https://dummyjson.com/posts?limit=${POSTS_PER_PAGE}&skip=${skip}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Fetched ${data.posts.length} posts, Total: ${data.total}`);

      setTotalPosts(data.total);

      if (isRefresh || skip === 0) {
        // If refreshing or first load, replace all posts
        setPosts(data.posts);
        setCurrentPage(1);
      } else {
        // If loading more, append new posts
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setCurrentPage((prev) => prev + 1);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err.message);

      // Show alert for user
      Alert.alert("Error", `Failed to load posts: ${err.message}`, [
        { text: "OK" },
      ]);
    }
  };

  // Initial load
  useEffect(() => {
    const loadInitialPosts = async () => {
      setLoading(true);
      await fetchPosts(0, true);
      setLoading(false);
    };

    loadInitialPosts();
  }, []);

  // Pull to refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    console.log("Refreshing posts...");
    await fetchPosts(0, true);
    setRefreshing(false);
  };

  // Load more posts handler
  const loadMorePosts = async () => {
    // Check if we have more posts to load
    if (loadingMore || posts.length >= totalPosts) {
      console.log("No more posts to load or already loading");
      return;
    }

    setLoadingMore(true);
    console.log("Loading more posts...");

    const skip = currentPage * POSTS_PER_PAGE;
    await fetchPosts(skip, false);

    setLoadingMore(false);
  };

  // Render individual post item
  const renderPost = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.postContainer}
        onPress={() => {
          console.log(`Pressed post: ${item.title}`);
          Alert.alert(
            "Post Details",
            `Title: ${item.title}\n\nViews: ${item.views}\nLikes: ${item.reactions.likes}`
          );
        }}
      >
        <View style={styles.postHeader}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <View style={styles.postMeta}>
            <Text style={styles.postId}>ID: {item.id}</Text>
            <Text style={styles.postViews}>{item.views} views</Text>
          </View>
        </View>

        <Text style={styles.postBody} numberOfLines={3}>
          {item.body}
        </Text>

        <View style={styles.tagsContainer}>
          {item.tags.map((tag, tagIndex) => (
            <View key={tagIndex} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.reactionsContainer}>
          <View style={styles.reaction}>
            <Text style={styles.reactionText}>👍 {item.reactions.likes}</Text>
          </View>
          <View style={styles.reaction}>
            <Text style={styles.reactionText}>
              👎 {item.reactions.dislikes}
            </Text>
          </View>
          <Text style={styles.userId}>User: {item.userId}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Render footer (loading more indicator)
  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.footerText}>Loading more posts...</Text>
      </View>
    );
  };

  // Render empty list component
  const renderEmpty = () => {
    if (loading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {error ? "Failed to load posts" : "No posts found"}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Main loading screen
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Posts ({posts.length}/{totalPosts})
        </Text>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        // Refresh control
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#007AFF"]} // Android
            tintColor="#007AFF" // iOS
            title="Pull to refresh"
            titleColor="#007AFF"
          />
        }
        // Pagination
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.1} // Trigger when 10% from bottom
        // Footer
        ListFooterComponent={renderFooter}
        // Empty state
        ListEmptyComponent={renderEmpty}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
        // Styling
        contentContainerStyle={
          posts.length === 0 ? styles.emptyListContainer : null
        }
        showsVerticalScrollIndicator={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    width: "100%",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },

  header: {
    flexDirection: "row",
    paddingTop: 50,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  refreshButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#007AFF",
    borderRadius: 6,
  },

  refreshButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  postContainer: {
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  postHeader: {
    marginBottom: 8,
  },

  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },

  postMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  postId: {
    fontSize: 12,
    color: "#666",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  postViews: {
    fontSize: 12,
    color: "#666",
  },

  postBody: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 12,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },

  tag: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },

  tagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },

  reactionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  reaction: {
    flexDirection: "row",
    alignItems: "center",
  },

  reactionText: {
    fontSize: 14,
    color: "#666",
    marginRight: 12,
  },

  userId: {
    fontSize: 12,
    color: "#999",
  },

  footerLoader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },

  footerText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyListContainer: {
    flexGrow: 1,
  },

  emptyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },

  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default PostsList;
