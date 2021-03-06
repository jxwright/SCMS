import React from 'react';
import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@alifd/next/reset.scss';
import router from './router';
import { Provider } from 'react-redux';
import configureStore from './configureStore'

const ICE_CONTAINER = document.getElementById('ice-container');
const initialState = {
  login:{
    loginInfo: '智慧城管p'
  }
};

const loadState = () => {
  try { // 也可以容错一下不支持localStorage的情况下，用其他本地存储
    const serializedState = localStorage.getItem('login');
    if (serializedState === null) {
      return undefined;
    } else {
      console.log("loadState",JSON.parse(serializedState));
      return {
        login:JSON.parse(serializedState)
      }
    }
  } catch (err) {
    // ... 错误处理
    return undefined;
  }
}

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('login', serializedState);
  } catch (err) {
    // ...错误处理
  }
};
const store = configureStore(loadState());
store.subscribe(function () {
  console.log("subscribe",store.getState());
  const state = store.getState();

  saveState(state.login);
});
if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(
<Provider store={store}> 
{router}
</Provider>, ICE_CONTAINER);
