/*
入口js
*/
import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'

//自定义模块加点
import App from './App'
import storageUties from './utils/storageUties'
import memoryUtiles from './utils/memoryUtiles'


//读取local中保存在user，保存到内存中
const user=storageUties.getUser()
memoryUtiles.user=user

// 将App组件标签渲染到index页面的div上
ReactDOM.render(<App/>,document.getElementById('root'))








// 原有
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
