import c from './constants'
import fetch from 'cross-fetch'

export function userLoginSuccess(subreddit) {
    return {
      type: c.SELECT_SUBREDDIT,
      subreddit
    }
  }
  
  export function userLoginFailure(subreddit) {
    return {
      type: c.INVALIDATE_SUBREDDIT,
      subreddit
    }
  }
  
  function requestPosts(subreddit) {
    return {
      type: c.REQUEST_POSTS,
      subreddit
    }
  }
  
  function receivePosts(subreddit, json) {
    return {
      type: c.RECEIVE_POSTS,
      subreddit,
      posts: json.data.children.map(child => child.data),
      receivedAt: Date.now()
    }
  }
  
  function fetchPosts(subreddit) {
    return dispatch => {
      dispatch(requestPosts(subreddit))
      return fetch(`https://www.reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(subreddit, json)))
    }
  }
  
  function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit]
    if (!posts) {
      return true
    } else if (posts.isFetching) {
      return false
    } else {
      return posts.didInvalidate
    }
  }
  
  export function userLoginRequest(subreddit) {
    return (dispatch, getState) => {
      if (shouldFetchPosts(getState(), subreddit)) {
        return dispatch(fetchPosts(subreddit))
      }
    }
  };
  export const userLogin = (params) => {

    return {
      type: c.USER_LOGIN_REQUEST,
      loginInfo:params.username
    }
    /*
    return async (dispatch) => {
      dispatch(userLoginRequest());
      try {
       const response = await login(params);
      // alert(params.username);
      // const response = await axios.post('/loginRest', params)
        dispatch(userLoginSuccess(response.data));
  
        if (response.data.status === 200) {
          Message.success('登录成功');
          setAuthority(response.data.currentAuthority);
          reloadAuthorized();
          dispatch(push('/'));
        } else {
          Message.error('账号或者密码错误');
        }
  
        return response.data;
      } catch (error) {
        dispatch(userLoginFailure(error));
      }
    };*/
  };