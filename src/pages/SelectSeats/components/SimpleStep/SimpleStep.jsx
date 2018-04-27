import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Step, Button } from '@icedesign/base';

const { Item: StepItem } = Step;
const { Group: ButtonGroup } = Button;

export default class SimpleStep extends Component {
  static displayName = 'SimpleStep';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
    };
  }

  next = () => {
    const s = this.state.currentStep + 1;

    this.setState({
      currentStep: s > 6 ? 6 : s,
    });
  };

  prev = () => {
    const s = this.state.currentStep - 1;

    this.setState({
      currentStep: s < 0 ? 0 : s,
    });
  };

  onClick = (currentStep) => {
    console.log(currentStep);

    this.setState({
      currentStep,
    });
  };

  render() {
    const { currentStep } = this.state;

    return (
      <IceContainer>
        <Step current={currentStep}>
          <StepItem title="选择影院，场次" onClick={this.onClick} />
          <StepItem title="选座，填写手机号" onClick={this.onClick} />
          <StepItem title="确认订单" onClick={this.onClick} />
        </Step>
      </IceContainer>
    );
  }
}
