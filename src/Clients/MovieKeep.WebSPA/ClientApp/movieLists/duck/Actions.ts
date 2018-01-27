import { IMovieListItem } from "../../common/IMovieListItem";
import { IMovieDetail } from "../../common/IMovieDetail";
import { Types }  from "./ActionTypes";

export interface RequestNowPlayingMoviesAction {
    type: Types.REQUEST_NOW_PLAYING_MOVIES;
    page: number;
}

export interface ReceiveNowPlayingMoviesAction {
    type: Types.RECEIVE_NOW_PLAYING_MOVIES;
    page: number;
    movies: IMovieListItem[];
}


