import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import fetch from '../../../../fetch';
import Toastr from 'toastr';
import { Pagination } from '@icedesign/base';
import './TabTable.scss'

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      movies: [],
      total: 1
    };
    this.columns = [
      {
        title: '电影名',
        dataIndex: 'zh_name',
        key: 'zh_name',
        width: 150,
      },
      {
        title: '片长',
        dataIndex: 'runtime',
        key: 'runtime',
        width: 150,
      },
      {
        title: '导演',
        width: 150,
        dataIndex: 'directors',
        render: (value, index, record) => {
          return (
            record.directors.map(value => {
              if (value.name) {
                return value.name + ' '
              } else {
                return value + ' '
              }
            })
          )
        }
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

  handleChange = (current) => {
    this.setState({
      current
    }, this.getMvoieList)
  }

  getMvoieList = async () => {
    const { current } = this.state
    const result = await fetch({
      url: '/movie/list',
      method: 'POST',
      data: {
        pageNum: current
      }
    })

    this.setState({
      movies: result.movies,
      total: result.total
    })
  }

  componentWillMount () {
    this.getMvoieList()
  }

  getFormValues = (dataIndex, values) => {
    const { movies } = this.state;
    movies[dataIndex] = values;
    this.setState({
      movies,
    });
  };

  handleRemove = async (value, index, record) => {
    const { movies } = this.state;

    const deleteResult = await fetch({
      url: '/movie/delete',
      method: 'POST',
      data: {
        movie_id: record._id
      }
    })

    if (deleteResult.status) {
      movies.splice(index, 1);
      this.setState({
        movies,
      });
    }
  };

  render() {
    return (
      <div className="tab-table">
        <IceContainer>
          <CustomTable
            dataSource={this.state.movies}
            columns={this.columns}
            hasBorder={false}
          />
        </IceContainer>
        <Pagination total={this.state.total} current={this.state.current} onChange={this.handleChange} />
      </div>
    );
  }
}
