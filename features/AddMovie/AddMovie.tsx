import React, { useEffect } from "react";
import {
  Controller,
  FieldValues,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addMovie } from "../../store/reducers/movieSlice";
import { Movie } from "../../models/movie";

const AddMovie = () => {
  const movies = useAppSelector((state: any) => state.movie.list);
  const dispatch = useAppDispatch();
  const [formError, setError] = React.useState<Boolean>(false);
  const { handleSubmit, control, reset, setValue } = useForm();
  const onSubmit = (data: FieldValues) => {

    const found = movies.filter(
      (item: any) =>
        item.title.toLowerCase() == data.title.toLowerCase() ||
        item.description.toLowerCase() == data.description.toLowerCase()
    );
    if (found.length > 0) {
      Alert.alert("La pelicula ya esta registrada");
      setError(false);
      return;
    }

    if (formError) {
      return;
    }

    const movie = data as Movie;
    dispatch(addMovie(movie));
    Alert.alert("Registro exitoso");
    setError(false);
    reset();
  };

  const onError: SubmitErrorHandler<any> = (errors, e) => {
    if (errors != null) {
      setError(true);
    } else {
      setError(false);
    }
    return;
  };

  return (
    <View style={styles.container}>
      {formError && (
        <View>
          <Text testID="errorMsg" style={{ color: "red" }}>
            Todos los campos son requeridos.
          </Text>
        </View>
      )}
      {
        <SafeAreaView>
          <Text style={styles.label}>Título</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                testID="title"
              />
            )}
            name="title"
            rules={{ required: true }}
          />

          <Text style={styles.label}>Descripción</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                multiline
                numberOfLines={4}
                style={styles.textArea}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                testID="description"
              />
            )}
            name="description"
            rules={{ required: true }}
          />
          <Text style={styles.label}>Imagen (URL)</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                testID="image"
              />
            )}
            name="poster"
            rules={{ required: true }}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={styles.button}>
              <Button
                title="Crear"
                onPress={handleSubmit(onSubmit, onError)}
                testID="createBtn"
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Limpiar"
                onPress={() => {
                  reset();
                }}
                testID="cleanBtn"
              />
            </View>
          </View>
        </SafeAreaView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  button: {
    flex: 1,
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "white",
    borderRadius: 4,
  },
  textArea: {
    height: 60,
    margin: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#949492",
    padding: 10,
  },

  label: {
    color: "black",
    margin: 10,
    marginLeft: 0,
  },
  input: {
    height: 40,
    margin: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#949492",
    padding: 10,
  },
});

export default AddMovie;
