import * as Actions from "./Actions";
import { NullMovieDetail } from '../../common/IMovieDetail';
import * as ActionCreators from "./ActionCreators";
import { Action, Reducer, ActionCreator } from 'redux';
import { Types } from "./ActionTypes";

type KnownAction = Actions.ReceivetMovieDetailAction | Actions.RequestMovieDetailAction;

const unloadedState: ActionCreators.MovieDetailState = {
    movie: new NullMovieDetail(), id: 0, isLoading: false
};

export const reducer: Reducer<ActionCreators.MovieDetailState> = (state: ActionCreators.MovieDetailState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case Types.REQUEST_MOVIE_DETAIL:
            return {
                id: action.id,
                movie: state.movie,
                isLoading: true
            };
        case Types.RECEIVE_MOVIE_DETAIL:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.id === state.id) {
                return {
                    id: action.id,
                    movie: action.movie,
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