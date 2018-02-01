import * as React from 'react';
import { IMovieActor } from '../common/IMovieDetail';
import { StyleRules, Theme, withStyles, WithStyles } from "material-ui/styles";
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Card, { CardMedia, CardContent, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

interface IMovieActorsProps {
    actors: IMovieActor[];
}

type MovieActorsProps = IMovieActorsProps & WithStyles<"chips" | "chipsWrapper" | "actorCard" | "actorCardMedia" | "actorCardContentRoot">;

const styles = (theme: Theme): StyleRules => ({
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
});

function MovieActors(props: MovieActorsProps) {
    if (props.actors === undefined) {
        return <div></div>;
    }

    return (
        <div className={props.classes.chipsWrapper}>
            {props.actors.map((actor, i) => {
                return <Card key={actor.tmdbId} className={props.classes.actorCard}>
                    <CardMedia className={props.classes.actorCardMedia}
                        image={actor.profileImageUrl}
                        title={actor.character}
                    />
                    <CardContent classes={{ root: props.classes.actorCardContentRoot }}>
                        <Typography type="body2" component="h2">{actor.name}</Typography>
                        <Divider />
                        <Typography type="subheading" component="h2">{actor.character}</Typography>
                    </CardContent>
                </Card>
            })}
        </div>
    );
}

export default withStyles(styles)<IMovieActorsProps>(MovieActors);