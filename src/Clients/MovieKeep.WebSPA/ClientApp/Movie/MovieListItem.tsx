import * as React from 'react';
import { compose } from 'recompose';
import { StyleRules, Theme, withStyles, WithStyles  } from "material-ui/styles";
import { IMovieListItem } from './IMovieListItem';
import Card, { CardMedia } from 'material-ui/Card';


interface IMovieListItemProps {
    movie: IMovieListItem;
}

type MovieListItemProps = IMovieListItemProps & WithStyles<"card" | "details" | "cover">;

const styles = (theme: Theme): StyleRules => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 180,
        height: 280,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    }
});


class MovieListItem extends React.Component<MovieListItemProps, {}> {
    public render() {

        const { movie } = this.props as IMovieListItemProps;
        const { classes } = this.props;

        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cover}
                        image={movie.posterUrl}
                        title={movie.title} />
                </Card>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })<IMovieListItemProps>(MovieListItem);