import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { TabBarIcon } from "../../navigation/BottomTabNavigator";
import { updateMovie } from "../../store/reducers/movieSlice";

const ListMovies = () => {
  const movies = useSelector((state: any) => state.movie.list);
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View>
        {movies.map((movie: any, index: number) => {


          return (
            <View key={index} style={styles.container}>
              <View style={{ flexDirection: "row" }}>
              <View>
                  {!movie.favorite ? (
                    <TabBarIcon name="star-outline" color={Colors.favorite} />
                  ) : (
                    <TabBarIcon name="star" color={Colors.disabled} />
                  )}
                  <Text />
                </View>
                <Image
                  style={styles.image}
                  source={{
                    uri: movie.poster,
                  }}
                />
                <Text style={styles.title}>{movie.title}</Text>
              </View>
              <Text style={styles.subtitle}>{movie.description}</Text>
              <TouchableHighlight onPress={() => {
                movie = {...movie, favorite: !movie.favorite};
                console.log(movie);
                dispatch(updateMovie(movie));
              }}>
                
              </TouchableHighlight>
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
