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
        zh_name: '中国少年',
        language: '中文',
        runtime: '107分钟',
        image: '',
        genres: ['剧情', '喜剧'],
        region: '中国',
        directors: '导演1',
        actors: '主演1 主演2 主演3 ',
      },
      token: ''
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll(async (errors, values) => {
      if (errors) {
        if (errors.length) {
          Toastr.info(errors[0].message)
        }
      } else {
        values.region = values.region instanceof Array ?  [values.region] : values.region
        values.language = values.language instanceof Array ? [values.language] : values.language
        values.directors = values.directors instanceof Array ? values.directors : values.directors.trim().split(/\s+/)
        values.actors = values.actors instanceof Array ? values.directors : values.actors.trim().split(/\s+/)

        const imageUrl = await fetch({
          url: '/upload/download',
          method: 'POST',
          data: {
            domain: 'http://owu5dbb9y.bkt.clouddn.com',
            key: values.image.file.name
          }
        })

        values.image = imageUrl.url

        const { zh_name, language, genres, runtime, region, image, directors, actors } = values

       const result = await fetch({
         url: '/movie/add',
         method: 'POST',
         data: values
       })

       if (result.status) {
        Toastr.success("添加成功")
       }
      }
    });
  };

  getUploadToken = async () => {
    const result = await fetch({
      url: '/upload/up'
    })

    this.setState({
      token: result.uploadToken
    })
  }

  componentWillMount () {
    this.getUploadToken()
  }

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
                      listType="text"
                      action="http://upload.qiniu.com"
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                      locale={{
                        image: {
                          cancel: '取消上传',
                          addPhoto: '上传图片',
                        },
                      }}
                      data={{
                        token: this.state.token
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
