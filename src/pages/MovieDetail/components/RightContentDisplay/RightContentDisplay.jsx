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
          <div style={styles.col}>
            <img
              src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2516079193.webp"
              alt="img"
              style={styles.image}
            />
          </div>
          <div style={styles.col}>
            <h2 style={styles.title}>功能描述</h2>
            <p style={styles.description}>
              功能描述的文案，功能描述的文案功能描述的文案功能描述的文案
            </p>
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
    alignItems: 'center',
    overflow: 'hidden',
  },
  col: {
    width: '48%',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
  },
  description: {
    color: '#999',
    lineHeight: '22px',
  },
  image: {
    width: '100%',
    display: 'block',
    maxWidth: '360px',
  },
};
