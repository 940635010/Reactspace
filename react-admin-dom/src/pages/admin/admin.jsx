import React, {Component} from 'react'
import  {Redirect,Route,Switch} from 'react-router-dom'
import memoryUtiles from '../../utils/memoryUtiles'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'


const {  Footer, Sider, Content } = Layout;

/*

后台管理的路由组件
*/
export default class Admin extends Component {
  render() {
    const user=memoryUtiles.user
    if(!user || !user._id){
      //自动跳转到登录（在render()中)
      return <Redirect to='/login'/>
    }
    return (
      <Layout style={{height:'100%'}}>
      <Sider>
        <LeftNav/>
      </Sider>
      <Layout>
        <Header>
         DD
          </Header>
        <Content style={{margin:20,backgroundColor:'#fff'}}>
          <Switch>
            <Route path='/home' component={Home}/>
            <Route path='/category' component={Category}/>
            <Route path='/product' component={Product}/>
            <Route path='/role' component={Role}/>
            <Route path='/user' component={User}/>
            <Redirect to='./home'/>
          </Switch>
        </Content>
        <Footer  style={{textAlign:'center',color:'#333'}}>Created By Fiora At 2019.07 </Footer>
      </Layout>
    </Layout>
    )
  }
}
