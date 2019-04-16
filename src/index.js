import React from 'react';
import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@alifd/next/reset.scss';
import router from './router';
import { Provider } from 'react-redux';
import configureStore from './redux'

const ICE_CONTAINER = document.getElementById('ice-container');
const initialState = {
  loginInfo: '智慧城管'
};
const store = configureStore(initialState);
store.subscribe(function () {
  console.log(store.getState());
});
if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(
<Provider store={store}> 
{router}
</Provider>, ICE_CONTAINER);
