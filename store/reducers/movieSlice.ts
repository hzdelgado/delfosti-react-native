import { createSlice } from '@reduxjs/toolkit'
import res from "../../assets/data/dummy-movies.json";

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    list: res.movies,
  },
  reducers: {
    
    addMovie: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.list = [...state.list, action.payload];
    },

  },
})

// Action creators are generated for each case reducer function
export const { addMovie } = movieSlice.actions

export default movieSlice.reducer