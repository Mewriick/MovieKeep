import * as React from 'react';
import { StyleRules, Theme, withStyles, WithStyles } from "material-ui/styles";
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

interface IMovieGendresProps {
    movieGendres: string[];
}

type MovieGendresProps = IMovieGendresProps & WithStyles<"chips" | "chipsWrapper">;

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
    }
});

function MovieGendres(props: MovieGendresProps) {
    if (props.movieGendres === undefined) {
        return <div></div>;
    }
    
    return (
        <div className={props.classes.chipsWrapper}>
            {props.movieGendres.map((g, i) => {
                return <Chip key={g}
                    avatar={<Avatar>{g.substring(0, 1)}</Avatar>}
                    label={g}
                    className={props.classes.chips} />;
            })
            }
        </div>
    );
}


export default withStyles(styles)<IMovieGendresProps>(MovieGendres);