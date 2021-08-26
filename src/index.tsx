import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';
import './assets/style/common.less';
import './index.css';
import { RouterMap } from './router/index';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from './context/index';
window.addEventListener('message', function (e) {
  console.log(e);
});
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <ThemeProvider>
      <RouterMap />
    </ThemeProvider>
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
