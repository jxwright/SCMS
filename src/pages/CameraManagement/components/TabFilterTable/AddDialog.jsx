import React, { Component } from 'react';
import { Dialog, Icon, Button } from '@alifd/next';
import StepForm from './StepForm';


export default class AddDialog extends Component {
  static displayName = 'AddDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      step: 0,
    };

  }
  onGetShowForm = (ref) => {
    this.ShowForm = ref
  }
  onGetStepForm = (ref) => {
    this.StepForm = ref
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
    //  this.field.setValues({ ...record });
    this.setState({
      visible: true,
      step: 0,
    });
    this.formValue={};
  };
  setCurrentStep = (step) => {
    this.setState({
      step: step,
    });
  }
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div style={styles.editDialog}>
        <Button size="small" type="primary" onClick={() => this.onOpen()}>
          <Icon type="add" />添加
        </Button>
        <Dialog
          style={{ width: 780 }}
          isFullScreen={false}
          visible={this.state.visible}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          minMargin={10}
          align='cc cc'
          shouldUpdatePosition={false}
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
          title="添加摄像头"
        >
          <StepForm formValue={this.formValue} onGetShowForm={this.onGetShowForm} onGetStepForm={this.onGetStepForm} setCurrentStep={this.setCurrentStep} />
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  }
};