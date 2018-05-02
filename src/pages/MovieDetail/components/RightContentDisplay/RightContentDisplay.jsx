import React, { PureComponent } from 'react';
import fetch from '../../../../fetch';

export default class RightContentDisplay extends PureComponent {
  static displayName = 'RightContentDisplay';

  constructor(props) {
    super(props);
    this.state = {
      movie: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.movie !== this.props.movie) {
      this.setState({
        movie: nextProps.movie
      })
    }
  }

  render() {
    const { movie } = this.state

    return (
      <div className="right-content-display" style={styles.container}>
        <div className="right-content-display-content" style={styles.content}>
          <div style={{marginRight: '80px'}}>
            <img
              src={movie ? movie.image : ''}
              alt="img"
              style={styles.image}
            />
          </div>
          <div style={styles.desc}>
            <div style={styles.descItem}>影名： {movie ? movie.zh_name : ''}</div>
            <div style={styles.descItem}>导演：{
              movie ? movie.directors.map(item => {
                return item.name + ' '
              }) : '暂无'
            }</div>
            <div style={styles.descItem}>主演：{
              movie ? movie.actors.slice(0, 4).map(item => {
                return item.name + ' '
              }) : '暂无'
            }</div>
            <div style={styles.descItem}>类型：{
              movie ? movie.genres.map(item => {
                return item + ' '
              }) : '暂无'
            }</div>
            <div style={styles.descItem}>制片国家：{
              movie ? movie.region.map(item => {
                return item + ' '
              }) : '暂无'
            }</div>
            <div style={styles.descItem}>上映时间：{movie ? movie.initialReleaseDate[0] : '暂无'}</div>
            <div style={styles.descItem}>语言：{
              movie ? movie.language.map(item => {
                return item + ' '
              }) : '暂无'
            }</div>
            <div style={styles.descItem}>片长：{movie ? movie.runtime : 0}</div>
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
