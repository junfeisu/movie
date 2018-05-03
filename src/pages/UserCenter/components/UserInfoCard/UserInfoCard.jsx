import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Balloon, Icon } from '@icedesign/base';

export default class UserInfoCard extends Component {
  static displayName = 'UserInfoCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props

    return (
      <IceContainer>
        <div className="user-info-card" style={styles.container}>
            <div style={styles.content}>
              <div style={styles.head}>
                <img
                  src="https://img.alicdn.com/tfs/TB1nf.WjyqAXuNjy1XdXXaYcVXa-245-245.gif"
                  style={styles.avatar}
                  alt="头像"
                />
                <div style={styles.baseInfo}>
                  <h5 style={styles.name}>{user.username}</h5>
                </div>
              </div>
              <ul style={styles.body}>
                <li style={styles.profileItem}>
                  <Icon type="map" size="xs" style={styles.itemIcon} /> 杭州
                </li>
                <li style={styles.profileItem}>
                  <Icon type="mobile-phone" size="xs" style={styles.itemIcon} />
                  {user.phone}
                </li>
              </ul>
            </div>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '20px 0',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  head: {
    display: 'flex',
    paddingBottom: '10px',
    borderBottom: '1px dotted #eee',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50px',
    border: '1px solid #eee',
  },
  baseInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  name: {
    padding: '0 10px',
    margin: 0
  },
  deptName: {
    padding: '0 10px',
    margin: 0,
    fontSize: '12px',
  },
  body: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '10px',
  },
  profileItem: {
    width: '50%',
    lineHeight: '26px',
    textAlign: 'left'
  },
  itemIcon: {
    color: '#8a9099',
    marginRight: '5px',
  },
  triggerText: {
    color: '#108ee9',
    borderBottom: '1px dashed #108ee9',
    cursor: 'pointer',
  },
};
