import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import fetch from '../../../../fetch';
import Toastr from 'toastr';

const dataSource = [
  {
    nickName: '某某',
    datetime: '2分钟前',
    avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
    message: '刚刚完成了智能化搭建课程的学习',
  },
  {
    nickName: '某某',
    datetime: '3分钟前',
    avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
    message: '刚刚完成了 JavaScript 模块化打包课程的学习',
  },
  {
    nickName: '某某',
    datetime: '5分钟前',
    avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
    message: '刚刚完成了智能化搭建课程的学习',
  },
  {
    nickName: '某某',
    datetime: '1天前',
    avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
    message: '刚刚完成了智能化搭建课程的学习',
  },
  {
    nickName: '某某',
    datetime: '2天前',
    avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
    message:
      '刚刚完成了Sketch图形设计课程的学习，课程内容包括组件绘制，画布编辑等',
  },
];

export default class FeedList extends Component {
  static displayName = 'FeedList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  getComments = async () => {
    const result = await fetch({
      url: '/comment/movie/' + this.props.movieId,
      method: 'GET'
    })

    if (result.status) {
      this.setState({
        comments: result.data
      })
    }
  }

  // ICE: React Component 的生命周期
  componentWillMount() {
    this.getComments()
  }

  componentDidMount() {}

  renderItem = (item, idx) => {
    return (
      <div style={styles.item} key={idx}>
        <div style={styles.itemRow}>
          <span style={styles.title}>
            <img src={item.avatar} style={styles.avatar} alt="avatar" />
            {item.username} 发布了一个评论
          </span>
          <span style={styles.status}>{item.time}</span>
        </div>
        <a style={styles.message}>
          {item.content}
        </a>
      </div>
    );
  };

  render() {
    const { comments } = this.state
    return (
      <div className="feed-list">
        <IceContainer>
          <div style={styles.titleRow}>
            <h2 style={styles.cardTitle}>评论列表</h2>
            <span style={styles.status}>共{comments.length}条评论</span>
          </div>
          {
            comments.length ? comments.map(this.renderItem)
              : <div>暂无评论，快来占据沙发吧！</div>
          }
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '18px',
    display: 'inline-flex',
  },
  title: {
    fontSize: '14px',
    display: 'inline-flex',
    lineHeight: '22px',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    color: '#999',
    fontSize: '12px',
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '15px',
    borderBottom: '1px solid #fafafa',
  },
  message: {
    color: '#999',
    fontSize: '12px',
    paddingLeft: '34px',
    marginBottom: '15px',
    lineHeight: '22px',
  },
  allMessage: {
    textAlign: 'center',
    height: '50px',
    lineHeight: '50px',
  },
};
