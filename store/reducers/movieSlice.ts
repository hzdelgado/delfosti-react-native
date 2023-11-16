import { createSlice } from '@reduxjs/toolkit'
import res from "../../assets/data/dummy-movies.json";
import { Movie } from '../../models/movie';


type State = {
  list: Movie[]
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    list: res.movies,
  },
  reducers: {
    addMovie: (state: State, action) => {
      const movies = [...state.list, action.payload];
      return {...state, list: movies};
    },
    updateMovie: (state: State, action) => {
      var founds = state.list.filter(item => item.id != action.payload.id);
      const movies = [...founds, action.payload];
      return {...state, list: movies};
    },
  },
})

export const { addMovie, updateMovie } = movieSlice.actions

export default movieSlice.reducer