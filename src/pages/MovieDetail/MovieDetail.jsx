import React, { Component } from 'react';
import RightContentDisplay from './components/RightContentDisplay';
import { Table, Button } from '@icedesign/base';
import { hashHistory } from 'react-router';
import Toastr from 'toastr';
import fetch from '../../fetch';

export default class MovieDetail extends Component {
  static displayName = 'MovieDetail';

  constructor(props) {
    super(props);
    this.state = {
      noArrange: false,
      movie: null,
      arranges: []
    };
  }

  getMovieInfo = async () => {
    const result = await fetch({
      url: '/movie/' + this.props.params.movieId,
    })

    this.setState({
      movie: result.data
    })
  }

  getArranges = async () => {
    const result = await fetch({
      url: '/arrange/search',
      method: 'POST',
      data: {
        movie: this.props.params.movieId
      }
    })

    if (result.data.length) {
      this.setState({
        arranges: result.data
      })
    } else {
      this.setState({
        noArrange: true
      })
    }
  }

  componentWillMount () {
    this.getMovieInfo()
    this.getArranges()
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
          this.order(record._id)
        }}>选座购票</Button>
      </div>
    )
  }

  renderIndex = (value, index, record) => {
    return (
      <div>{index + 1}号厅</div>
    )
  }

  render() {
    const { arranges, noArrange, movie } = this.state
    return (
      <div className="movie-detail-page">
        <RightContentDisplay movie={movie} />
        {
          noArrange ? <div>暂无上映安排，敬请等待</div> 
            : <Table dataSource={arranges} hasBorder={false} isZebra={true}>
              <Table.Column align="center" title="放映时间" dataIndex="time" />
              <Table.Column align="center" title="放映厅" cell={this.renderIndex} />
              <Table.Column align="center" title="价格(元)" dataIndex="price" />
              <Table.Column align="center" title="选座购票" cell={this.renderCell} />
            </Table>
        }
      </div>
    );
  }
}
