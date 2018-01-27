import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { MovieDetailState, ActionCreators } from './duck';


type MovieDetailProps =
    MovieDetailState
    & typeof ActionCreators
    & RouteComponentProps<{ id: string }>;


class MovieDetailContainer extends React.Component<MovieDetailProps, {}> {
    componentWillMount() {
        let id = parseInt(this.props.match.params.id) || 1;
        this.props.requestMovieDetail(id);
    }

    componentWillReceiveProps(nextProps: MovieDetailProps) {
        let id = parseInt(nextProps.match.params.id) || 1;
        this.props.requestMovieDetail(id);
    }

    public render() {
        return (
            <div>
                Test               
            </div>
        )
    }
}

export default withRouter(connect(
    (state: ApplicationState) => state.movieDetail,
    ActionCreators
)(MovieDetailContainer));