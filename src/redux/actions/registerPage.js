export const userRegister = (params) => {

    return {
      type: c.USER_REGISTER_REQUEST,
      loginInfo:params.username
    }
}