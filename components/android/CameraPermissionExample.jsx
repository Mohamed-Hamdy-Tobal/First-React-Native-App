import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  Platform,
} from "react-native";

export default function CameraPermissionExample() {
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState("unknown");

  // Check current permission status on component mount
  useEffect(() => {
    checkCurrentPermission();
  }, []);

  const checkCurrentPermission = async () => {
    if (Platform.OS !== "android") return;

    try {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      console.log("Current camera permission status:", hasPermission);
      setHasPermission(hasPermission);
      setPermissionStatus(hasPermission ? "granted" : "not granted");
    } catch (error) {
      console.log("Error checking permission:", error);
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS !== "android") {
      Alert.alert("Camera", "Camera permission is only for Android demo.");
      return;
    }

    try {
      // First check if we already have permission
      const currentPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      
      console.log("Permission check before request:", currentPermission);
      
      if (currentPermission) {
        console.log("Permission already granted");
        setHasPermission(true);
        setPermissionStatus("already granted");
        Alert.alert("✅ Already Granted", "Camera permission already granted!");
        return;
      }

      // Request permission
      console.log("Requesting camera permission...");
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message:
            "This app needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      // Enhanced logging with all possible results
      console.log("===== PERMISSION REQUEST RESULT =====");
      console.log("Raw result:", granted);
      console.log("Result type:", typeof granted);
      console.log("GRANTED constant:", PermissionsAndroid.RESULTS.GRANTED);
      console.log("DENIED constant:", PermissionsAndroid.RESULTS.DENIED);
      console.log("NEVER_ASK_AGAIN constant:", PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN);
      console.log("Are they equal (GRANTED)?", granted === PermissionsAndroid.RESULTS.GRANTED);
      console.log("Are they equal (DENIED)?", granted === PermissionsAndroid.RESULTS.DENIED);
      console.log("Are they equal (NEVER_ASK_AGAIN)?", granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN);
      console.log("=====================================");

      // Handle the result
      switch (granted) {
        case PermissionsAndroid.RESULTS.GRANTED:
          console.log("✅ Camera permission granted");
          setHasPermission(true);
          setPermissionStatus("granted");
          Alert.alert("✅ Success", "Camera permission granted!");
          break;

        case PermissionsAndroid.RESULTS.DENIED:
          console.log("❌ Camera permission denied");
          setHasPermission(false);
          setPermissionStatus("denied");
          Alert.alert("❌ Denied", "Camera permission denied.");
          break;

        case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
          console.log("⚠️ Camera permission set to never ask again");
          setHasPermission(false);
          setPermissionStatus("never ask again");
          Alert.alert(
            "⚠️ Blocked", 
            "Camera permission blocked. Please enable it in Settings > Apps > [Your App] > Permissions."
          );
          break;

        default:
          console.log("🤔 Unexpected permission result:", granted);
          setPermissionStatus(`unexpected: ${granted}`);
          Alert.alert("🤔 Unexpected", `Unexpected result: ${granted}`);
      }

      // Double-check the actual permission status after request
      const finalPermissionCheck = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      console.log("Final permission check:", finalPermissionCheck);

    } catch (err) {
      console.warn("Permission request error:", err);
      Alert.alert("Error", "Failed to request permission: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📸 Camera Permission Debug</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Current Status:</Text>
        <Text style={styles.statusValue}>{permissionStatus}</Text>
      </View>

      <Button title="Check Permission" onPress={checkCurrentPermission} />
      <View style={styles.buttonSpacing} />
      <Button title="Request Camera Permission" onPress={requestCameraPermission} />
      
      {hasPermission && (
        <Text style={styles.success}>Camera Ready ✅</Text>
      )}

      <View style={styles.debugInfo}>
        <Text style={styles.debugTitle}>Debug Info:</Text>
        <Text style={styles.debugText}>Platform: {Platform.OS}</Text>
        <Text style={styles.debugText}>Has Permission: {hasPermission.toString()}</Text>
        <Text style={styles.debugText}>
          Check your console logs for detailed permission flow
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  statusContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  statusValue: {
    fontSize: 16,
    color: "#666",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  buttonSpacing: {
    height: 10,
  },
  success: {
    marginTop: 20,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  debugInfo: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 8,
    width: "100%",
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  debugText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});