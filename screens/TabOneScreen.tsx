import { StyleSheet, View } from "react-native";
import ListMovies from "../features/ListMovies/ListMovies";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ListMovies />
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
