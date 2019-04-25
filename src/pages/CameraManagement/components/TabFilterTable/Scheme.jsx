import React, { Component } from 'react';
import { Message,Icon, Button, Checkbox, Table, Pagination } from '@alifd/next';
import { connect } from 'react-redux'
const { Group: CheckboxGroup } = Checkbox;
import axios from 'axios';
import {
  fetchData, test
} from '../../actions'
import EditDialog from './EditDialog';
import DeleteBalloon from './DeleteBalloon';
import AddDialog from './AddDialog';
const getData = () => {
  return Array.from({ length: 10 }).map(() => {
    return {
      schemeName: '手淘商品详情',
      time: '2018-08-28 11:49:38',
      leader: '淘小宝',
      stat: {
        success: '289',
        error: '23',
        uncover: '136',
      },
    };
  });
};

const checkboxOptions = [
  {
    value: 'success',
    label: '成功',
  },
  {
    value: 'error',
    label: '错误',
  },
  {
    value: 'uncover',
    label: '未覆盖',
  },
];

class TableFilter extends Component {
  static displayName = 'TableFilter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };

    this.columns = [
      {
        title: '状态',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '编号',
        dataIndex: 'capital',
        key: 'capital',
      },
      {
        title: '名称',
        dataIndex: 'subregion',
        key: 'subregion',
      },
      {
        title: '品牌',
        dataIndex: 'population',
        key: 'population',
      },
      {
        title: '类型',
        dataIndex: 'population',
        key: 'population',
      },
      {
        title: '平台接入方式',
        dataIndex: 'population',
        key: 'population',
      },
      {
        title: '所属街道',
        dataIndex: 'population',
        key: 'population',
      },
      {
        title: '监控统计',
        dataIndex: 'population',
        key: 'population',
      },
      {
        title: '备注',
        dataIndex: 'population',
        key: 'population',
      },
      {
        title: '操作',
        key: 'action',
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

  handleRemove = (value, index) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey].splice(index, 1);
    this.setState({
      dataSource,
    });
  };

  componentDidMount() {
    this.fetchData('https://restcountries.eu/rest/v1/all');
  }


  handlePaginationChange = (current) => {
    this.setState({
      current,
    });
  };
  getFormValues = (dataIndex, values) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey][dataIndex] = values;
    this.setState({
      dataSource,
    });
  };
  onChange = (selectedItems) => {
    console.log('onChange callback', selectedItems);
  };

  renderOper = () => {
    return <a style={styles.link}>详情</a>;
  };
  fetchData = (url) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
          axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
          }).then(
            (response) => {
              this.setState({
                dataSource:response.data,
                isLoading: false,
              });
            }
            //箭头函数中无this定义，this标识组件
         //   function (response) {
        //    this.setState({
        //      dataSource:response.data,
        //      isLoading: false,
        //    });
        //  }
          )
          .catch(
            (error) => {
              console.log(error)
              this.setState({
                isLoaded:false
              })
              Message.warning('请求数据失败');
            }           
           );               
      }
    );
  };
  renderStat = (value) => {
    console.log(value);
    return (
      <div>
        <span style={{ ...styles.stat, ...styles.successColor }}>
          {value.success}
        </span>
        <span style={{ ...styles.stat, ...styles.errorColor }}>
          {value.error}
        </span>
        <span style={{ ...styles.stat, ...styles.uncoverColor }}>
          {value.uncover}
        </span>
      </div>
    );
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.test();
  };
  render() {
    const { isLoading, dataSource } = this.state;
    const { current } = this.state;
    const {login} = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.tableHead}>
        <AddDialog />    
          <Button size="small" style={styles.btn} type="normal"><Icon type="download" /> 导入</Button>
        </div>
        <Table
          loading={isLoading}
          dataSource={dataSource} hasBorder={false}>
{
  this.columns.map((item) => {
    if (typeof item.render === 'function') {
      return (
        <Table.Column
          title={item.title}
          key={item.key}
          cell={item.render}
          width={item.width || 150}
        />
      );
    }

    return (
      <Table.Column
        key={item.key}
        title={item.title}
        dataIndex={item.dataIndex}
        width={item.width || 150}
      />
    );
  })
}
        </Table>
        <Pagination
          total={67}
          style={styles.pagination}
          current={current}
          onChange={this.handlePaginationChange}
        />
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '10px 0',
  },
  btn:{
    marginRight:'10px',
  },
  tableHead: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  label: {
    marginRight: '10px',
  },
  link: {
    margin: '0 5px',
    color: 'rgba(49, 128, 253, 0.65)',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  stat: {
    padding: '4px 8px',
    color: '#fff',
    fontSize: '12px',
  },
  successColor: {
    background: '#00a854',
  },
  errorColor: {
    background: '#f04134',
  },
  uncoverColor: {
    background: '#ffbf00',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
const mapStateToProps = (state) => {
  return { login: state.login};
};
// 在这个对象中, 属性名会成为 prop 的 names,
// 属性值应该是 action 生成器函数.
// 它们跟 `dispatch` 绑定起来.
//如果将这个放入到connect中this.props.dispatch(decrement());将会无效只能使用this.props.decrement()
const mapDispatchToProps = {
  fetchData,
  test
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableFilter);