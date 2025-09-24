import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  DrawerLayoutAndroid,
} from "react-native";

export default function DrawerLayoutComponent() {
  // create a ref to control the drawer
  const drawer = useRef(null);

  // This is what will show inside the Drawer (menu content)
  const navigationView = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerTitle}>📂 Drawer Menu</Text>
      <Button title="Go to Home" onPress={() => drawer.current.closeDrawer()} />
      <Button
        title="Go to Profile"
        onPress={() => drawer.current.closeDrawer()}
      />
      <Button
        title="Close Drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={250} // width of the drawer
      drawerPosition="left" // 'left' or 'right'
      renderNavigationView={navigationView} // what drawer shows
      onDrawerOpen={() => console.log("Drawer is opened")}
      onDrawerClose={() => console.log("Drawer is closed")}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to DrawerLayoutAndroid!</Text>
        <Button
          title="Open Drawer"
          onPress={() => drawer.current.openDrawer()}
        />
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
    paddingTop: 60,
  },
  drawerTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});
