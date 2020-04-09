import React, {Component} from 'react'
import { Modal} from 'antd';

import storageUties from '../../utils/storageUties'
import memoryUtiles from '../../utils/memoryUtiles'

import './index.css'

/**
 * 左侧导航的组件
 */
export default class Header extends Component{
      // 退出登录
      logout = () =>{
        Modal.confirm({
            title: '确定退出吗？',
            onOk:() => {
              //删除保存的user数据
              //跳转到login页面
              console.log(this)
              storageUties.removeUser()
              memoryUtiles.user={}
              // this.props.history.replace('/login')
            },

          });
    }
    render(){
      
        return(
            <div className="header">
          <div className="header-top">
          <span>欢迎,admin</span>
           <a href="javascrip:" onClick={this.logout}>退出</a>
          </div>
            </div>
        )
    }
}