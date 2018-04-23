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
      palyingMovies: [],
      willPlayMovies: []
    };
  }

  fetchPlayingMovies =  async () => {
    try {
      const palyingMovies = await fetch({
        host: 'https://api.douban.com',
        url: '/v2/movie/in_theaters',
        method: 'OPTIONS'
      })

      this.setState({
        palyingMovies: palyingMovies.subjects.slice(0, 4)
      })
    } catch (err) {
      toastr.error(err)
    }
  }

  fetchWillPlayMovies = async () => {
    try {
      const willPlayMovies = await fetch({
        host: 'https://api.douban.com',
        url: '/v2/movie/coming_soon',
        method: 'OPTIONS'
      })

      this.setState({
        willPlayMovies: willPlayMovies.subjects.slice(0, 4)
      })
    } catch (err) {
      toastr.error(err)
    }
  }

  componentWillMount () {
    this.fetchPlayingMovies()
    this.fetchWillPlayMovies()
  }

  render() {
    const { willPlayMovies, palyingMovies } = this.state
    return (
      <div className="dashboard-page">
        {/* <SimpleSlider /> */}
        <VideoList willPlayMovies={willPlayMovies} palyingMovies={palyingMovies}/>
        <TopActiveChart />
      </div>
    );
  }
}
