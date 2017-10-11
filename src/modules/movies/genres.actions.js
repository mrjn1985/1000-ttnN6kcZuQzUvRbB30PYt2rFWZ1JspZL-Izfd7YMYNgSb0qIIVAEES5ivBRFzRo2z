import axios from 'axios';
import * as types from '../../constants/actionTypes';
import { TMDB_URL, TMDB_API_KEY } from '../../constants/api';

// GENRES
export function retrieveMoviesGenresSuccess(res) {
	return {
		type: types.RETRIEVE_MOVIES_GENRES_SUCCESS,
		genres: res.data
	};
}

export function retrieveMoviesGenres() {
	return function (dispatch) {
		return axios.get(`${TMDB_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)
		.then(res => {
			dispatch(retrieveMoviesGenresSuccess(res));
		})
		.catch(error => {
			console.log(error); //eslint-disable-line
		});
	};
}