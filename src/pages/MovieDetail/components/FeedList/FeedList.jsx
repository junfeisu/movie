import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import fetch from '../../../../fetch';
import Toastr from 'toastr';
import { copy, format } from 'mi-elegant';

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
      result.data.forEach(val => {
        val.time = format.formatTime(new Date(val.time).getTime())
      })
      this.setState({
        comments: result.data
      })
    }
  }

  deleteComment = async (comment, index) => {
    try {
      let user = JSON.parse(window.sessionStorage.getItem("user"))
      const { comments } = this.state
      if (!user || (user.role !== 'admin' && user._id !== comment.comment_user._id)) {
        Toastr.info("您无权删除此评论")
        return
      }

      const result = await fetch({
        url: '/comment/delete/' + comment._id,
        method: 'POST'
      })

      if (result.status) {
        Toastr.success("删除成功")
        let copyedComments = copy(comments)
        copyedComments.splice(index, 1)
        this.setState({
          comments: copyedComments
        })
      } else {
         Toastr.info("删除失败")
      }
    } catch (err) {
      if (err && err.data) {
        Toastr.error(err.data.message || err.message)
      }
    }
  }

  // ICE: React Component 的生命周期
  componentWillMount() {
    this.getComments()
  }

  renderItem = (item, idx) => {
    return (
      <div style={styles.item} key={idx}>
        <div style={styles.itemRow}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={styles.title}>
                <img src="https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png" style={styles.avatar} alt="avatar" />
                {item.username} 发布了一个评论
            </span>
            <span onClick={() => {
              this.deleteComment(item, idx)
            }} style={styles.delete}>删除</span>
          </div>
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
  delete: {
    fontSize: '14px',
    marginLeft: '20px',
    cursor: 'pointer',
    color: 'rgb(243, 7, 40)'
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
