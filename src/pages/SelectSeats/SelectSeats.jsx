import React, { Component } from 'react';
import Seats from './components/Seats/Seats';
import SimpleStep from './components/SimpleStep';
import OrderList from './components/OrderList';

export default class SelectSeats extends Component {
  static displayName = 'SelectSeats';

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      orders: []
    };
  }

  changeCurrentStep = (step, orders) => {
    this.setState({
      currentStep: step,
      orders: orders
    })
  }

  render() {
    return (
      <div className="select-seats-page">
        <SimpleStep currentStep={this.state.currentStep} />
        <Seats arrangeId={this.props.params.arrangeId} changeCurrentStep={this.changeCurrentStep} />
        <OrderList orders={this.state.orders} />
      </div>
    );
  }
}
