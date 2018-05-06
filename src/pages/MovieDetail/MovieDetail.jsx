import React, { Component } from 'react';
import RightContentDisplay from './components/RightContentDisplay';
import { Table, Button, Input } from '@icedesign/base';
import { hashHistory } from 'react-router';
import Toastr from 'toastr';
import fetch from '../../fetch';
import FeedList from './components/FeedList';

export default class MovieDetail extends Component {
  static displayName = 'MovieDetail';

  constructor(props) {
    super(props);
    this.state = {
      noArrange: false,
      movie: null,
      arranges: [],
      content: ''
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

  addComment = async () => {
    try {
      let user = JSON.parse(window.sessionStorage.getItem('user'))
      const { content } = this.state
      if (user) {
        const result = await fetch({
          url: '/comment/add',
          method: 'POST',
          data: {
            movie: this.props.params.movieId,
            comment_user: user._id,
            content: content
          }
        })

        if (result.status) {
          Toastr.success("评论成功")
          this.setState({
            content: ''
          })
        }
      } else {
        Toastr.info("先登录在评论")
        hashHistory.push("/login")
      }
    } catch (err) {
      if (err && err.data) {
        Toastr.error(err.data.message || err.message)
      }
    }
  }

  render() {
    const { arranges, noArrange, movie, content } = this.state
    return (
      <div className="movie-detail-page">
        <RightContentDisplay movie={movie} />
        {
          noArrange ? <div style={{fontSize: '28px', textAlign: 'center', margin: '30px 0'}}>暂无上映安排，敬请等待</div> 
            : <Table dataSource={arranges} hasBorder={false} isZebra={true} style={{marginBottom: '30px'}}>
              <Table.Column align="center" title="放映时间" dataIndex="time" />
              <Table.Column align="center" title="放映厅" cell={this.renderIndex} />
              <Table.Column align="center" title="价格(元)" dataIndex="price" />
              <Table.Column align="center" title="选座购票" cell={this.renderCell} />
            </Table>
        }
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: '20px', alignItems: 'flex-end'}}>
          <div style={{width: '100%', fontSize: "20px", color: "#fff", borderBottom: '2px solid #fff', height: '40px', marginBottom: '10px'}}>评论</div>
          <Input value={content} multiple placeholder="请输入评论内容" style={{width: "100%"}} onChange={(val, ev) => {
            this.setState({
              content: val
            })
          }}/>
          <Button type="primary" style={{flex: '0', marginTop: '10px'}} onClick={this.addComment}>发表评论</Button>
        </div>
        <FeedList movieId={this.props.params.movieId} />
      </div>
    );
  }
}
