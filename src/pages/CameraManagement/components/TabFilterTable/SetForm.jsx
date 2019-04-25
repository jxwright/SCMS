import React, { Component } from 'react';
import { Icon, Grid, Form, Input, Field, Select } from '@alifd/next';

const FormItem = Form.Item;
const {Row, Col} = Grid;
export default class SetForm extends Component {
    static displayName = 'SetForm';

    static defaultProps = {};
  
    constructor(props) {
      super(props);
      this.state = {
        visible: false,
        dataIndex: null,
      };
      this.field = new Field(this);
    }
    componentDidMount() {
      this.props.onGetShowForm(this)
      this.getStatusData('https://restcountries.eu/rest/v1/all');
      this.getBrandData('https://restcountries.eu/rest/v1/all');
      this.getTypeData('https://restcountries.eu/rest/v1/all');
      this.field.setValues({ ...this.props.formValue });
    }
  
    getStatusData = (url) => {
  
      const list = [
      { value: 'apple', label: 'apple' }, 
      { value: 'pear', label: 'pear' }, 
      { value: 'orange', label: 'orange' }
    ];
    this.setState({
      statusDataSource: list
    });
    /*
      axios({
        url: url,
        timeout: 20000,
        method: 'get',
        responseType: 'json'
      }).then(
        (response) => {
          this.setState({
            statusDataSource: response.data
          });
        }
      )
        .catch(
          (error) => {
            console.log(error)
            Message.warning('请求摄像头状态数据失败');
          }
        );
        */
    };
    getBrandData = (url) => {
      const list = [
        { value: 'apple', label: 'apple' }, 
        { value: 'pear', label: 'pear' }, 
        { value: 'orange', label: 'orange' }
      ];
      this.setState({
        brandDataSource: list
      });
      /* axios({
        url: url,
        timeout: 20000,
        method: 'get',
        responseType: 'json'
      }).then(
        (response) => {
          this.setState({
            brandDataSource: response.data
          });
        }
      )
        .catch(
          (error) => {
            console.log(error)
            Message.warning('请求摄像头状态数据失败');
          }
        );*/
    };
  
    getTypeData = (url) => {
      const list = [
        { value: 'apple', label: 'apple' }, 
        { value: 'pear', label: 'pear' }, 
        { value: 'orange', label: 'orange' }
      ];
      this.setState({
        typeDataSource: list
      });
      /*axios({
        url: url,
        timeout: 20000,
        method: 'get',
        responseType: 'json'
      }).then(
        (response) => {
          this.setState({
            typeDataSource: response.data
          });
        }
      )
        .catch(
          (error) => {
            console.log(error)
            Message.warning('请求摄像头状态数据失败');
          }
        );*/
    };
    handleSubmit = () => {
      let r=0;
      this.field.validate((errors, values) => {
        if (errors) {
          console.log('Errors in form!!!');
          return 0;
        }
        r = values
        
      });
      return r;
    };
    getFormValues=()=>{
      return this.field.getValues()
     }
  render() {
    const init = this.field.init;
    const { index, record } = this.props;
    const { statusDataSource,brandDataSource,typeDataSource } = this.state;

    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <Form size="small"  field={this.field} >
      <Row gutter='4'> 
        <Col>
          <FormItem label="IP地址：" {...formItemLayout} style={{ marginBottom: '5px' }}>
            <Input style={styles.inputbox}
              {...init('ipAddr', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </FormItem>

          <FormItem label="端口号：" {...formItemLayout}  style={{ marginBottom: '5px' }}>
            <Input style={styles.inputbox}
              {...init('port', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </FormItem>

          <FormItem label="取流地址：" {...formItemLayout} style={{ marginBottom: '5px' }}>
            <Input style={styles.inputbox}
              {...init('strAddr', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </FormItem>
          <FormItem label="经纬度：" {...formItemLayout} style={{ marginBottom: '5px' }}>
            <Input style={styles.inputbox}
              {...init('lal', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </FormItem>
        </Col>
        <Col>
          <FormItem label="所属街道：" {...formItemLayout} style={{ marginBottom: '5px' }}>
            <Select style={styles.inputbox} {...init('bStr', {
              rules: [{ required: true, message: '必填选项' }],
              initValue: ''
            })} dataSource={statusDataSource}>
            </Select>
          </FormItem>
  
          <FormItem label="所属机构：" {...formItemLayout} style={{ marginBottom: '5px' }}>
            <Select style={styles.inputbox} {...init('bOrg', {
              rules: [{ required: true, message: '必填选项' }],
              initValue: ''
            })} dataSource={brandDataSource}>
            </Select>
          </FormItem>

          <FormItem label="协议版本：" {...formItemLayout} style={{ marginBottom: '5px' }}>
            <Select style={styles.inputbox} {...init('cVer', {
              rules: [{ required: true, message: '必填选项' }],
              initValue: ''
            })} dataSource={typeDataSource}>
            </Select>
          </FormItem>
          <FormItem label="平台接入方式：" {...formItemLayout} style={{ marginBottom: '5px' }}>
            <Input placeholder="输入" style={styles.inputbox}
              {...init('inType', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </FormItem>
        </Col>
      </Row>

      <Row>
      <Col>
      <FormItem label="SIP服务器端口：" {...formItemLayout} style={{ marginBottom: '5px' }}>
            <Select style={styles.inputbox} {...init('sipSPort', {
              rules: [{ required: true, message: '必填选项' }],
              initValue: ''
            })} dataSource={typeDataSource}>
            </Select>
          </FormItem>
          <FormItem label="SIP服务器ID：" {...formItemLayout} style={{ marginBottom: '5px' }}>
            <Select style={styles.inputbox} {...init('sipSId', {
              rules: [{ required: true, message: '必填选项' }],
              initValue: ''
            })} dataSource={typeDataSource}>
            </Select>
          </FormItem>
          <FormItem label="SIP服务器地址：" {...formItemLayout} style={{ marginBottom: '5px' }}>
            <Select style={styles.inputbox} {...init('sipSaddr', {
              rules: [{ required: true, message: '必填选项' }],
              initValue: ''
            })} dataSource={typeDataSource}>
            </Select>
          </FormItem>
      </Col>
      <Col>
      <FormItem label="摄像机SIP端口：" {...formItemLayout} style={{ marginBottom: '5px' }}>
            <Select style={styles.inputbox} {...init('csipNo', {
              rules: [{ required: true, message: '必填选项' }],
              initValue: ''
            })} dataSource={typeDataSource}>
            </Select>
          </FormItem>
          <FormItem label="摄像机国际ID：" {...formItemLayout} style={{ marginBottom: '5px' }}>
            <Select style={styles.inputbox} {...init('cgId', {
              rules: [{ required: true, message: '必填选项' }],
              initValue: ''
            })} dataSource={typeDataSource}>
            </Select>
          </FormItem>
      </Col>
      </Row>
    </Form>
    );
  }
}
const styles = {
    editDialog: {
      display: 'inline-block',
      marginRight: '5px',
    },
   inputbox: {
      width:200
    }
  };