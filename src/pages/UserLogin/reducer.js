import c from './constants'

export function selectedSubreddit(state = 'reactjs', action) {
    switch (action.type) {
      case c.SELECT_SUBREDDIT:
        return action.subreddit
      default:
        return state
    }
  }
  
  function posts(
    state = {
      isFetching: false,
      didInvalidate: false,
      items: []
    },
    action
  ) {
    switch (action.type) {
      case c.INVALIDATE_SUBREDDIT:
        return Object.assign({}, state, {
          didInvalidate: true
        })
      case c.REQUEST_POSTS:
        return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false
        })
      case RECEIVE_POSTS:
        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          items: action.posts,
          lastUpdated: action.receivedAt
        })
      default:
        return state
    }
  }
  
  export function postsBySubreddit(state = {}, action) {
    switch (action.type) {
      case c.INVALIDATE_SUBREDDIT:
      case c.RECEIVE_POSTS:
      case c.REQUEST_POSTS:
        return Object.assign({}, state, {
          [action.subreddit]: posts(state[action.subreddit], action)
        })
      default:
        return state
    }
  }

  export function loginReducer(state = {}, action) {
    switch (action.type) {
      case c.USER_LOGIN_REQUEST:
        return Object.assign({}, state, {
          loginInfo: action.loginInfo,
        });
      case c.USER_LOGIN_SUCCESS:
        return Object.assign({}, state, {
          loginInfo: action.loginInfo,
        });
      case c.USER_LOGIN_FAILURE:
        return Object.assign({}, state, {
          loginInfo: action.loginInfo,
        });
      default:
        return state;
    }
  }