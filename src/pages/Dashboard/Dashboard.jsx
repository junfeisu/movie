import React, { Component } from 'react';

import SimpleSlider from './components/SimpleSlider';
import VideoList from './components/VideoList';

import './Dashboard.scss';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard-page">
        <SimpleSlider />
        <VideoList />
      </div>
    );
  }
}
