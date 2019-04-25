import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Step, Icon } from '@alifd/next';

import BasicForm from './BasicForm';
import SetForm from './SetForm';

const { Row, Col } = Grid;

export default class StepForm extends Component {
  static displayName = 'StepForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
  }
  componentDidMount() {
    this.props.onGetStepForm(this)
  }

  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };
  
  prevStep = () => {
    this.setState({ step: this.state.step - 1 });
  };


  renderStep = (step) => {
    if (step === 0) {
      
      return <BasicForm formValue={this.props.formValue} onGetShowForm={this.props.onGetShowForm} />;
    }

    if (step === 1) {
      return <SetForm  formValue={this.props.formValue} onGetShowForm={this.props.onGetShowForm} />;
    }

    if (step === 2) {
      return (
        <div style={styles.content}>
          <h2>
            <Icon type="success" style={styles.icon} size="xl" />
            完成发布
          </h2>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="step-form">
        <IceContainer style={{padding:0,margin:0}}>
          <Row wrap>
            <Col xxs="24" s="3" l="3" style={styles.formLabel}>
              <Step
                current={this.state.step}
                direction="ver"
                shape="dot"
                animation={false}
                style={styles.step}
              >
                <Step.Item title="步骤1" content="录入基本信息" />
                <Step.Item title="步骤2" content="录入设置信息" />
                <Step.Item title="步骤3" content="完成" />
              </Step>
            </Col>
            <Col xxs="24" s="18" l="18">
              {this.renderStep(this.state.step)}
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  step: {
    marginBottom: '0',
  },
  content: {
    height: '200px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  icon: {
    color: '#1DC11D',
    marginRight: '10px',
  },
};