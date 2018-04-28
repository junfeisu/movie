import React, { Component } from 'react';
import Seats from './components/Seats/Seats';
import SimpleStep from './components/SimpleStep';

export default class SelectSeats extends Component {
  static displayName = 'SelectSeats';

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1
    };
  }

  changeCurrentStep = (step) => {
    this.setState({
      currentStep: step
    })
  }

  render() {
    return (
      <div className="select-seats-page">
        <SimpleStep currentStep={this.state.currentStep} />
        <Seats arrangeId={this.props.params.arrangeId} changeCurrentStep={this.changeCurrentStep} />
      </div>
    );
  }
}
