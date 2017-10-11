import { combineReducers } from "redux";
import movies from "../modules/movies/appreducers/movies.reducer";
import genres from "../modules/movies/appreducers/genres.reducer";

const rootReducer = combineReducers({ movies, genres });

export default rootReducer;
