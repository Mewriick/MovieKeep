import * as Actions from "./Actions";
import * as ActionCreators from "./ActionCreators";
import { Action, Reducer, ActionCreator } from 'redux';
import { Types } from "./ActionTypes";

type KnownAction = Actions.ReceiveNowPlayingMoviesAction | Actions.RequestNowPlayingMoviesAction;

const unloadedState: ActionCreators.NowPlayingMoviesState = { movies: [], isLoading: false };

export const reducer: Reducer<ActionCreators.NowPlayingMoviesState> = (state: ActionCreators.NowPlayingMoviesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Types.REQUEST_NOW_PLAYING_MOVIES:
            return {
                page: action.page,
                movies: state.movies,
                isLoading: true
            };
        case Types.RECEIVE_NOW_PLAYING_MOVIES:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.page === state.page) {
                return {
                    page: action.page,
                    movies: action.movies,
                    isLoading: false
                };
            }
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};