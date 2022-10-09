import { Col, Spin } from 'antd';
import React, { Component } from 'react';
import './movie.css';

import Spiner from '../spiner';
import ErrorIndicator from '../error-indicator';

export default class Movie extends Component {
  render() {
    const { info, loading, error } = this.props;

    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spin indicator={Spiner} /> : null;
    const content = hasData ? <MovieView info={info} /> : null;
    return (
      <>
        {errorMessage}
        {spinner}
        {content}
      </>
    );
  }
}

const MovieView = ({ info }) => {
  const { image, title, genre, date, description } = info;
  return (
    <Col span={4}>
      <div className="wrraper">
        <div className="image">
          <img src={`https://image.tmdb.org/t/p/original${image}`} alt="логотип" style={{ width: 183, height: 281 }} />
        </div>
        <div>
          <h5 className="name-movie">{title}</h5>
          <div className="date-movie">{date}</div>
          <div className="genre-list">
            <div className="genre-movie">{genre}</div>
            <div className="genre-movie">{genre}</div>
          </div>
          <div>
            <p className="description-movie">{description}</p>
          </div>
        </div>
      </div>
    </Col>
  );
};
