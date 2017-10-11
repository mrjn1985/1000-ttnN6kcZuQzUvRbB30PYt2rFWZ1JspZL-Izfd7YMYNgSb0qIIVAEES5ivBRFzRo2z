import * as types from "../../constants/actionTypes";
import initialState from "../../reducers/initialState";

export default function (state = initialState.movies, action) {
  switch (action.type) {

    case types.RETRIEVE_GENRES_SUCCESS:
      return {
          ...state, 
          genres: action.genres
      } 

    case types.RETRIEVE_MOVIES_GENRES_SUCCESS:
      return {
        ...state,
        genres: action.moviesGenres
      };

    default:
      return state;
  }
}
