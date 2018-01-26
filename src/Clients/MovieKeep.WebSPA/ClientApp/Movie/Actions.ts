import { IMovieListItem } from "../common/IMovieListItem";
import { IMovieDetail } from "../common/IMovieDetail";
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

export interface RequestMovieDetailAction {
    type: Types.REQUEST_MOVIE_DETAIL;
    id: number;
}

export interface ReceivetMovieDetailAction {
    type: Types.RECEIVE_MOVIE_DETAIL;    
    movie: IMovieDetail;
}

