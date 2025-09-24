import React from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Platform,
  ActionSheetIOS,
  Alert,
} from "react-native";

export default function ActionSheetIOSComponent() {
  const showOptions = () => {
    if (Platform.OS === "ios") {
      // 📱 Native ActionSheet for iOS
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: "Choose an option",
          options: ["Cancel", "Option 1", "Option 2", "Delete"],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 3,
        },
        (buttonIndex) => {
          handleSelection(buttonIndex);
        }
      );
    } else {
      // 🤖 Use Alert for Android as a fallback
      Alert.alert(
        "Choose an option",
        "",
        [
          { text: "Option 1", onPress: () => handleSelection(1) },
          { text: "Option 2", onPress: () => handleSelection(2) },
          { text: "Delete", onPress: () => handleSelection(3), style: "destructive" },
          { text: "Cancel", onPress: () => handleSelection(0), style: "cancel" },
        ],
        { cancelable: true }
      );
    }
  };

  const handleSelection = (index) => {
    switch (index) {
      case 0:
        Alert.alert("❌ Cancel pressed");
        break;
      case 1:
        Alert.alert("✅ Option 1 selected");
        break;
      case 2:
        Alert.alert("✅ Option 2 selected");
        break;
      case 3:
        Alert.alert("⚠️ Delete pressed");
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🌍 Cross-Platform ActionSheet</Text>
      <Button title="Show Options" onPress={showOptions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
  },
});
