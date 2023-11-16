import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../../store/reducers/movieSlice";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { Provider } from "react-redux";
import ListMovies from "./ListMovies";

it("should display correct movie quantity", () => {
  const store = configureStore({
    reducer: {
      movie: movieReducer,
    },
  });

  const { getByTestId } = render(
    <Provider store={store}>
      <ListMovies />
    </Provider>
  );

  const movieList = getByTestId("movieList");
  expect(movieList.children).toHaveLength(6);
});
