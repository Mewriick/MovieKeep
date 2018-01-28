import * as React from 'react';
import { compose } from 'recompose';
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";
import { StyleRules, Theme, withStyles, WithStyles } from "material-ui/styles";
import { IMovieDetail, ICountry, IMovieActor } from '../common/IMovieDetail';
import Card, { CardMedia, CardContent, CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import TimerIcon from 'material-ui-icons/Timer';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';


interface IMovieDetailProps {
    movie: IMovieDetail;
}

type MovieListItemProps = IMovieDetailProps & WithStyles<"poster" | "card" | "content" | "cover" | "root" | "title" | "chips" | "chipsWrapper"
    | "actorCard" | "actorCardMedia" | "actorCardContentRoot">;

const styles = (theme: Theme): StyleRules => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        backgroundColor: theme.palette.background.paper,
    },
    poster: {

    },
    card: {
        display: 'flex',
    },
    actorCard: {
        display: 'flex',
        flexDirection: 'column',
        width: 95,
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit,
    },
    actorCardMedia: {
        width: '100%',
        height: 85,
    },
    actorCardContentRoot: {
        padding: 0,
        paddingTop: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 300,
        height: 450,
    },
    title: {
        margin: theme.spacing.unit,
    },
    chipsWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    chips: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    }
});


class MovieDetail extends React.Component<MovieListItemProps, {}> {
    state = {
        value: 0,
    };

    handleChange = (event: any, value: number) => {
        this.setState({ value });
    };

    public render() {

        const { movie } = this.props as IMovieDetailProps;
        const { classes } = this.props;
        const { value } = this.state;

        let releaseDateParsed = new DateTime(movie.releaseDate);

        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cover}
                        image={movie.posterPath}
                        title={movie.title} />
                    <CardContent className={classes.content}>
                        <div className={classes.title}>
                            <Typography type="display1">{movie.title} ({releaseDateParsed.year}) </Typography>
                        </div>
                        {this.renderCountries(movie.productionCountries)}
                        {this.renderGendres(movie.gendres)}
                        {this.renderMovieLength(movie.runtimeMins)}
                        <Divider />
                        {this.renderMainActors(movie.actors)}
                    </CardContent>
                </Card>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange} centered>
                        <Tab label="Overview" />
                        <Tab label="Reviews" />
                        <Tab label="Videos" />
                        <Tab label="Images" />
                    </Tabs>
                </AppBar>
                {value === 0 && <div>Overview</div>}
                {value === 1 && <div>Reviews</div>}
                {value === 2 && <div>Videos</div>}
                {value === 3 && <div>Images</div>}
            </div>
        );
    }

    private renderGendres(movieGendres: string[]) {
        if (movieGendres === undefined) {
            return;
        }

        return (
            <div className={this.props.classes.chipsWrapper}>
                {movieGendres.map((g, i) => {
                    return <Chip key={g}
                        avatar={<Avatar>{g.substring(0, 1)}</Avatar>}
                        label={g}
                        className={this.props.classes.chips} />;
                })
                }
            </div>
        );
    }

    private renderCountries(countries: ICountry[]) {
        if (countries === undefined) {
            return;
        }

        return (
            <div className={this.props.classes.chipsWrapper}>
                {countries.map((c, i) => {
                    let classNameFlag = "flag-icon flag-icon-" + c.code.toLowerCase();
                    return <Chip key={c.code}
                        avatar={<Avatar className={classNameFlag} />}
                        label={c.name}
                        className={this.props.classes.chips} />;
                })
                }
            </div>
        );
    }

    private renderMovieLength(runtime: number) {
        let runtimeSpan = TimeSpan.fromMinutes(runtime);

        return <Chip
            avatar={<Avatar> <TimerIcon /></Avatar>}
            label={runtimeSpan.minutes + " min"}
            className={this.props.classes.chips} />;
    }

    private renderMainActors(mainActors: IMovieActor[]) {
        if (mainActors === undefined) {
            return;
        }

        return (
            <div className={this.props.classes.chipsWrapper}>
                { mainActors.map((actor, i) => {
                    return <Card key={actor.tmdbId} className={this.props.classes.actorCard}>
                        <CardMedia className={this.props.classes.actorCardMedia}
                            image={actor.profileImageUrl}
                            title={actor.character}
                        />
                        <CardContent classes={{ root: this.props.classes.actorCardContentRoot }}>
                            <Typography type="body2" component="h2">{actor.name}</Typography>
                            <Divider />
                            <Typography type="subheading" component="h2">{actor.character}</Typography>
                        </CardContent>
                    </Card>
                }) }
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })<IMovieDetailProps>(MovieDetail);