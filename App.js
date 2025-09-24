import { View } from "react-native";
import { useExitApp } from "./hooks/useExitApp";
import ActionSheetIOSComponent from "./components/ios/ActionSheetIOSComponent";

const App = () => {
  useExitApp();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <ActionSheetIOSComponent />
    </View>
  );
};

export default App;

// 1:56