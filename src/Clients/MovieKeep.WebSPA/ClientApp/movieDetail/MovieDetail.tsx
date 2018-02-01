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
import MovieDetailCrew from './MovieDetailCrew';
import MovieGendres from './MovieGendresDetail';
import MovieCountries from './MovieCountries';
import MovieActors from './MovieActors';


interface IMovieDetailProps {
    movie: IMovieDetail;
}

type MovieDetailProps = IMovieDetailProps & WithStyles<"card" | "content" | "cover" | "root" | "title" | "chips" >;

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
    card: {
        display: 'flex',
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
    chips: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    }
});


class MovieDetail extends React.Component<MovieDetailProps, {}> {
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
                        <MovieCountries countries={movie.productionCountries} />
                        <MovieGendres movieGendres={movie.gendres} />
                        {this.renderMovieLength(movie.runtimeMins)}
                        <Divider />
                        <MovieDetailCrew crew={movie.crew} />
                        <MovieActors actors={movie.actors} />
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

    private renderMovieLength(runtime: number) {
        let runtimeSpan = TimeSpan.fromMinutes(runtime);

        return <Chip
            avatar={<Avatar> <TimerIcon /></Avatar>}
            label={runtimeSpan.minutes + " min"}
            className={this.props.classes.chips} />;
    }
}

export default withStyles(styles, { withTheme: true })<IMovieDetailProps>(MovieDetail);