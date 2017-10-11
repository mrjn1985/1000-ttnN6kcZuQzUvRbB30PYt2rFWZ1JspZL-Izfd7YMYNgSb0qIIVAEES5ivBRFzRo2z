import { combineReducers } from "redux";
import movies from "../modules/movies/movies.reducer";
import genres from "../modules/movies/genres.reducer";

const rootReducer = combineReducers({ movies, genres });

export default rootReducer;
