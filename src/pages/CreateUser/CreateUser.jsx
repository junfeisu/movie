

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import UserForm from './components/UserForm';
import Toastr from 'toastr';
import { hashHistory } from 'react-router';

import './CreateUser.scss';

export default class CreateUser extends Component {
  static displayName = 'CreateUser';

  constructor(props) {
    super(props);
    this.state = {}
      user: null
    ;
  }

  componentWillMount () {
    let user = JSON.parse(window.sessionStorage.getItem('user'))

    if (user) {
      this.setState({
        user
      })
    } else {
      Toastr.info("请先登录")
      hashHistory.push('/login')
    }
  }

  render() {
    const breadcrumb = [
      { text: '用户管理', link: '' },
      { text: '添加用户', link: '#/user/list' },
    ];
    return (
      <div className="create-user-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <UserForm user={this.state.user} />
      </div>
    );
  }
}
