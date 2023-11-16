import { createSlice } from '@reduxjs/toolkit'
import res from "../../assets/data/dummy-movies.json";

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    list: res.movies,
  },
  reducers: {
    addMovie: (state, action) => {
      state.list = [...state.list, action.payload];
    },
  },
})

export const { addMovie } = movieSlice.actions

export default movieSlice.reducer