import React from "react";
import { Pressable, Text, ToastAndroid, View } from "react-native";

const ToastComponent = () => {
  const showToast = () => {
    ToastAndroid.show("This is a toast message", ToastAndroid.SHORT);
    ToastAndroid.showWithGravity(
      "This is a centered toast",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    ToastAndroid.showWithGravityAndOffset(
      "This is an offset toast",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      100
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable
        onPress={showToast}
        style={{ padding: 10, backgroundColor: "blue", borderRadius: 5 }}
      >
        <Text style={{ color: "white" }}>Show Toast</Text>
      </Pressable>
    </View>
  );
};

export default ToastComponent;
