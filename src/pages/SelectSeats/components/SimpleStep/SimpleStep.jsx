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

  render() {
    const { currentStep } = this.state;

    return (
      <IceContainer>
        <Step current={currentStep}>
          <StepItem title="选择影院，场次" />
          <StepItem title="选座，填写手机号" />
          <StepItem title="确认订单" />
        </Step>
      </IceContainer>
    );
  }
}
