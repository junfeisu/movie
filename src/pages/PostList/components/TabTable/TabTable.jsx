import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import fetch from '../../../../fetch'
import { format } from 'mi-elegant'

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
    this.columns = [
      {
        title: '上映电影',
        key: 'title',
        width: 200,
        render: (value, index, record) => {
          return (
            <span>
              {record.movieInfo.zh_name}
            </span>
          )
        }
      },
      {
        title: '票价',
        dataIndex: 'price',
        key: 'price',
        width: 150,
      },
      {
        title: '上映时间',
        dataIndex: 'time',
        key: 'time',
        width: 150,
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        render: (value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
              />
              <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        },
      },
    ];
  }

  getArrangeList = async () => {
    const result = await fetch({
      url: '/arrange/search',
      method: 'POST',
      data: {}
    })
    if (result.status) {
      result.data.forEach(value => {
        value.time = format.formatDate(value.time, 'yyyy-mm-dd HH:mm')
        value.movieInfo = value.movie
        value.movie = value.movie._id
      })
      this.setState({
        dataSource: result.data
      })
    } else {
      toastr.info('获取数据失败')
    }
  }

  componentDidMount() {
    this.getArrangeList()
  }

  getFormValues = (dataIndex, values) => {
    const { dataSource } = this.state;
    dataSource[dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  handleRemove = (value, index) => {
    const { dataSource, tabKey } = this.state;
    dataSource.splice(index, 1);
    this.setState({
      dataSource,
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div className="tab-table">
        <IceContainer style={{ padding: '0 20px 20px' }}>
          <CustomTable
            dataSource={dataSource}
            columns={this.columns}
            hasBorder={false}
          />
        </IceContainer>
      </div>
    );
  }
}
