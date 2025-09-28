import React, { useState } from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

const SimpleModal = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Button to show modal */}
      <Button title="Open Modal" onPress={() => setVisible(true)} />

      {/* Modal */}
      <Modal
        transparent // dim background
        visible={visible}
        animationType="fade" // [fade, slide, none]
        onRequestClose={() => setVisible(false)} // for Android back button
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.text}>Hello 👋 This is a modal!</Text>
            <Button title="Close" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SimpleModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // dim background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  text: {
    marginBottom: 15,
    fontSize: 16,
  },
});
