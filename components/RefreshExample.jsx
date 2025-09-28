import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";

const RefreshExample = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle refresh
  const onRefresh = () => {
    setRefreshing(true);

    // simulate fetching data from API
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.text}>Pull down to refresh 👇</Text>
      <Text style={styles.text}>Data will reload here...</Text>
      <Text style={styles.text}>This is just a demo</Text>
    </ScrollView>
  );
};

export default RefreshExample;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});
