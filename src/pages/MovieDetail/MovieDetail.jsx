import React, { Component } from 'react';
import RightContentDisplay from './components/RightContentDisplay';
import { Table, Button } from '@icedesign/base';

export default class MovieDetail extends Component {
  static displayName = 'MovieDetail';

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {

      }
    };
  }

  getData = () => {
    return [{
      time: '2017-09-11',
      room: '2号厅',
      price: '36'
    }, {
      time: '2017-08-11',
      room: '3号厅',
      price: '36'
    }, {
      time: '2017-07-11',
      room: '4号厅',
      price: '36'
    }]
  }

  order = () => {
    console.log('购票')
  }

  renderCell = () => {
    return (
      <div>
        <Button type="primary" onClick={this.order}>选座购票</Button>
      </div>
    ) 
  }

  render() {
    return (
      <div className="movie-detail-page">
        <RightContentDisplay />
        <Table dataSource={this.getData()} hasBorder={false} isZebra={true}>
          <Table.Column align="center" title="放映时间" dataIndex="time" />
          <Table.Column align="center" title="放映厅" dataIndex="room" />
          <Table.Column align="center" title="价格(元)" dataIndex="price" />
          <Table.Column align="center" title="选座购票" cell={this.renderCell} />
        </Table>
      </div>
    );
  }
}
