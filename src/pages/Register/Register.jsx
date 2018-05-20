import React, { Component } from 'react';
import RegisterForm from './components/RegisterForm';

export default class Register extends Component {
  static displayName = 'Register';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const router = this.props
    return (
      <div className="register-page">
        <RegisterForm {...router}/>
      </div>
    );
  }
}
