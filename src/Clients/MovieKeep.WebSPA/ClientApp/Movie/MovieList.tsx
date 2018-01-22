import * as React from 'react';
import { IMovieListItem } from "./IMovieListItem";
import { MovieListItem } from "./MovieListItem";

interface IMovieListProps {
    movies: IMovieListItem[];
}

export class MovieList extends React.Component<IMovieListProps, {}> {
    public render() {
        const { movies } = this.props as IMovieListProps;

        return (
            <div>
                { this.movieListItems() }
            </div>
        );
    }

    private movieListItems() {
        if (!this.props.movies.length)
            return;

        return this.props.movies.map((m, i) => {
            return (
                <MovieListItem key={m.tmdbId.toString()} movie={m} />
            )
        })
    }
} 