import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import IceLabel from '@icedesign/label';
import fetch from '../../../../fetch';
import Toastr from 'toastr';
import { copy } from 'mi-elegant';

import { enquireScreen } from 'enquire-js';

export default class SimpleTable extends Component {
  static displayName = 'SimpleTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      orders: []
    };
  }

  getOrders = async () => {
    const { user } = this.props
    if (user) {
      const result = await fetch({
        url: '/order/' + user.user_id || user._id
      })

      this.setState({
        orders: result.data
      })
    }
  }

  deleteOrder = async (order, index) => {
    const result = await fetch({
      url: '/order/delete/' + order._id,
      method: 'POST'
    })

    if (result.status) {
      Toastr.success("删除成功")
      let orders = copy(this.state.orders)
      orders.splice(index, 1)
      this.setState({
        orders: orders
      })
    } else {
      Toastr.error("删除失败")
    }
  }

  componentWillMount () {
    this.getOrders()
  }
 
  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  renderTitle = (value, index, record) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          <IceImg src={record.arrange.movie.image} width={48} height={48} />
        </div>
        <span
          style={{
            marginLeft: '10px',
            lineHeight: '20px',
          }}
        >
          {record.arrange.movie.zh_name}
        </span>
      </div>
    );
  };

  renderType = (value, index, record) => {
    return (
      <div>{
        record.arrange.movie.genres.slice(0, 3).map(item => {
          return item + ' '
        })
      }</div>
    )
  }

  renderTime = (value, index, record) => {
    return (
      <div>
        {record.arrange.time}
      </div>
    )
  }

  renderCount = (value, index, record) => {
    return (
      <div>
        {record.num} * {record.arrange.price}¥
      </div>
    )
  }

  editItem = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
  };

  renderOperations = (value, index, record) => {
    return (
      <div style={{ lineHeight: '28px' }}>
        <a style={styles.operation} onClick={() =>{
          this.deleteOrder(record, index)
        }}>
          删除
        </a>
      </div>
    );
  };

  renderStatus = (value) => {
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };

  changePage = (currentPage) => {
    this.fetchData({
      page: currentPage,
    });
  };

  render() {
    const { orders } = this.state

    return (
      <div className="simple-table">
        <IceContainer>
          <Table
            dataSource={orders}
            className="basic-table"
            hasBorder={false}
          >
            <Table.Column
              title="电影名称"
              cell={this.renderTitle}
              width={180}
            />
            <Table.Column title="电影分类" cell={this.renderType} width={85} />
            <Table.Column
              title="订购时间"
              cell={this.renderTime}
              width={150}
            />
            <Table.Column
              title="总价"
              width={85}
              cell={this.renderCount}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={150}
              cell={this.renderOperations}
            />
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  operation: {
    marginRight: '12px',
    textDecoration: 'none',
    cursor: 'pointer'
  },
};
