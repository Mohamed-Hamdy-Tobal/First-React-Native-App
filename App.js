import { StatusBar, View } from "react-native";
import { useExitApp } from "./hooks/useExitApp";
import RefreshExample from "./components/RefreshExample";

const App = () => {
  useExitApp();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f00" animated />
      <RefreshExample />
    </View>
  );
};

export default App;
