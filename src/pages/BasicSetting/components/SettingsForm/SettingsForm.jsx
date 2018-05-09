/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Select, Upload, Grid } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './SettingsForm.scss';
import categories from '../../../../categories';
import fetch from '../../../../fetch';
import Toastr from 'toastr';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const { ImageUpload } = Upload;

function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}

function onChange(info) {
  console.log('onChane callback : ', info);
}

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  console.log('onError callback : ', file);
}

export default class SettingsForm extends Component {
  static displayName = 'SettingsForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        zh_name: '',
        language: '中文',
        runtime: '',
        image: '',
        genres: [],
        region: '',
        directors: '',
        actors: '',
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll(async (errors, values) => {
      if (errors && errors.length) {
        Toastr.info(errors[0].message)
      } else {
        values.region = [values.region]
        value.directors = value.directors.trim().split('\s')
        value.actors = value.actors.trim().split('\s')

        const { zh_name, language, genres, runtime, region, image, directors, actors } = values

       const result = await fetch({
         url: '/'
       })
      }
    });
  };

  render() {
    return (
      <div className="settings-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>添加电影</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  电影名：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder name="zh_name" required max={10} message="电影名必填">
                    <Input size="large" placeholder="电影名" />
                  </IceFormBinder>
                  <IceFormError name="zh_name" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  海报：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder name="image" required message="必填">
                    <ImageUpload
                      listType="picture-card"
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                      locale={{
                        image: {
                          cancel: '取消上传',
                          addPhoto: '上传图片',
                        },
                      }}
                      beforeUpload={beforeUpload}
                      onChange={onChange}
                      onSuccess={onSuccess}
                      onError={onError}
                    />
                  </IceFormBinder>
                  <IceFormError name="image" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  语言：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder name="language" required message="必填">
                    <RadioGroup>
                      <Radio value="中文">中文</Radio>
                      <Radio value="英文">英文</Radio>
                    </RadioGroup>
                  </IceFormBinder>
                  <IceFormError name="language" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  电影时长：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder
                    name="runtime"
                    required
                    message="请输入电影时长"
                  >
                    <Input
                      size="large"
                    />
                  </IceFormBinder>
                  <IceFormError name="runtime" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  电影分类：
                </Col>
                <Col span="11" offset="2">
                    <IceFormBinder
                      name="genres"
                      required
                      type="array"
                      message="分类必填支持多个"
                    >
                      <Select
                        style={styles.cats}
                        multiple
                        placeholder="请选择分类"
                        dataSource={categories}
                      />
                    </IceFormBinder>
                    <IceFormError
                      name="cats"
                      render={(errors) => {
                        console.log('errors', errors);
                        return (
                          <div>
                            <span style={{ color: 'red' }}>
                              {errors.map(item => item.message).join(',')}
                            </span>
                          </div>
                        );
                      }}
                    />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  制片国家 ：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder
                    name="region"
                    required
                    message="请输入电影制片国家"
                  >
                    <Input
                      size="large"
                    />
                  </IceFormBinder>
                  <IceFormError name="region" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  导演：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder
                    name="directors"
                    required
                    message="请输入电影导演"
                  >
                    <Input size="large" placeholder="输入电影的导演，以空格分割" />
                  </IceFormBinder>
                  <IceFormError name="directors" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  主演：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder
                    name="actors"
                    required
                    message="请输入电影的主演"
                  >
                    <Input
                      size="large"
                      placeholder="输入电影的主演，以空格分割"
                    />
                  </IceFormBinder>
                  <IceFormError name="actors" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                style={{ width: 100 }}
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
  label: {
    textAlign: 'right',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
