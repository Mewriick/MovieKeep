import * as React from 'react';
import * as classNames from 'classnames';

import { MuiThemeProvider, createMuiTheme, StyleRulesCallback } from 'material-ui/styles';

import { withStyles } from 'material-ui/styles';
import { blue, red } from 'material-ui/colors';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from 'material-ui-icons/Search';
import Drawer from 'material-ui/Drawer';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

import NavMenu from './NavMenu';
import { WithStyles, TextField } from "material-ui";
import { AnyAction, compose } from "redux";
import { connect } from "react-redux";
import { ApplicationState } from "../store/index";
import { RouteComponentProps } from "react-router";
import { withRouter } from 'react-router-dom'

const theme = createMuiTheme({
    palette: {
        //type: 'dark', // Switching the dark mode on is a single property value change.
        type: 'dark',
        primary: red
    }
});

interface ILayoutProps {
    classes: any,
    children: Element
}

type ClassNames = | 'root' | 'flex' | 'menuButton' | 'iconButtonSearch' | 'drawerPaper' | 'contentShift' |
    'appFrame' | 'appBar' | 'hide' | 'drawerHeader' | 'content' | 'contentShiftLeft' | 'contentLeft' | 'body' | 'loginButton';

const drawerWidth = 240;

const styles: StyleRulesCallback<ClassNames> = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
    },
    body: {
        backgroundColor: "#333"
    },
    flex: {
        flex: 1,
    },    
    menuButton: {
        marginLeft: 5,
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
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        marginLeft: drawerWidth,
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: '100vh',
        marginTop: '64px',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            content: {
                height: 'calc(100% - 64px)',
                marginTop: 64,
            },
        },
    },
    contentLeft: {
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    contentShiftLeft: {
        marginLeft: 0,
    },
    loginButton: {
        float: 'right'
    }
});

type LayoutProps = RouteComponentProps<{}>;


class Layout extends React.Component<{}, {}> {

    state = {
        open: true
    };

    handleChange = (event: any) => {
        console.log('change');
    };

    handleMenuIconClick = () => {
        this.setState({ open: !this.state.open });
    };

    public render() {

        const { classes } = this.props as ILayoutProps;
        const { open } = this.state;

        const drawer = (
            <Drawer
                type="persistent"
                classes={{ paper: classes.drawerPaper }}
                open={open}>
                <div className={classes.drawerInner}>
                    <NavMenu />
                </div>
            </Drawer>
        );

        return (
            <MuiThemeProvider theme={theme}>
                <div id="main" className={classes.body}>
                    <div className={classes.appFrame}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton
                                    color="contrast"
                                    aria-label="open drawer"
                                    onClick={this.handleMenuIconClick}
                                    className={classes.menuButton}>
                                    <MenuIcon />
                                </IconButton>
                                <Typography type="display1" color="inherit" className={classes.flex} noWrap>Movie Tracker</Typography>
                                <TextField onChange={this.handleChange} className={classes.flex} />
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                                <div className={classes.flex}>
                                    <Button color="contrast" className={classes.loginButton}>Login</Button>
                                </div>
                            </Toolbar>
                        </AppBar>
                        {drawer}
                        <main
                            className={classNames(classes.content, classes.contentLeft, {
                                [classes.contentShift]: open,
                                [classes.contentShiftLeft]: open,
                            })}>
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default compose(withStyles(styles, {}), withRouter, connect())(Layout) as typeof Layout;
