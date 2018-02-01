import * as React from 'react';
import { StyleRules, Theme, withStyles, WithStyles } from "material-ui/styles";
import { IMovieCrew, IMovieWorker } from '../common/IMovieDetail';
import Card, { CardMedia, CardContent, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import CameraIcon from 'material-ui-icons/Videocam';
import MovieIcon from 'material-ui-icons/Movie';

interface IMovieCrewProps {
    crew: IMovieCrew;
}

type MovieCrewProps = IMovieCrewProps & WithStyles<"root" | "chips" | "chipsWrapper" | "card" | "content" | "media">;

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
    chipsWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    chips: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: 95,
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit,
    },
    content: {
        flex: '1 0 auto',
    },
    media: {
        width: '100%',
        height: 85,
    },
});

class MovieDetailCrew extends React.Component<MovieCrewProps, {}> {

    public render() {
        if (this.props.crew === undefined) {
            return <div></div>;
        }

        const { classes } = this.props;



        return (<div>
            <div className={classes.chipsWrapper}>
                {this.renderCrewArray(this.props.crew.directors)}
                {this.renderCrewArray(this.props.crew.writers)}
                {this.renderCrewArray(this.props.crew.musicComposers)}
                {this.renderCrewArray(this.props.crew.cameramen)}
            </div>
        </div>
        );
    }

    private renderCrewArray(crewArray: IMovieWorker[]) {
        return crewArray.map((worker, i) => {
            let chipKey = "chip-" + worker.tmdbId;
            return (<div>
                <Chip key={chipKey} avatar={<Avatar><MovieIcon /></Avatar>}
                    label={worker.name}
                    className={this.props.classes.chips} />
                <Card key={worker.tmdbId} className={this.props.classes.card}>
                    <CardMedia image={worker.profileImageUrl} className={this.props.classes.media} />
                </Card>
            </div>);
        });
    }
}

export default withStyles(styles)<IMovieCrewProps>(MovieDetailCrew);