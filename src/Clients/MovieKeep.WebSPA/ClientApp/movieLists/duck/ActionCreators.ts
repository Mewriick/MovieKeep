import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from '../../store';
import { IMovieListItem } from "../../common/IMovieListItem";
import { IMovieDetail } from "../../common/IMovieDetail";
import * as Actions from "./Actions";
import { Types } from "./ActionTypes";
import { MovieDataBankApiUrl } from '../../common/ServiceUrls';

export interface NowPlayingMoviesState {
    isLoading: boolean;
    page?: number;
    movies: IMovieListItem[];
}

type KnownAction = Actions.ReceiveNowPlayingMoviesAction | Actions.RequestNowPlayingMoviesAction;

export const actionCreators = {    
    requestNowPlayingMovies: (page: number): AppThunkAction<KnownAction> => (dispatch, getState) => {        
        // Only load data if it's something we don't already have (and are not already loading)
        if (page !== getState().nowPlayingMovies.page) {
            let fetchTask = fetch(`${MovieDataBankApiUrl}api/movie`)
                .then(response => response.json() as Promise<IMovieListItem[]>)
                .then(data => {
                    dispatch({ type: Types.RECEIVE_NOW_PLAYING_MOVIES, page: page, movies: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: Types.REQUEST_NOW_PLAYING_MOVIES, page: page });
        }
    }
};

