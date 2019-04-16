/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import { connect } from 'react-redux'
import {
  userLogin,
  userLoginFailure,
  userLoginSuccess
} from '../../redux/actions/loginPage'

@withRouter
class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
        checkbox: false,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      this.props.userLogin(values);
 //     console.log(values);
  //    Message.success('登录成功');
  //    this.props.history.push('/');
    });
  };

  render() {
    return (
      <div style={styles.container}>
        <h4 style={styles.title}>登 录</h4>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formItems}>
            <div style={styles.formItem}>
              <IceIcon type="person" size="small" style={styles.inputIcon} />
              <IceFormBinder name="username" required message="必填">
                <Input
                  size="large"
                  maxLength={20}
                  placeholder="用户名"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="username" />
            </div>

            <div style={styles.formItem}>
              <IceIcon type="lock" size="small" style={styles.inputIcon} />
              <IceFormBinder name="password" required message="必填">
                <Input
                  size="large"
                  htmlType="password"
                  placeholder="密码"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="password" />
            </div>

            <div style={styles.formItem}>
              <IceFormBinder name="checkbox">
                <Checkbox style={styles.checkbox}>记住账号</Checkbox>
              </IceFormBinder>
            </div>

            <div style={styles.footer}>
              <Button
                type="primary"
                size="large"
                onClick={this.handleSubmit}
                style={styles.submitBtn}
              >
                登 录
              </Button>
              <Link to="/user/register" style={styles.tips}>
               1 立即注册{this.props.loginInfo}
              </Link>
            </div>
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '400px',
    padding: '40px',
    background: '#fff',
    borderRadius: '6px',
  },
  title: {
    margin: '0 0 40px',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: '28px',
    fontWeight: '500',
    textAlign: 'center',
  },
  formItem: {
    position: 'relative',
    marginBottom: '20px',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '12px',
    color: '#666',
  },
  inputCol: {
    width: '100%',
    paddingLeft: '20px',
  },
  submitBtn: {
    width: '100%',
  },
  tips: {
    marginTop: '20px',
    display: 'block',
    textAlign: 'center',
  },
};
let mapStateToProps2 = state => {
  return { count: state.count };
};
function mapStateToProps1(state) {
  return {
    loginInfo: state.loginInfo
  };
}
const mapStateToProps = (state) => {
  alert(state.loginInfo)
  return { loginResult: state.login,loginInfo: state.loginInfo };
};
// 在这个对象中, 属性名会成为 prop 的 names,
// 属性值应该是 action 生成器函数.
// 它们跟 `dispatch` 绑定起来.
//如果将这个放入到connect中this.props.dispatch(decrement());将会无效只能使用this.props.decrement()
const mapDispatchToProps = {
  userLogin,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLogin);
