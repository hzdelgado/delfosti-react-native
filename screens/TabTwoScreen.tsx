import { StyleSheet, View } from "react-native";
import AddMovie from "../features/AddMovie/AddMovie";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
     <AddMovie/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
});
