import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from '../store';
import { IMovieListItem } from "../common/IMovieListItem";
import { IMovieDetail } from "../common/IMovieDetail";
import * as Actions from "./Actions";
import { Types } from "./ActionTypes";

export interface NowPlayingMoviesState {
    isLoading: boolean;
    page?: number;
    movies: IMovieListItem[];
}

export interface MovieDetailState {
    movie: IMovieDetail;
}

type KnownAction = Actions.ReceiveNowPlayingMoviesAction | Actions.RequestNowPlayingMoviesAction;

export const actionCreators = {
    requestNowPlayingMovies: (page: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (page !== getState().nowPlayingMovies.page) {
            let fetchTask = fetch(`http://localhost:55207/api/movie`)
                .then(response => response.json() as Promise<IMovieListItem[]>)
                .then(data => {
                    dispatch({ type: Types.RECEIVE_NOW_PLAYING_MOVIES, page: page, movies: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: Types.REQUEST_NOW_PLAYING_MOVIES, page: page });
        }
    }
};

type KnownActionMovieDetail = Actions.ReceivetMovieDetailAction | Actions.RequestMovieDetailAction;

export const actionCreatorsMovieDetail = {
    requestNowPlayingMovies: (id: number): AppThunkAction<KnownActionMovieDetail> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (getState().movieDetail.movie.tmdbId === null && id !== getState().movieDetail.movie.tmdbId) {
            let fetchTask = fetch(`http://localhost:55207/api/movie/${id}`)
                .then(response => response.json() as Promise<IMovieDetail>)
                .then(data => {
                    dispatch({ type: Types.RECEIVE_MOVIE_DETAIL, movie: data});
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: Types.REQUEST_MOVIE_DETAIL, id: id });
        }
    }
};