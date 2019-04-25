import React, { Component } from 'react';
import { Dialog, Button, } from '@alifd/next';
import StepForm from './StepForm';

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      step: 0,
      dataIndex: null,
    };
  }
  onGetShowForm = (ref) => {
    this.ShowForm = ref
  }
  onGetStepForm = (ref) => {
    this.StepForm = ref
  }

  setCurrentStep = (step) => {
    this.setState({
      step: step,
    });
  }
  onSaveAndNext = () => {
    try {
      console.log("nextstep", this.ShowForm.handleSubmit());
      if (this.ShowForm.handleSubmit()) {
        this.formValue = Object.assign({}, this.formValue, this.ShowForm.handleSubmit());
        console.log("formValue", this.ShowForm.handleSubmit());
        /*  axios({
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
          ).catch(
            (error) => {
              console.log(error)
              this.setState({
                isLoaded:false
              })
              Message.warning('请求数据失败');
            }           
           ); 
  */
        this.StepForm.nextStep();
        this.setState({
          step: this.state.step + 1,
        });
      }
    }
    catch (error) {
      console.log("onSaveAndNext", error)
    }
  };

  onNextStep = () => {
    try {
      console.log("nextstep", this.ShowForm.handleSubmit());
      if (this.ShowForm.handleSubmit()) {
        this.formValue = Object.assign({}, this.formValue, this.ShowForm.getFormValues());
        this.StepForm.nextStep();
        this.setState({
          step: this.state.step + 1,
        });
      }
    }
    catch (error) {
      console.log("onNextStep", error)
    }

  }
  onPrevStep = () => {
    this.formValue = Object.assign({}, this.formValue, this.ShowForm.getFormValues());
    this.StepForm.prevStep();
    this.setState({
      step: this.state.step - 1,
    });
  }

  onOpen = (index, record) => {
    console.log("record",record);
    this.setState({
      visible: true,
      dataIndex: index,
      step: 0,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { index, record } = this.props;
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
        <Button size="small" type="primary" onClick={() => this.onOpen(index, record)}>
         编辑
        </Button>
        <Dialog
          style={{ width: 780 }}
          visible={this.state.visible}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="编辑摄像头"
          footer={
            this.state.step == 0
              ? <div><Button style={{ marginLeft: '10px' }} type="primary" onClick={this.onNextStep}>下一步</Button>
                <Button style={{ marginLeft: '10px' }} onClick={this.onClose}>取消</Button> </div>
              : this.state.step == 1
                ? <div><Button type="primary" onClick={this.onPrevStep}>上一步</Button>
                   <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.onSaveAndNext}>保存</Button> 
                  <Button style={{ marginLeft: '10px' }} onClick={this.onClose}>取消</Button> </div>
                : this.state.step == 2 ? <div><Button style={{ marginLeft: '10px' }} onClick={this.onClose}>关闭</Button></div> : ''
          }
        >
           <StepForm formValue={record} onGetShowForm={this.onGetShowForm} onGetStepForm={this.onGetStepForm} setCurrentStep={this.setCurrentStep} />
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
