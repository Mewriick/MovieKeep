import * as React from 'react';
import { MuiThemeProvider, createMuiTheme, StyleRulesCallback } from 'material-ui/styles';

import { withStyles } from 'material-ui/styles';
import { blue } from 'material-ui/colors';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from 'material-ui-icons/Search';

import { NavMenu } from './NavMenu';
import { WithStyles, TextField } from "material-ui";
import { AnyAction, compose } from "redux";
import { connect } from "react-redux";
import { ApplicationState } from "../store/index";
import { RouteComponentProps } from "react-router";

const theme = createMuiTheme({
    palette: {
        //type: 'dark', // Switching the dark mode on is a single property value change.
        type: 'dark',
        primary: blue
    },
});

interface ILayoutProps {
    classes: any,
    children: Element
}

type ClassNames = | 'root' | 'flex' | 'menuButton' | 'iconButtonSearch';

const styles: StyleRulesCallback<ClassNames> = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    iconButtonSearch: {
        style: {
            opacity: 0.54,
            transform: 'scale(0, 0)',
            transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
            marginRight: -48,
        },
        iconStyle: {
            opacity: 1,
            transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
        }
    }
});

type LayoutProps = RouteComponentProps<{}>;


class Layout extends React.Component<{}, {}> {

    handleChange = (event: any) => {
        console.log('change');
    };

    public render() {

        const { classes } = this.props as ILayoutProps;

        return (
            <MuiThemeProvider theme={theme}>
                <div id="main">
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                Title
                        </Typography>
                            <TextField onChange={this.handleChange} />
                            <IconButton>
                                style={classes.iconButtonSearch.iconStyle}>
                                {SearchIcon}
                            </IconButton>
                            <Button color="contrast">Login</Button>
                        </Toolbar>
                    </AppBar>
                    {this.props.children}
                </div>
            </MuiThemeProvider>);
    }
}

export default compose(withStyles(styles, {}), connect(), )(Layout) as typeof Layout;
