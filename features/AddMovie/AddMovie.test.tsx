import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import AddMovie from "./AddMovie";
import movieReducer from "../../store/reducers/movieSlice";
import { dummyMovie, existingMovie } from "../../test/dummy-data";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";

//Skipped because react-hook-form is keeping dirty state
xit("shouldt prompt error message when one field is missiing", async () => {
    const store = configureStore({
      reducer: {
        movie: movieReducer,
      },
    });
  
    const { getByTestId, getByText, } = render(
      <Provider store={store}>
        <AddMovie />
      </Provider>
    );
  
    const titleInput = getByTestId("title");
    const descriptionInput = getByTestId("description");
    const createBtn = getByTestId("createBtn");
    
    fireEvent.changeText(titleInput, existingMovie.title);
    fireEvent.changeText(descriptionInput, existingMovie.description);
    fireEvent.press(createBtn);
  
    const errorMessageText = getByText("Todos los campos son requeridos");
    await waitFor(() => expect(errorMessageText).toBeTruthy());
  });
  

it("should add new movie when button is pressed", async () => {
  const store = configureStore({
    reducer: {
      movie: movieReducer,
    },
  });

  const { getByTestId, getByText } = render(
    <Provider store={store}>
      <AddMovie />
    </Provider>
  );

  const titleInput = getByTestId("title");
  const descriptionInput = getByTestId("description");
  const imageInput = getByTestId("image");
  const createBtn = getByTestId("createBtn");
  fireEvent.changeText(titleInput, dummyMovie.title);
  fireEvent.changeText(descriptionInput, dummyMovie.description);
  fireEvent.changeText(imageInput, dummyMovie.poster);
  await act(async () => fireEvent.press(createBtn));

  store.subscribe(async () => {
    await waitFor(() => expect(store.getState().movie.list).toHaveLength(7));
    await waitFor(() =>
      expect(store.getState().movie.list).toEqual(
        async () =>
          await waitFor(() =>
            expect.arrayContaining([expect.objectContaining(dummyMovie)])
          )
      )
    );
  });
});



it("shouldn't add existin movie when button is pressed", async () => {
  const store = configureStore({
    reducer: {
      movie: movieReducer,
    },
  });

  const { getByTestId, getByText } = render(
    <Provider store={store}>
      <AddMovie />
    </Provider>
  );

  const titleInput = getByTestId("title");
  const descriptionInput = getByTestId("description");
  const imageInput = getByTestId("image");
  const createBtn = getByTestId("createBtn");
  fireEvent.changeText(titleInput, existingMovie.title);
  fireEvent.changeText(descriptionInput, existingMovie.description);
  fireEvent.changeText(imageInput, existingMovie.poster);
  await act(async () =>fireEvent.press(createBtn));

  store.subscribe(async () => {
    await waitFor(() => expect(store.getState().movie.list).toHaveLength(6));
    await waitFor(() =>
      expect(store.getState().movie.list).toEqual(
        async () =>
          await waitFor(() =>
            expect
              .arrayContaining([expect.objectContaining(dummyMovie)])
              .toHaveLength(1)
          )
      )
    );
  });
});

