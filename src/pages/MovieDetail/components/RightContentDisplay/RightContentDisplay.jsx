import React, { Component } from 'react';

export default class RightContentDisplay extends Component {
  static displayName = 'RightContentDisplay';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="right-content-display" style={styles.container}>
        <div className="right-content-display-content" style={styles.content}>
          <div style={{marginRight: '80px'}}>
            <img
              src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2516079193.webp"
              alt="img"
              style={styles.image}
            />
          </div>
          <div style={styles.desc}>
            <div style={styles.descItem}>导演：布拉德佩顿</div>
            <div style={styles.descItem}>编剧：布拉德佩顿</div>
            <div style={styles.descItem}>主演：布拉德佩顿</div>
            <div style={styles.descItem}>类型：动作/科幻/冒险</div>
            <div style={styles.descItem}>制片国家：中国大陆</div>
            <div style={styles.descItem}>上映时间：2018-05-09</div>
            <div style={styles.descItem}>语言：英语</div>
            <div style={styles.descItem}>片长：107分钟</div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    margin: '0 auto',
    padding: '40px 0',
  },
  content: {
    display: 'flex',
    position: 'relative',
    alignItems: 'flex-start',
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  desc: {
    fontSize: '18px',
    color: '#ffffff'
  },
  descItem: {
    marginBottom: '10px'
  },
  image: {
    width: '100%',
    display: 'block',
    maxWidth: '360px',
  },
};
