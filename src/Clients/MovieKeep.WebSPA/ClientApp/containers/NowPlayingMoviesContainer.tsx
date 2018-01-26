import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { ActionCreators } from '../movie/Index';
import { NowPlayingMoviesState } from '../movie/Index';
import MovieList from '../components/movie/MovieList';
 

type PlayingMoviesProps =
    NowPlayingMoviesState
    & typeof ActionCreators
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
                <Typography type="display2">Now Playing Movies</Typography>
                <MovieList movies={this.props.movies} />
            </div>
        )
    }
}

export default withRouter(connect(
    (state: ApplicationState) => state.nowPlayingMovies,
    ActionCreators
)(NowPlayingMoviesContainer));