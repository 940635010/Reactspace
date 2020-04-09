import React, { Component } from 'react'
import { Link ,withRouter} from 'react-router-dom'
import { Menu, Icon} from 'antd';
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.css'


const { SubMenu } = Menu;
/**
 * 左侧导航的组件
 */
 class leftNav extends Component {
    // 根据menu的数据组生成对应的标签数组
    // 使用map()+递归调用
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            // <Menu.Item key="home">
            // <Link to='/home'>
            // <Icon type="pie-chart" />
            // <span>首页</span>
            // </Link>
            // </Menu.Item> 

            //     <SubMenu
            //     key="sub1"
            //     title={
            //         <span>
            //             <Icon type="mail" />
            //             <span>商品</span>
            //         </span>
            //     }
            // >
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
               return(
                <SubMenu
                key={item.key}
                title={
                    <span>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                    </span>
                }
            >
            {this.getMenuNodes(item.children)}
             </SubMenu>
               )
                    }
        })

    }
    render() {
        //得到点前请求的路由路径
        let path=this.props.location.pathname
        if(path.indexOf('/product')===0){//当前请求的是商品或其子路由界面
            path='/product'
        }
        return (

            <div className="left-nav">
                        <div className="left-nav-header">
                            {/* <Link to='/' > */}
                                <img src={logo} />
                            {/* </Link> */}
                        </div>
                        <Menu
                            // defaultSelectedKeys={['1']}
                            // defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            selectedKeys={[path]}
                            // defaultOpenKeys={[openKey]}

                        >
                            {/* <Menu.Item key="home">
                        <Link to='/home'>
                        <Icon type="pie-chart" />
                        <span>首页</span>
                        </Link>
                    </Menu.Item>
                    
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="category">
                        <Link to='/category'>
                        <Icon type="mail" />
                        <span>品类管理</span>
                        </Link>
                       
                        </Menu.Item>
                      
                        <Menu.Item key="product">
                        <Link to='/product'>
                        <Icon type="mail" />
                        <span>商品管理</span>
                        </Link>
                        </Menu.Item>
                        
                    </SubMenu> */}
                            {/* 动态生成菜单列表 */}

                            {
                                this.getMenuNodes(menuList)
                            }

                        </Menu>
                    </div>

                    )
    }
}
/**
 * withRouter 高阶组件：
 * 包装非路由组件，返回一个新的组件
 * 新的组件向非路由组件传递3个属性：history/location/match
 */
export default withRouter(leftNav)