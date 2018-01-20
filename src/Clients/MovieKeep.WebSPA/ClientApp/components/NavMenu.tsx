import * as React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import InboxIcon from 'material-ui-icons/Inbox';
import MovieIcon from 'material-ui-icons/Movie';
import DraftsIcon from 'material-ui-icons/Drafts';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { MuiThemeProvider, StyleRulesCallback } from 'material-ui/styles';
import { RouteComponentProps } from "react-router";
import { AnyAction, compose } from "redux";
import { connect } from "react-redux";

type ClassNames = | 'root';

const styles: StyleRulesCallback<ClassNames> = theme => ({
    root: {
        width: '100%',
        maxWidth: 240,
        height: '100%',
        backgroundColor: theme.palette.background.paper,        
    },
});

interface ILayoutProps {
    classes: any,
    children: Element
}

type LayoutProps = RouteComponentProps<{}>;

class NavMenu extends React.Component<{}, {}> {
    public render() {

        const { classes } = this.props as ILayoutProps;

        return (
            <div className={classes.root}>
                <List>
                    <NavLink exact to={'/'}>
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <Typography type="title"> Test </Typography>
                        </ListItem>
                    </NavLink>
                    <NavLink to={'/counter'}>
                        <ListItem button>
                            <ListItemIcon>
                                <MovieIcon />
                            </ListItemIcon>
                            <Typography type="title"> Test </Typography>
                        </ListItem>
                    </NavLink>
                    <NavLink to={'/fetchData'}>
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <Typography type="title"> Test </Typography>
                        </ListItem>
                    </NavLink>
                </List>
            </div>
        );
    }
}

export default compose(withStyles(styles, {}), connect(), )(NavMenu) as typeof NavMenu;



