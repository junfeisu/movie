/* eslint jsx-a11y/media-has-caption: 0, jsx-a11y/no-noninteractive-element-interactions: 0 */
import React, { Component } from 'react';
import { Grid } from '@icedesign/base';
import { Link } from 'react-router';
import fetch from '../../../../fetch';
import toastr from 'toastr';

const { Row, Col } = Grid;

export default class VideoList extends Component {
  static displayName = 'VideoList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      dialogVisible: false,
      dialogVideo: {},
      movies: [],
      titles: ['正在热映', '即将上映']
    };
  }

  fetchPlayingMovies = async () => {
    try {
      const playingMovies = await fetch({
        url: '/movie/playing'
      })

      this.setState({
        movies: playingMovies.data
      })
    } catch (err) {
      toastr.error(err)
    }
  }

  fetchWillPlayMovies = async () => {
    try {
      const willPlayMovies = await fetch({
        url: '/movie/come_soon'
      })

      willPlayMovies.data.forEach(val => {
        val.actors = val.casts
        val.image = val.images.small
      })

      this.setState({
        movies: willPlayMovies.data
      })
    } catch (err) {
      toastr.error(err)
    }
  }

  componentWillMount () {
    this.fetchPlayingMovies()
  }

  handleCateChange = (index) => {
    this.setState({
      index,
    });

    index !== 0 ? this.fetchWillPlayMovies() : this.fetchPlayingMovies()
  };

  render() {
    const { titles, movies, index } = this.state
    return (
      <div style={styles.videoListContainer}>
        <ul style={styles.videoCate}>
          {titles.map((item, index) => {
            const activeStyle =
              this.state.index === index ? styles.active : null;
            return (
              <li
                key={index}
                style={{ ...styles.videoCateItem, ...activeStyle }}
                onClick={() => this.handleCateChange(index)}
              >
                {item}
              </li>
            );
          })}
        </ul>

        <Row style={styles.videoList} gutter="20" wrap={true}>
          {movies.map((item, index) => {
            return (
              <Col xxs="24" s="12" l="6" key={index}>
                <div style={styles.videoCarditem}>
                  <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
                    <img
                      src={item.image}
                      style={styles.poster}
                    />
                  </div>
                  <div style={styles.videoInfo}>
                    <h5 style={styles.videoTitle}>{item.zh_name || item.title}</h5>
                    <div style={styles.videoDesc}>
                      <div>导演：{item.directors.map(item => {
                        return item.name + ' '
                      })}</div>
                      <div>主演：{item.actors.slice(0, 4).map(item => {
                        return item.name + ' '
                      })}</div>
                      <div>类型：{item.genres.map(item => {
                        return item + ' '
                      })}</div>
                      <div>时间：{item.runtime || item.year}</div>
                    </div>
                    <Link to={`/movieDetail/${item._id || item.id}`} style={styles.videoLink}>
                      选座购票{' '}
                      <img
                        src="https://img.alicdn.com/tfs/TB13yHPmrSYBuNjSspiXXXNzpXa-40-40.png"
                        style={styles.arrowIcon}
                      />
                    </Link>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const styles = {
  videoListContainer: {
    margin: '20px 0',
  },
  videoCate: {
    margin: '0',
    background: '#fff',
    padding: '0 14px',
    borderRadius: '4px',
  },
  videoCateItem: {
    display: 'inline-block',
    margin: '12px 4px',
    padding: '6px 18px',
    fontSize: '16px',
    color: '#666',
    cursor: 'pointer',
  },
  videoList: {
    margin: '20px 0 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  videoCarditem: {
    marginBottom: '20px',
    borderRadius: '4px',
    background: '#fff',
  },
  active: {
    color: '#FF5D38',
    border: '1px solid #FF5D38',
    borderRadius: '50px',
  },
  poster: {
    display: 'block',
    width: '100%',
    height: '150%',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  dialogVideo: {
    width: '600px',
  },
  videoInfo: {
    position: 'relative',
    padding: '20px',
  },
  videoTitle: {
    margin: '0 0 10px',
    lineHeight: '32px',
    fontSize: '24px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  videoDesc: {
    padding: '0 0 20px',
    fontSize: '14px',
    color: '#999',
    lineHeight: '20px',
    height: '120px',
    overflow: 'hidden',
  },
  videoLink: {
    display: 'block',
    width: '124px',
    height: '32px',
    lineHeight: '32px',
    textAlign: 'center',
    color: '#fff',
    background: '#FF5D38',
    margin: '0 auto'
  },
  arrowIcon: {
    width: '20px',
    height: '20px',
    verticalAlign: 'middle',
    marginLeft: '4px',
    marginTop: '-2px',
  },
  playerIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '40px',
    height: '40px',
    marginLeft: '-20px',
    marginTop: '-20px',
  },
};
