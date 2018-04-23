import React, { Component } from 'react';

// import SimpleSlider from './components/SimpleSlider';
import VideoList from './components/VideoList';
import TopActiveChart from './components/TopActiveChart';
import fetch from '../../fetch'

import './Dashboard.scss';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  async fetchMovies () {
    const arranges = await fetch({
      url: '/arrange',
    })
    this.setState({
      movies: arranges
    })
  }

  componentWillMount () {
    this.fetchMovies()
  }

  render() {
    return (
      <div className="dashboard-page">
        {/* <SimpleSlider /> */}
        <VideoList movies={this.state.movies}/>
        <TopActiveChart />
      </div>
    );
  }
}
