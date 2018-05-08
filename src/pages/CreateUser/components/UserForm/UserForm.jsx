/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './UserForm.scss';
import fetch from '../../../../fetch';
import Toastr from 'toastr';
import { hashHistory } from 'react-router'

const { Row, Col } = Grid;
const Toast = Feedback.toast;
export default class UserForm extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        displayName: '',
        role: 'normal',
        userState: null,
        passwd: '',
        rePasswd: '',
      },
    };
  }

  addUser = async () => {
    try {
      const { username, displayName, passwd, role } = this.state.value
      const result = await fetch({
        url: '/user/add',
        method: 'POST',
        data: {
          username: username,
          password: passwd,
          phone: displayName,
          role: role
        }
      })

      if (result.status) {
        Toastr.info("注册成功，前去登录")
        hashHistory.push('/login')
      } else {
        Toastr.error("注册失败")
      }
    } catch (err) {
      if (err && err.data) {
        Toastr.error(err.data.message)
      }
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

      this.addUser()
    });
  };

  render() {
    const { user } = this.props
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>添加用户</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  用户名：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="username" required message="必填">
                    <Input size="large" placeholder="请输入用户名" />
                  </IceFormBinder>
                  <IceFormError name="username" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  手机：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="displayName">
                    <Input size="large" placeholder="请输入昵称" />
                  </IceFormBinder>
                  <IceFormError name="displayName" />
                </Col>
              </Row>

              {
                user.role === 'admin' ? <Row style={styles.formItem}>
                  <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                    用户组：
                </Col>
                  <Col xxs="16" s="12" l="10">
                    <IceFormBinder name="role">
                      <Select
                        size="large"
                        placeholder="请选择..."
                        value={this.state.value.role}
                        dataSource={[
                          { label: '管理员', value: 'admin' },
                          { label: '普通用户', value: 'normal' },
                        ]}
                      />
                    </IceFormBinder>
                  </Col>
                </Row> : null
              }

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  新密码：
                </Col>
                <Col xxs="16" s="12" l="10">
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
                <Col xxs="16" s="12" l="10">
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
