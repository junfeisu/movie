import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field } from '@icedesign/base';
import { copy } from 'mi-elegant';
import Toastr from 'toastr';
import fetch from '../../../../../fetch';

const FormItem = Form.Item;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
    };
    this.field = new Field(this);
  }

  handleSubmit = () => {
    this.field.validate(async (errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }

      values.directors = values.directors.trim().split(/\s/)

      const result = await fetch({
        url: '/movie/update',
        method: 'POST',
        data: values
      })

      if (result.status) {
        const { dataIndex } = this.state;
        this.props.getFormValues(dataIndex, values);
        this.setState({
          visible: false,
        });
      } else {
        Toastr.error("修改失败")
      }
    });
  };

  onOpen = (index, record) => {
    this.field.setValues({ ...record });
    this.setState({
      visible: true,
      dataIndex: index,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  arrayToString = (arr, key) => {
    let string = ''
    if (key) {
      arr.map(value => {
        if (value[key]) {
          string += value[key] + ' '
        } else {
          string += value + ' '
        }
      })
    } else {
      arr.map(value => {
        string += value + ' '
      })
    }

    return string
  }

  render() {
    const init = this.field.init;
    const { index, record } = this.props;
    const copyRecord = copy(record)
    copyRecord.directors = this.arrayToString(copyRecord.directors, 'name')
    
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    return (
      <div style={styles.editDialog}>
        <Button
          size="small"
          type="primary"
          onClick={() => this.onOpen(index, copyRecord)}
        >
          编辑
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="编辑"
        >
          <Form direction="ver" field={this.field}>
            <FormItem label="电影名：" {...formItemLayout}>
              <Input
                {...init('zh_name', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="片长：" {...formItemLayout}>
              <Input
                {...init('runtime', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="导演：" {...formItemLayout}>
              <Input
                {...init('directors', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
          </Form>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
};
