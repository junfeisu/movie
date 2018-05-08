import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@icedesign/base';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import fetch from '../../../../fetch';
import Toastr from 'toastr';

const TabPane = Tab.TabPane;

const tabs = [{ tab: '全部', key: 'all' }];

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      tabKey: 'all',
      users: []
    };
    this.columns = [
      {
        title: 'ID',
        dataIndex: '_id',
        key: 'id',
        width: 50,
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        width: 100,
      },
      {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
        width: 150,
      },
      {
        title: '用户组',
        dataIndex: 'role',
        key: 'role',
        width: 120,
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
              />
              <DeleteBalloon
                handleRemove={() => this.deleteUser(value, index, record)}
              />
            </span>
          );
        },
      },
    ];
  }

  getUserList = async () => {
    const result = await fetch({
      url: '/user/list'
    })

    if (result.status) {
      this.setState({
        users: result.data
      })
    }
  }

  componentDidMount() {
    this.getUserList()
  }

  getFormValues = (dataIndex, values) => {
    const { users } = this.state;
    users[dataIndex] = values;
    this.setState({
      users,
    });
  };

  deleteUser = async (value, index, record) => {
    const { users } = this.state;
    const deleteResult = await fetch({
      url: '/user/delete/' + record._id,
      method: 'POST'
    })

    if (deleteResult.status) {
      users.splice(index, 1);

      this.setState({
        users,
      });
    }
  };

  handleTabChange = (key) => {
    this.setState({
      tabKey: key,
    });
  };

  render() {
    const { users } = this.state;
    return (
      <div className="tab-table">
        <IceContainer style={{ padding: '0 20px 20px' }}>
          <Tab onChange={this.handleTabChange}>
            {tabs.map((item) => {
              return (
                <TabPane tab={item.tab} key={item.key}>
                  <CustomTable
                    dataSource={users}
                    columns={this.columns}
                    hasBorder={false}
                  />
                </TabPane>
              );
            })}
          </Tab>
        </IceContainer>
      </div>
    );
  }
}
