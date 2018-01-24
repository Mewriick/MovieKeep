import * as React from 'react';
import { compose } from 'recompose';
import { StyleRules, Theme, withStyles, WithStyles } from "material-ui/styles";
import { IMovieListItem } from './IMovieListItem';
import Card, { CardMedia, CardContent, CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import DateRangeIcon from 'material-ui-icons/DateRange';
import StarIcon from 'material-ui-icons/Star';

interface IMovieListItemProps {
    movie: IMovieListItem;
}

type MovieListItemProps = IMovieListItemProps & WithStyles<"root" | "card" | "details" | "cover"
    | "content" | "overview" | "info">;

const styles = (theme: Theme): StyleRules => ({
    card: {
        display: 'flex',
        margin: 5,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        maxWidth: 300,
        maxHeight: 280,
    },
    cover: {
        width: 180,
        height: 280,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    overview: {
        marginTop: 10,
        marginBottom: 'calc(25% - 10px)',
    },
    info: {
        float: 'right',
        marginTop: theme.spacing.unit * 2
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
                    <CardContent className={classes.content}>
                        <Typography type="headline">{movie.title}</Typography><StarIcon />
                        <Typography type="subheading"><DateRangeIcon/> {movie.releaseDate}</Typography>
                        <Divider />
                        <Typography className={classes.overview} type="body2" component="p" gutterBottom>
                            {movie.overview.substring(0, 300)}...
                         </Typography>
                        <Divider />
                        <Typography className={classes.info} type="display1">More information</Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })<IMovieListItemProps>(MovieListItem);