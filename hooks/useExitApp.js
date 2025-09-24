import { useEffect } from "react";
import { BackHandler, Alert, Platform } from "react-native";

export const useExitApp = () => {
  useEffect(() => {
    // Function to handle back press
    const backAction = () => {
      Alert.alert(
        "Exit App",
        "Are you sure you want to exit the app?",
        [
          {
            text: "Cancel",
            onPress: () => {
              console.log("User cancelled exit");
              return true; // prevent exit
            },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              console.log("User confirmed exit");
              BackHandler.exitApp();
            },
            style: Platform.OS === "ios" ? "destructive" : "default",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            console.log("Alert dismissed");
            return true; // prevent exit when dismiss
          },
        }
      );

      return true; // prevent default behavior
    };

    // Add event listener
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    console.log("Back handler registered");

    // Cleanup
    return () => {
      console.log("Cleaning up back handler");
      backHandler.remove();
    };
  }, []);
};
