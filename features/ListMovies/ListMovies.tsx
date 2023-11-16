import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";
import { TabBarIcon } from "../../navigation/BottomTabNavigator";
import { updateMovie } from "../../store/reducers/movieSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const ListMovies = () => {
  const movies = useAppSelector((state: any) => state.movie.list);
  const dispatch = useAppDispatch();

  return (
    <ScrollView>
      <View testID="movieList">
        {movies.map((movie: any, index: number) => {
          return (
            <View key={index} testID={index.toString()} style={styles.container}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={styles.image}
                  source={{
                    uri: movie.poster,
                  }}
                />
                <Text style={styles.title}>{movie.title}</Text>
              </View>
              <Text style={styles.subtitle}>{movie.description}</Text>

              <View style={{ flexDirection: "row", gap: 3 }}>
                <TouchableHighlight
                  key={`thumbsUp${index}`}
                  onPress={() => {
                    movie = { ...movie, favorite: 1 };
                    dispatch(updateMovie(movie));
                  }}
                >
                  <TabBarIcon name="thumbs-up" color={ movie.favorite == 1? "green": (movie.favorite == 2? "grey": "grey")} />
                </TouchableHighlight>

                <TouchableHighlight
                  onPress={() => {
                    movie = { ...movie, favorite: 2 };
                    dispatch(updateMovie(movie));
                  }}
                >
                  <TabBarIcon name="thumbs-down" color={ movie.favorite == 1? "grey": (movie.favorite == 2? "green": "grey")} />
                </TouchableHighlight>
              </View>
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
    gap: 5,
  },
  title: {
    padding: 20,
    fontSize: 20,
    fontWeight: "bold",
    overflow: "hidden",
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
