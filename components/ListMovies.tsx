import React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";

const ListMovies = () => {
  const movies = useSelector((state: any) => state.movie.list);
  return (
    <ScrollView>
      <View>
        {movies.map((movie: any, index: number) => {
          return (
            <View key={index} style={styles.container}>
              <View style={{ flexDirection: "row"}}>
                <Image
                  style={styles.image}
                  source={{
                    uri: movie.poster,
                  }}
                />
                <Text style={styles.title}>{movie.title}</Text>
              </View>
              <Text style={styles.subtitle}>{movie.description}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column",
    gap: 5
  },
  title: {
    padding: 20,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 120,
  },
  subtitle: {
    color: "#a6a4a1",
    padding: 20,
    fontSize: 13,
    marginTop: 5,
    textAlign: "justify",
  },
});

export default ListMovies;
