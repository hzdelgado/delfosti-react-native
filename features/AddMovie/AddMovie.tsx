import React from "react";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../../store/reducers/movieSlice";

const AddMovie = () => {
  const movies = useSelector((state: any) => state.movie.list);
  const dispatch = useDispatch();
  const [formError, setError] = React.useState<Boolean>(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    const found = movies.filter((item: any) => item.title.toLowerCase() == data.title.toLowerCase() || item.description.toLowerCase() == data.description.toLowerCase());
    if(found) {
      Alert.alert("La pelicula ya esta registrada");
      return;
    }
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
          <Text style={{ color: "red" }}>Todos los campos son requeridos.</Text>
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
              />
            )}
            name="image"
            rules={{ required: true }}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={styles.button}>
              <Button title="Crear" onPress={handleSubmit(onSubmit, onError)} />
            </View>
            <View style={styles.button}>
              <Button title="Limpiar" onPress={() => reset()} />
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
