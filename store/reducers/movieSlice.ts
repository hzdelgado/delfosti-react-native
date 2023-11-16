import { createSlice } from '@reduxjs/toolkit'
import res from "../../assets/data/dummy-movies.json";

//Al refrescar, los cambios se perderan y el utilizara el estado inicial. Este no seria el caso en un escenario en donde se obtiene la data del backend.
export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    list: res.movies,
  },
  reducers: {
    addMovie: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    updateMovie: (state, action) => {
      var founds = state.list.filter(item => item.id != action.payload.id);
      state.list = [...founds, action.payload];
    },
  },
})

export const { addMovie, updateMovie } = movieSlice.actions

export default movieSlice.reducer