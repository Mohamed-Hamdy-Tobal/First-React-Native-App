import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import image from "./assets/f1.jpg";

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image1} />
      <Image
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        style={styles.image2}
        resizeMode="contain"
      />
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        Open up App.js to start working on your app!
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={(text) => console.log(text)}
        placeholderTextColor={"#888"}
        keyboardType="default"
        secureTextEntry={false}
        autoCapitalize="words"
        multiline={false}
        numberOfLines={1}
        maxLength={50}
      />
      <TextInput
        value="Pre-filled text"
        editable={false}
        style={[styles.input, { backgroundColor: "#f0f0f0" }]}
        placeholder="Type here..."
        onChangeText={(text) => console.log(text)}
        placeholderTextColor={"#888"}
        keyboardType="default"
        secureTextEntry={false}
        autoCapitalize="words"
        multiline={false}
        numberOfLines={1}
        maxLength={50}
      />
      <Button
        title="Press me"
        onPress={() => {
          alert("Button pressed!");
          console.log("Button was pressed");
        }}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.header}>🚀 Scroll Down</Text>

        {/* Example of multiple boxes */}
        {Array.from({ length: 20 }).map((_, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.text}>Item {index + 1}</Text>
          </View>
        ))}

        <Text style={styles.footer}>🎉 You reached the bottom!</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  image1: {
    width: "100%",
    height: 100,
  },
  image2: {
    width: 164,
    height: 64,
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "80%",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  box: {
    backgroundColor: "#0A47C4",
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  footer: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
  },
  scrollView: {
    width: "100%",
    
  }
});
