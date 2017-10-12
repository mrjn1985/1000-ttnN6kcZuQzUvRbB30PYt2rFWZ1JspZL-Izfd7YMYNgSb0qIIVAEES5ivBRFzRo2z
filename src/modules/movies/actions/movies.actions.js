import axios from 'axios';
import * as types from '../../../constants/actionTypes';
import { TMDB_URL, TMDB_API_KEY } from '../../../constants/api';

// GENRES
export function retrieveGenresSuccess(res) {
	return {
		type: types.RETRIEVE_GENRES_SUCCESS,
		genres: res.data
	};
}

export function retrieveGenres() {
	return function (dispatch) {
		return axios.get(`${TMDB_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=vi-VN`)
		.then(res => {
			dispatch(retrieveGenresSuccess(res));
		})
		.catch(error => {
			console.log('retrieveGenres', error); //eslint-disable-line
		});
	};
}

export function retrieveMoviesGenresSuccess(res) {
	return {
		type: types.RETRIEVE_MOVIES_GENRES_SUCCESS,
		list: res.data
	};
}

export function retrieveMoviesGenres(genresId, page) {
	return function (dispatch) {
		return axios.get(`${TMDB_URL}/genre/${genresId}/movies?api_key=${TMDB_API_KEY}&page=${page}&language=vi-VN&include_adult=true&sort_by=created_at.desc`)
		.then(res => {
			dispatch(retrieveMoviesGenresSuccess(res));
		})
		.catch(error => {
			console.log('retrieveMoviesGenres', error); //eslint-disable-line
		});
	};
}

// POPULAR
export function retrievePopularMoviesSuccess(res) {
	return {
		type: types.RETRIEVE_POPULAR_MOVIES_SUCCESS,
		popularMovies: res.data
	};
}

export function retrievePopularMovies(page) {
	return function (dispatch) {
		return axios.get(`${TMDB_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}&language=vi-VN`)
		.then(res => {
			dispatch(retrievePopularMoviesSuccess(res));
		})
		.catch(error => {
			console.log('retrievePopularMovies', error); //eslint-disable-line
		});
	};
}

// NOW PLAYING
export function retrieveNowPlayingMoviesSuccess(res) {
	return {
		type: types.RETRIEVE_NOWPLAYING_MOVIES_SUCCESS,
		nowPlayingMovies: res.data
	};
}

export function retrieveNowPlayingMovies(page) {
	return function (dispatch) {
		return axios.get(`${TMDB_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}&language=vi-VN`)
		.then(res => {
			dispatch(retrieveNowPlayingMoviesSuccess(res));
		})
		.catch(error => {
			console.log('retrieveNowPlayingMovies', error); //eslint-disable-line
		});
	};
}

// MOVIES LIST
export function retrieveMoviesListSuccess(res) {
	return {
		type: types.RETRIEVE_MOVIES_LIST_SUCCESS,
		list: res.data
	};
}

export function retrieveMoviesList(type, page) {
	return function (dispatch) {
		return axios.get(`${TMDB_URL}/movie/${type}?api_key=${TMDB_API_KEY}&page=${page}&language=vi-VN`)
		.then(res => {
			dispatch(retrieveMoviesListSuccess(res));
		})
		.catch(error => {
			console.log('retrieveMoviesList', error); //eslint-disable-line
		});
	};
}

// SEARCH RESULTS
export function retrieveMoviesSearchResultsSuccess(res) {
	return {
		type: types.RETRIEVE_MOVIES_SEARCH_RESULT_SUCCESS,
		searchResults: res.data
	};
}

export function retrieveMoviesSearchResults(query, page) {
	return function (dispatch) {
		return axios.get(`${TMDB_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}&language=vi-VN`)
		.then(res => {
			dispatch(retrieveMoviesSearchResultsSuccess(res));
		})
		.catch(error => {
			console.log('retrieveMoviesSearchResults', error); //eslint-disable-line
		});
	};
}

// MOVIE DETAILS
export function retrieveMovieDetailsSuccess(res) {
	return {
		type: types.RETRIEVE_MOVIE_DETAILS_SUCCESS,
		details: res.data
	};
}

export function retrieveMovieDetails(movieId) {
	return function (dispatch) {
		return axios.get(`${TMDB_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=casts,images,videos`)
		.then(res => {
			dispatch(retrieveMovieDetailsSuccess(res));
		})
		.catch(error => {
			console.log('retrieveMovieDetails', error); //eslint-disable-line
		});
	};
}
