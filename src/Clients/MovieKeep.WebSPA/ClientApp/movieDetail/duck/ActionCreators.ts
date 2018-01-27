import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from '../../store';
import { IMovieListItem } from "../../common/IMovieListItem";
import { IMovieDetail } from "../../common/IMovieDetail";
import * as Actions from "./Actions";
import { Types } from "./ActionTypes";

export interface MovieDetailState {
    movie: IMovieDetail;
    isLoading: boolean;
    id: number;
}

type KnownAction = Actions.ReceivetMovieDetailAction | Actions.RequestMovieDetailAction;

export const actionCreators = {
    requestMovieDetail: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (getState().movieDetail.movie === undefined || id !== getState().movieDetail.movie.tmdbId) {
            let fetchTask = fetch(`http://localhost:55207/api/movie/${id}`)
                .then(response => response.json() as Promise<IMovieDetail>)
                .then(data => {
                    dispatch({ type: Types.RECEIVE_MOVIE_DETAIL, id: id,  movie: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: Types.REQUEST_MOVIE_DETAIL, id: id });
        }
    }
};