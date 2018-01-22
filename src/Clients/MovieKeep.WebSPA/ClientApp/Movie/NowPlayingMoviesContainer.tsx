import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as ActionCreators from './ActionCreators';
import { MovieList } from './MovieList';
 

type PlayingMoviesProps =
    ActionCreators.NowPlayingMoviesState
    & typeof ActionCreators.actionCreators
    & RouteComponentProps<{ page: string }>;


class NowPlayingMoviesContainer extends React.Component<PlayingMoviesProps, {}> {
    componentWillMount() {
        let page = parseInt(this.props.match.params.page) || 1;
        this.props.requestNowPlayingMovies(page);
    }

    componentWillReceiveProps(nextProps: PlayingMoviesProps) {
        let page = parseInt(nextProps.match.params.page) || 1;
        this.props.requestNowPlayingMovies(page);
    }

    public render() {
        return (
            <div>
                <h2>Now Playing Movies</h2>
                <MovieList movies={this.props.movies} />
            </div>
        )
    }
}

export default withRouter(connect(
    (state: ApplicationState) => state.nowPlayingMovies,
    ActionCreators.actionCreators
)(NowPlayingMoviesContainer));