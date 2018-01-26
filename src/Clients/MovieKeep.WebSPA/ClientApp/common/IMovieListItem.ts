import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

export interface IMovieListItem {
    title: string;
    tmdbId: number;
    releaseDate: DateTime;  
    overview: string;
    socialInfoPopularity: number;
    socialInfoVoteAverage: number;
    posterUrl: string;
}