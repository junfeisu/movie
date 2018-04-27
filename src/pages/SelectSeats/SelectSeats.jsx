import React, { Component } from 'react';
import Seats from './components/Seats/Seats';
import SimpleStep from './components/SimpleStep';

export default class SelectSeats extends Component {
  static displayName = 'SelectSeats';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="select-seats-page">
        <SimpleStep />
        <Seats />
      </div>
    );
  }
}
