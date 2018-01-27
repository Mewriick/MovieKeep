import * as React from 'react';
import { Route } from 'react-router-dom';
import { default as Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import NowPlayingMoviesContainer from './movieLists/NowPlayingMoviesContainer';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route path='/nowPlaying/:page?' component={ NowPlayingMoviesContainer } />
</Layout>;
