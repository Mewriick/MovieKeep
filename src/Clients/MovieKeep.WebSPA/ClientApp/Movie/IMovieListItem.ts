import DateTime from "typescript-dotnet-system/System/Time/DateTime";

export interface IMovieListItem {
    title: string;
    tmdbId: number;
    releaseDate?: DateTime;  
    overview: string;
    socialInfoPopularity: number;
    socialInfoVoteAverage: number;
    posterUrl: string;
}