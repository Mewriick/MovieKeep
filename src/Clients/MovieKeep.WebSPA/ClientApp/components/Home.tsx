import * as React from 'react';
import Paper from 'material-ui/Paper'; 
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { AnyAction, compose } from "redux";

class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <Paper>
            <h1>Hello, world!</h1>
          
        </Paper>;
    }
}
export default compose(
    withRouter,
    connect()
)(Home)