/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './ChangePasswordForm.scss';
import Toastr from 'toastr';
import fetch from '../../../../fetch';
import { hashHistory } from 'react-router';

const { Row, Col } = Grid;

export default class ChangePasswordForm extends Component {
  static displayName = 'ChangePasswordForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        oldPassword: '',
        passwd: '',
        rePasswd: '',
      },
      user: null
    };
  }

  updatePassword = async () => {
    try {
      const { value, user } = this.state
      const { oldPassword, passwd } = value
      const result = await fetch({
        url: '/user/updatePassword',
        method: 'POST',
        data: {
          user_id: user._id || user.user_id,
          oldPassword: oldPassword,
          newPassword: passwd
        }
      })

      if (result.status) {
        Toastr.success("修改密码成功，请重新登录")
        hashHistory.push('/login')
      }
    } catch (err) {
      if (err & err.data) {
        Toastr.error(err.data.message)
      }
    }
  }

  componentWillMount () {
    let user = JSON.parse(window.sessionStorage.getItem('user'))
    if (!user) {
      hashHistory.push('/login')
    } else {
      this.setState({
        user: user
      })
    }
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 6) {
      callback('密码必须大于6位');
    } else if (values.length > 15) {
      callback('密码必须小于15位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    if (values && values !== stateValues.passwd) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      this.updatePassword()
    });
  };

  render() {
    return (
      <div className="change-password-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>修改密码</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  原密码：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder
                    name="oldPassword"
                    required
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="请输入原密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="oldPassword" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  新密码：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder
                    name="passwd"
                    required
                    validator={this.checkPasswd}
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="请重新输入新密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="passwd" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  确认密码：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder
                    name="rePasswd"
                    required
                    validator={(rule, values, callback) =>
                      this.checkPasswd2(
                        rule,
                        values,
                        callback,
                        this.state.value
                      )
                    }
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="两次输入密码保持一致"
                    />
                  </IceFormBinder>
                  <IceFormError name="rePasswd" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
