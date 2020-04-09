import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button,message} from 'antd';
import './login.css'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api'
import memoryUtiles from '../../utils/memoryUtiles'
import storageUties from '../../utils/storageUties'
/*

登录的路由组件
*/
class Login extends Component {
  handleSubmit=(event)=>{
    //阻止事件的默认行为
    event.preventDefault()
    //对所有的表单字段进行检验
    this.props.form.validateFields(async (err, values) => {
      //检验成功
      if (!err) {
        const {username,password}=values
        const result=await reqLogin(username,password)
        // console.log('请求成功',response.data)
        // const result=response.data
        if(result.status===0){
          message.success('登录成功')
          const user=result.data
          //保存在内存中
          memoryUtiles.user=user
          //保存在local中
          storageUties.saveUser(user)
          //push 可跳转回来，replace调转到管理界面(不需要再回退到登录)
          this.props.history.replace('/')

        }else{
          //提示错误信息
          message.error('失败'+result.msg)
        }
       
      }else{
        console.log('提交失败')
      }
    });
    //得到form对象
    const form=this.props.form
    //获取表单项的输入数据
    const  values=form.getFieldsValue()
    console.log(values)

  }
  render() {
    //如果用户已经登录，自动跳转到管理界面
    const user=memoryUtiles.user
    if(user && user._id){
      return <Redirect to='/'/>
    }
    //得到强大功能的form对象
    const form=this.props.form
    const {getFieldDecorator}=form;
    return (
    <div className='login'>
   <header className='login-header'>
   <img src={logo} alt="logo"/>
   </header>
   <section className='login-content'>
   <h1>用户登录</h1>
   <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {
            getFieldDecorator('username',{//配置对象：属性名是特定的一些名称
              //声明式验证
                rules: [
                  { required: true, message: '必须输入用户名！！！' },
                  {min:4,message:'用户名至少4位'},
                  {max:12,message:'用户名最高12位'},
                  {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文，数字或下划线组成。'}
                ],
            })(
              <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
            )}
           

        </Form.Item>
        <Form.Item>
        {
            getFieldDecorator('password',{//配置对象：属性名是特定的一些名称
              //声明式验证
                rules: [
                  { required: true, message: '必须输入用户名！！！' },
                  {min:4,message:'用户名至少4位'},
                  {max:12,message:'用户名最高12位'},
                  {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文，数字或下划线组成。'}
                ],
            })(
              <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
            )
          }
        </Form.Item>
        <Form.Item>
   
          <Button type="primary" htmlType="submit" className="login-form-button">
            提交
          </Button>
        </Form.Item>
      </Form>
   
   </section>
    </div>
  )
  }
}
/*  高阶函数   高阶组件 */
/*包装 Form组件生成一个新的组件：Form(Login)  
   新组件会向Form组件传递一个强大的对象属性:form
*/

const WrapLogin=Form.create()(Login)
export default WrapLogin
/*
前台表单验证
收集表单输入框
*/