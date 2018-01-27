import * as React from 'react';
import { compose } from 'recompose';
import { StyleRules, Theme, withStyles, WithStyles } from "material-ui/styles";
import { IMovieListItem } from '../common/IMovieListItem';
import Card, { CardMedia, CardContent, CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import DateRangeIcon from 'material-ui-icons/DateRange';
import StarIcon from 'material-ui-icons/Star';
import ArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

interface IMovieListItemProps {
    movie: IMovieListItem;
}

const cardHeight = 280;
const overviewMargin = 100;

type MovieListItemProps = IMovieListItemProps & WithStyles<"root" | "card" | "details" | "cover" | "body2" | "releaseDate"
    | "content" | "overview" | "info" | "titleWrapper" | "title" | "star" | "overviewWrapper" | "iconButtonRoot">;

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
        maxHeight: cardHeight,
    },
    cover: {
        width: 180,
        height: cardHeight,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    overviewWrapper: {
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: "column",
        height: "75%",
    },
    overview: {
        marginTop: 10,
        flex: "1 100%",
    },
    info: {
        alignSelf: "flex-end",
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 5
    },
    title: {
        flex: '1 100%'
    },
    star: {
        marginLeft: 'auto',
    },
    iconButtonRoot: {
        fontSize: "16px",
        width: "auto",
    },
    body2: {
        fontSize: "1.15rem",
    },
    releaseDate: {
        marginBottom: theme.spacing.unit 
    },
});


class MovieListItem extends React.Component<MovieListItemProps, {}> {
    public render() {

        const { movie } = this.props as IMovieListItemProps;
        const { classes } = this.props;

        let releaseDateParsed = new DateTime(movie.releaseDate);
        let releaseDateString = releaseDateParsed.calendar.day + "/" + releaseDateParsed.calendar.month + "/" + releaseDateParsed.calendar.year; 

        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cover}
                        image={movie.posterUrl}
                        title={movie.title} />
                    <CardContent className={classes.content}>
                        <div className={classes.titleWrapper}>
                            <div className={classes.title}>
                                <Typography type="headline">{movie.title}</Typography>
                            </div>
                            <div className={classes.star}>
                                <StarIcon />
                            </div>
                            <div className={classes.star}>
                                <Typography type="subheading">{movie.socialInfoVoteAverage}</Typography>
                            </div>
                        </div>
                        <Chip avatar={<Avatar><DateRangeIcon /></Avatar>}
                            className={classes.releaseDate}
                            label={releaseDateString} />
                        <Divider />
                        <div className={classes.overviewWrapper}>
                            <Typography classes={{ root: this.props.classes.body2 }} className={classes.overview} type="body2" component="p" gutterBottom>
                                {movie.overview.length > 250 ? movie.overview.substring(0, 250) + '...' : movie.overview}
                            </Typography>
                            <Divider />
                            <IconButton classes={{ root: this.props.classes.iconButtonRoot }} className={classes.info}>
                                More information <ArrowRightIcon />
                            </IconButton>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })<IMovieListItemProps>(MovieListItem);