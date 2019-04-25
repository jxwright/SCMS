import React, { Component } from 'react';
import { Icon, Grid, Form, Input, Field, Select } from '@alifd/next';

const FormItem = Form.Item;
const { Row, Col } = Grid;
export default class BasicForm extends Component {
  static displayName = 'BasicForm';

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
    let r = 0;
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return r;
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
    const { statusDataSource, brandDataSource, typeDataSource } = this.state;

    const formItemLayout = {
      labelCol: {
        fixedSpan: 5,
      }
    };
    return (
      <Form size="small"  field={this.field} >
        <Row gutter='4'> 
          <Col>
            <FormItem label="编号：" {...formItemLayout} style={{ marginBottom: '5px' }}>
              <Input style={styles.inputbox}
                {...init('title', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="名称：" {...formItemLayout}  style={{ marginBottom: '5px' }}>
              <Input style={styles.inputbox}
                {...init('name', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="登录账户：" {...formItemLayout} style={{ marginBottom: '5px' }}>
              <Input style={styles.inputbox}
                {...init('laccount', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
            <FormItem label="登录密码：" {...formItemLayout} style={{ marginBottom: '5px' }}>
              <Input style={styles.inputbox}
                {...init('lpassword', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
          </Col>
          <Col>
            <FormItem label="摄像头状态：" {...formItemLayout} style={{ marginBottom: '5px' }}>
              <Select style={styles.inputbox} {...init('cstatus', {
                rules: [{ required: true, message: '必填选项' }],
                initValue: ''
              })} dataSource={statusDataSource}>
              </Select>
            </FormItem>
    
            <FormItem label="摄像头品牌：" {...formItemLayout} style={{ marginBottom: '5px' }}>
              <Select style={styles.inputbox} {...init('cbrand', {
                rules: [{ required: true, message: '必填选项' }],
                initValue: ''
              })} dataSource={brandDataSource}>
              </Select>
            </FormItem>

            <FormItem label="摄像头类型：" {...formItemLayout} style={{ marginBottom: '5px' }}>
              <Select style={styles.inputbox} {...init('ctype', {
                rules: [{ required: true, message: '必填选项' }],
                initValue: ''
              })} dataSource={typeDataSource}>
              </Select>
            </FormItem>
            <FormItem label="备注：" {...formItemLayout} style={{ marginBottom: '5px' }}>
              <Input.TextArea rows={2} placeholder="输入备注" style={styles.inputbox}
                {...init('remark', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
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
    width: 200
  }
};