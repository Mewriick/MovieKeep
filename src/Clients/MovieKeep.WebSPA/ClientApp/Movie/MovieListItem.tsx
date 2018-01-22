import * as React from 'react';
import { IMovieListItem } from "./IMovieListItem";


interface IMovieListItemProps {
    movie: IMovieListItem;
}

export class MovieListItem extends React.Component<IMovieListItemProps, {}> {
    public render() {

        const { movie } = this.props as IMovieListItemProps;

        return (
            <div>
                { movie.title }
            </div>
        );
    }
}