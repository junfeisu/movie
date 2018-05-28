import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Search, Form, Button, Select, DatePicker, moment, Menu } from '@icedesign/base';
import fetch from '../../../../fetch';

const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class ContentEditor extends Component {
  static displayName = 'ContentEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      movie: '',
      author: '',
      time: '',
      price: '',
      menuData: [
        {
          text: "Option 1",
          value: "Option 1 Value",
          index: "1"
        },
        {
          text: "Option 2",
          value: "Option 2 Value",
          index: "2"
        },
        {
          text: "Option 3",
          value: "Option 3 Value",
          index: "3"
        },
        {
          text: "Option 4",
          value: "Option 4 Value",
          index: "4"
        }
      ],
      filter: [
        {
          text: "Products",
          value: "Products"
        },
        {
          text: "Products1",
          value: "Products1"
        },
        {
          text: "Products2",
          value: "Products2"
        },
        {
          text: "Products3",
          value: "Products3"
        },
        {
          text: "Products4",
          value: "Products4"
        },
        {
          text: "Products5",
          value: "Products5"
        },
        {
          text: "Products6",
          value: "Products6"
        },
        {
          text: "Products7",
          value: "Products7"
        },
        {
          text: "Products8",
          value: "Products8"
        },
        {
          text: "Products9",
          value: "Products9"
        },
        {
          text: "Products10",
          value: "Products10"
        },
        {
          text: "Suppliers",
          value: "Suppliers",
          default: true
        }
      ]
    }
  }

  changeMovie = async (value) => {
    console.log('value', value)
    const result = await fetch({
      url: '/movie/'
    })
  }

  onClick = (selectedKeys) => {
    if (typeof selectedKeys === "string") {
      this.setState({
        overlayVisible: false,
        value: selectedKeys
      });
    }
  }

  onDelete = (e) => {
    e.stopPropagation();

    const index = e.currentTarget.getAttribute("data-index");

    const menuData = this.state.menuData;

    const menuDataNew = [];

    menuData.forEach(function (item) {
      if (item.index !== index) {
        menuDataNew.push(item);
      }
    });

    this.setState({
      menuData: menuDataNew
    });
  }

  renderMenu() {
    const menuData = this.state.menuData;

    return (
      <Menu onClick={this.onClick.bind(this)} className="diy-menu">
        <Menu.Group label="Recent" key="xxx">
          {menuData.map(item => {
            return (
              <Menu.Item key={item.value}>
                {" "}
                {item.text}{" "}
                <a
                  onClick={this.onDelete.bind(this)}
                  target="_self"
                  data-index={item.index}
                >
                  Delete
                </a>{" "}
              </Menu.Item>
            );
          })}
        </Menu.Group>
      </Menu>
    );
  }

  handleSubmit = () => {
    this.postForm.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }

      // ajax values
    });
  };

  render() {
    return (
      <div className="content-editor">
        <IceContainer>
          <h2 style={styles.title}>添加上映</h2>
          <Form labelAlign="top" style={styles.form}>
            <Row>
              <Col span="11">
                <FormItem label="电影" required>
                  <Search 
                    onChange={this.changeMovie}
                    combox={<div>{this.renderMenu()}</div>}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="电影院" required>
                  <Input placeholder="填写上映影院" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="票价" required>
                  <Input placeholder="填写电影票价" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="上映时间">
                  <DatePicker
                    format={"YYYY/MM/DD HH:mm"}
                    showTime={{ defaultValue: moment("0:0", "HH:mm") }}
                  />
                </FormItem>
              </Col>
            </Row>
            
            <FormItem label="">
              <Button type="primary" onClick={this.handleSubmit}>
                发布上映管理
              </Button>
            </FormItem>
          </Form>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0px 0px 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
};
