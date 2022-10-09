import { Row } from 'antd';
import React, { Component } from 'react';

import NetworkState from '../network-state';
import Movie from '../movie';
import 'antd/dist/antd.css';
import './app.css';
import ErrorIndicator from '../error-indicator';
import SearchForm from '../search-form';
import MoviePagination from '../pagination';
import MovieApiService from '../services/movie-db-service';

export default class App extends Component {
  movieApiService = new MovieApiService();

  state = {
    network: true,
    info: {},
    loading: true,
    query: 'The way Back',
  };

  componentDidMount() {
    this.updateInformation(this.state.query);
  }

  componentDidUpdate(prevProps) {
    if (this.props.query != prevProps.query) {
      this.updateInformation(this.state.query);
    }
  }

  onMovieLoaded = (info) => {
    this.setState({
      info,
      loading: false,
      error: false,
    });
  };

  changeQuery = (value) => {
    this.setState({
      query: value,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateInformation = (value) => {
    this.changeQuery(value);
    this.movieApiService.getText(this.state.query).then(this.onMovieLoaded).catch(this.onError);
  };

  onNetworkState = () => {
    this.setState((prevState) => ({ network: !prevState.network }));
  };

  render() {
    const { network, info, loading, error } = this.state;

    const errorMessage = !network ? <ErrorIndicator /> : null;
    const contentApp = network ? (
      <AppView info={info} loading={loading} error={error} updateInformation={this.updateInformation} />
    ) : null;
    return (
      <>
        <NetworkState onNetworkState={this.onNetworkState} />
        {errorMessage}
        {contentApp}
      </>
    );
  }
}

const AppView = ({ info, loading, error, updateInformation }) => {
  return (
    <>
      <SearchForm updateInformation={updateInformation} />
      <Row justify="space-evenly">
        <Movie info={info} loading={loading} error={error} />
        <Movie info={info} loading={loading} error={error} />
      </Row>
      <Row justify="space-evenly">
        <Movie info={info} loading={loading} error={error} />
        <Movie info={info} loading={loading} error={error} />
      </Row>
      <Row justify="space-evenly">
        <Movie info={info} loading={loading} error={error} />
        <Movie info={info} loading={loading} error={error} />
      </Row>
      <MoviePagination />
    </>
  );
};
