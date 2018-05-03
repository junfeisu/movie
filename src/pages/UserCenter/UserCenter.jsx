import React, { Component } from 'react';
import SimpleTable from './components/SimpleTable';
import UserInfoCard from './components/UserInfoCard';
import Toastr from 'toastr';
import { hashHistory } from 'react-router';

export default class UserCenter extends Component {
  static displayName = 'UserCenter';

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentWillMount () {
    let user = JSON.parse(window.sessionStorage.getItem('user'))
    if (user) {
      this.setState({
        user: user
      })
    } else {
      Toastr.info("请先登录")
      hashHistory.push('/login')
    }
  }

  render() {
    const { user } = this.state
    return (
      <div className="user-center-page">
        <UserInfoCard user={user} />
        <SimpleTable user={user} />
      </div>
    );
  }
}
