import * as React from 'react';
import { compose } from 'recompose';
import { StyleRules, Theme, withStyles, WithStyles } from "material-ui/styles";
import { IMovieDetail } from '../common/IMovieDetail';
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
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';


interface IMovieDetailProps {
    movie: IMovieDetail;
}

type MovieListItemProps = IMovieDetailProps & WithStyles<"poster" | "card" | "content" | "cover" | "root">;

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
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 300,
        height: 450,

    },
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
}

export default withStyles(styles, { withTheme: true })<IMovieDetailProps>(MovieDetail);