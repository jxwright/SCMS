import c from '../contants/registerPage'
export function registerReducer(state = {}, action) {
    switch (action.type) {
      case c.USER_REGISTER_REQUEST:
        return Object.assign({}, state, {
            loginInfo: action.loginInfo,
        });
      case c.USER_REGISTER_SUCCESS:
        return Object.assign({}, state, {
          loginInfo: action.loginInfo,
        });
      case c.USER_REGISTER_FAILURE:
        return Object.assign({}, state, {
            loginInfo: action.loginInfo,
        });
      default:
        return state;
    }
  }