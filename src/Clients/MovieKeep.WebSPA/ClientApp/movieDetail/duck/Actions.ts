import { IMovieListItem } from "../../common/IMovieListItem";
import { IMovieDetail } from "../../common/IMovieDetail";
import { Types }  from "./ActionTypes";

export interface RequestMovieDetailAction {
    type: Types.REQUEST_MOVIE_DETAIL;
    id: number;
}

export interface ReceivetMovieDetailAction {
    type: Types.RECEIVE_MOVIE_DETAIL; 
    id: number;
    movie: IMovieDetail;
}

