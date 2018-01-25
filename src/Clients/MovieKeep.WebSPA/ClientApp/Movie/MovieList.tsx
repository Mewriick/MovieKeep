import * as React from 'react';
import { IMovieListItem } from './IMovieListItem';
import MovieListItem from './MovieListItem';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import { StyleRules, Theme, withStyles, WithStyles } from "material-ui/styles";

interface IMovieListProps {
    movies: IMovieListItem[];
}

type MovieListProps = IMovieListProps & WithStyles<"root" | "grid">;

const styles = (theme: Theme): StyleRules => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.contentFrame,
        marginTop: theme.spacing.unit * 1.5
    },
    grid: {
        width: "55vw",
        height: "100%",
    },
});

class MovieList extends React.Component<MovieListProps, {}> {
    public render() {
        const { movies } = this.props as IMovieListProps;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.grid}>
                    {this.movieListItems()}
                </GridList>
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

export default withStyles(styles, { withTheme: true })<IMovieListProps>(MovieList);