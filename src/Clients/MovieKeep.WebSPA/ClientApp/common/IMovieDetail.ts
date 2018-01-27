import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";


export interface IMovieDetail {
    title: string;
    tmdbId: number;
    releaseDate: DateTime;
    overview: string;
    socialInfoPopularity: number;
    socialInfoVoteAverage: number;
    revenue: number;
    budget: number;
    posterPath: string;
    runtime: TimeSpan
}

export class NullMovieDetail implements IMovieDetail {
    revenue: number;
    budget: number;
    runtime: TimeSpan;
    title: string;
    releaseDate: any;
    overview: string;
    socialInfoPopularity: number;
    socialInfoVoteAverage: number;
    posterPath: string;
    tmdbId: number;
}