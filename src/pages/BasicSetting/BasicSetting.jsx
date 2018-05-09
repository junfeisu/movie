

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import SettingsForm from './components/SettingsForm';

import './BasicSetting.scss';

export default class BasicSetting extends Component {
  static displayName = 'BasicSetting';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '电影管理', link: '' },
      { text: '添加', link: '#/movie/create' },
    ];
    return (
      <div className="basic-setting-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <SettingsForm />
      </div>
    );
  }
}
