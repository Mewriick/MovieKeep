import * as React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import MovieIcon from 'material-ui-icons/Movie';
import MovieFilterIcon from 'material-ui-icons/MovieFilter';
import StarIcon from 'material-ui-icons/Star';
import TheatreIcon from 'material-ui-icons/Theaters';
import DraftsIcon from 'material-ui-icons/Drafts';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { MuiThemeProvider, StyleRulesCallback } from 'material-ui/styles';
import { RouteComponentProps } from "react-router";
import { AnyAction, compose } from "redux";
import { connect } from "react-redux";

type ClassNames = | 'root' | 'nested';

const styles: StyleRulesCallback<ClassNames> = theme => ({
    root: {
        width: '100%',
        maxWidth: 240,
        height: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

interface ILayoutProps {
    classes: any,
    children: Element
}

type LayoutProps = RouteComponentProps<{}>;

class NavMenu extends React.Component<{}, {}> {
    state = {
        movieMenuOpen: true
    };


    handlemovieMenuClick = () => {
        this.setState({ movieMenuOpen: !this.state.movieMenuOpen });
    };


    public render() {

        const { classes } = this.props as ILayoutProps;

        return (
            <div className={classes.root}>
                <List>
                    <ListItem button onClick={this.handlemovieMenuClick}>
                        <ListItemIcon>
                            <MovieIcon />
                        </ListItemIcon>
                        <Typography type="title"> Movies </Typography>
                        {this.state.movieMenuOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.movieMenuOpen}>
                        <List disablePadding>
                            <NavLink to={'/nowPlaying'}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <TheatreIcon />
                                    </ListItemIcon>
                                    <Typography type="title"> In theaters </Typography>
                                </ListItem>
                            </NavLink>
                            <NavLink to={'/counter'}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarIcon />
                                    </ListItemIcon>
                                    <Typography type="title"> Popular </Typography>
                                </ListItem>
                            </NavLink>
                            <NavLink to={'/counter'}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <MovieFilterIcon />
                                    </ListItemIcon>
                                    <Typography type="title"> My collection </Typography>
                                </ListItem>
                            </NavLink>
                        </List>
                    </Collapse>
                    <Divider />
                    <NavLink to={'/fetchData'}>
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <Typography type="title"> Dashboard </Typography>
                        </ListItem>
                    </NavLink>
                </List>
            </div>
        );
    }
}

export default compose(withStyles(styles, {}), connect(), )(NavMenu) as typeof NavMenu;



