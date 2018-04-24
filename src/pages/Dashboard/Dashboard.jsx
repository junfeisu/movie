import React, { Component } from 'react';

// import SimpleSlider from './components/SimpleSlider';
import VideoList from './components/VideoList';
import TopActiveChart from './components/TopActiveChart';
import fetch from '../../fetch';
import toastr from 'toastr';

import './Dashboard.scss';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { willPlayMovies, palyingMovies } = this.state
    return (
      <div className="dashboard-page">
        {/* <SimpleSlider /> */}
        <VideoList/>
        <TopActiveChart />
      </div>
    );
  }
}
