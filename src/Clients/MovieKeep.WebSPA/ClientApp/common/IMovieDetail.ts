import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

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
    runtimeMins: number;
    gendres: string[];
    actors: IMovieActor[];
    productionCountries: ICountry[];
    crew: IMovieCrew;
}

export interface IMovieActor {
    tmdbId: number;
    name: string;
    character: string;
    profileImageUrl: string;
    gender: number;
}

export interface IMovieWorker {
    tmdbId: number;
    name: string;
    gender: number;
    profileImageUrl: string;
}

export interface ICountry {
    code: string;
    name: string;
}

export interface IMovieCrew {
    directors: IMovieWorker[];
    writers: IMovieWorker[];
    musicComposers: IMovieWorker[];
    cameramen: IMovieWorker[];
}

export class NullMovieDetail implements IMovieDetail {
    crew: IMovieCrew;
    runtimeMins: number;
    productionCountries: ICountry[];
    actors: IMovieActor[];
    gendres: string[];
    revenue: number;
    budget: number;
    title: string;
    releaseDate: any;
    overview: string;
    socialInfoPopularity: number;
    socialInfoVoteAverage: number;
    posterPath: string;
    tmdbId: number;
}