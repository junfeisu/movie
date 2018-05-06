import React, { Component } from 'react';
import axios from 'axios';
import { Table } from '@icedesign/base';
import IceContainer from '@icedesign/container';

export default class OrderList extends Component {
  static displayName = 'OrderList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.orders !== nextProps.orders) {
      this.setState({
        orders: nextProps.orders
      })
    }
  }

  renderOrderInfo = (movie) => {
    return (
      <div className="order-info" style={styles.orderInfo}>
        <img src={movie.image} style={styles.orderImg} alt="头像" />
        <div className="order-description" style={styles.orderDescription}>
          {movie.zh_name}
        </div>
      </div>
    );
  };

  renderOrderPrice = (price) => {
    return <b>{price}</b>;
  };

  renderSeats = (value, index, record) => {
    return (
      <div>
        {
          record.seats.map(item => {
            return <span>{item.seat_row}排{item.seat_col}座</span>
          })
        }
      </div>
    )
  }

  getRowClassName = (record) => {
    if (record.status === 0) {
      return 'highlight-row';
    }
  };

   componentWillReceiveProps (nextProps) {
      if (this.props.orders !== nextProps.orders) {
        this.setState({
          orders: nextProps.orders
        })
      }
   }

  render() {
    const rowSelection = {
      onChange: this.handleRowSelection,
      mode: 'single',
    };
    const { orders } = this.state;

    return (
      <div className="order-list" style={styles.orderList}>
        <IceContainer title="订单列表">
          <Table
            dataSource={orders}
            getRowClassName={this.getRowClassName}
            hasBorder={false}
          >
            <Table.GroupHeader />
            <Table.Column
              cell={this.renderOrderInfo}
              title="商品"
              dataIndex="movie"
              width={400}
            />
            <Table.Column
              cell={this.renderSeats}
              title="座位"
              dataIndex="seats"
              width={400}
            />
            <Table.Column
              cell={this.renderOrderPrice}
              title="金额"
              dataIndex="price"
              width={120}
            />
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  orderList: {
    marginTop: '30px'
  },
  orderImg: {
    width: '60px',
    height: '60px',
    float: 'left',
    marginRight: '10px',
  },
  orderDetailLink: {
    textDecoration: 'none',
  },
};
