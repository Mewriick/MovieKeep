import * as React from 'react';
import { ICountry } from '../common/IMovieDetail';
import { StyleRules, Theme, withStyles, WithStyles } from "material-ui/styles";
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

interface IMovieCountriesProps {
    countries: ICountry[];
}

type MovieCountriesProps = IMovieCountriesProps & WithStyles<"chips" | "chipsWrapper">;

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

function MovieCountries(props: MovieCountriesProps) {
    if (props.countries === undefined) {
        return <div></div>;
    }

    return (
        <div className={props.classes.chipsWrapper}>
            {props.countries.map((c, i) => {
                let classNameFlag = "flag-icon flag-icon-" + c.code.toLowerCase();
                return <Chip key={c.code}
                    avatar={<Avatar className={classNameFlag} />}
                    label={c.name}
                    className={props.classes.chips} />;
            })
            }
        </div>
    );   
}


export default withStyles(styles)<IMovieCountriesProps>(MovieCountries);