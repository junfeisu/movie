import React, { Component } from 'react';
import SimpleTable from './components/SimpleTable';

export default class UserCenter extends Component {
  static displayName = 'UserCenter';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-center-page">
        <SimpleTable />
      </div>
    );
  }
}
