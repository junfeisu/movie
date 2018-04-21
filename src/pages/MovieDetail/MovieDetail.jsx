import React, { Component } from 'react';
import RightContentDisplay from './components/RightContentDisplay';

export default class MovieDetail extends Component {
  static displayName = 'MovieDetail';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="movie-detail-page">
        <RightContentDisplay />
      </div>
    );
  }
}
