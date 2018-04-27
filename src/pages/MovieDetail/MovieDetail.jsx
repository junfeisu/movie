import React, { Component } from 'react';
import RightContentDisplay from './components/RightContentDisplay';
import { Table, Button } from '@icedesign/base';
import { hashHistory } from 'react-router';
import Toastr from 'toastr';

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
      price: '36',
      arrangeId: 1,
    }, {
      time: '2017-08-11',
      room: '3号厅',
      price: '36',
      arrangeId: 2
    }, {
      time: '2017-07-11',
      room: '4号厅',
      price: '36',
      arrangeId: 3
    }]
  }

  order = (arrangeId) => {
    let userInfo = JSON.parse(window.sessionStorage.getItem('user'))
    if (userInfo) {
      hashHistory.push('/seats/' + arrangeId)
    } else {
      Toastr.info("请先登录再购票")
      hashHistory.push('/login')
    }
  }

  renderCell = (value, index, record) => {
    return (
      <div>
        <Button type="primary" onClick={() => {
          this.order(record.arrangeId)
        }}>选座购票</Button>
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
