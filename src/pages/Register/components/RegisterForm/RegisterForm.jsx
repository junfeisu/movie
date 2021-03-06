/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { Input, Button, Checkbox, Grid } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import fetch from '../../../../fetch';
import toastr from 'toastr';
import './RegisterForm.scss';

const { Row, Col } = Grid;

// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage =
  'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png';

export default class Register extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
      phone: undefined,
    };
  }

  register = async (e) => {
    e.preventDefault()

    const { username, password, phone } = this.state
    try {
      if (username && password && phone) {
        const registerResult = await fetch({
          url: '/user/add',
          method: 'POST',
          data: {
            username: username,
            password: password,
            phone: phone
          }
        })
        console.log(registerResult.data)
        const { data, status } = registerResult
        if (status) {
          toastr.success("注册成功，前去登录")
          hashHistory.push("login")
        }
      } else {
        toastr.info("用户名，密码都不能为空")
      }
    } catch (err) {
      if (err && err.data) {
        toastr.error(err.data.message)
      } else {
        toastr.error('未知错误')
      }
    }
  }

  componentWillMount() {
    window.sessionStorage.removeItem('user')
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <div style={styles.userLogin} className="user-login">
        <div
          style={{
            ...styles.userLoginBg,
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div style={styles.contentWrapper} className="content-wrapper">
          <h2 style={styles.slogan} className="slogan">
            欢迎使用 <br /> 影院购票选座系统
          </h2>
          <div style={styles.formContainer}>
            <h4 style={styles.formTitle}>注册</h4>
            <IceFormBinderWrapper
              value={this.state.value}
              onChange={this.formChange}
              ref="form"
            >
              <div style={styles.formItems}>
                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon
                      type="person"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <IceFormBinder name="account" required message="必填">
                      <Input maxLength={20} placeholder="用户名" onChange={(val, evt) => {
                        this.setState({
                          username: val
                        })
                      }} />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="account" />
                  </Col>
                </Row>
                
                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon
                      type="phone"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <IceFormBinder name="phone" required message="必填">
                      <Input htmlType="text" placeholder="手机号" onChange={(val, evt) => {
                        this.setState({ phone: val })
                      }} />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="phone" />
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon
                      type="lock"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <IceFormBinder name="password" required message="必填">
                      <Input htmlType="password" placeholder="密码" onChange={(val, evt) => {
                        this.setState({ password: val })
                      }} />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="password" />
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Button
                    type="primary"
                    onClick={this.register}
                    style={styles.submitBtn}
                  >
                    注册
                  </Button>
                </Row>

                <Row className="tips" style={styles.tips}>
                  <Link to="login" style={styles.link}>
                    立即登录
                  </Link>
                </Row>
              </div>
            </IceFormBinderWrapper>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  userLogin: {
    position: 'relative',
    height: '100vh',
  },
  userLoginBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '3px',
    color: '#999',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
};
