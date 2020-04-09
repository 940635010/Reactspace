import React, { Component } from 'react'
import { Card, Icon, Form, Input, Cascader, Upload, Button } from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api'
import PicturesWall from './pictureswall'
const { Item } = Form
const { TextArea } = Input

/**
 * product的添加和更新的子路由组件
 */
class ProductAddUpdate extends Component {
    //级联状态初始值
    state = {
        options: []
    }
    initOption = async (categorys) => {
        //根据categorys生成options数组
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false,
        }))
        //如果是一个二级分类商品的更新
        const { isUpdate, product } = this
        const { pCategoryId, categoryId } = product
        if (isUpdate && pCategoryId !== '0') {
            //获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId)
            //生成二级下拉列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            //找到当前商品对应的一级option对象
            const targetOption =options.find(option=>option.value===pCategoryId)
                //关联对应的一级option上
                targetOption.children = childOptions
        }
        //更新optios状态
        this.setState({
            options
        })
    }
    //异步获取一级/或者二级分类列表，并显示
    //async  函数的返回值是一个新的promise对象，promise的结果和值由async的结果来决定
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId)
        if (result.status === 0) {
            // console.log('1111' ,result.data.list)
            const categorys = result.data.list
            if (parentId === '0') {
                this.initOption(categorys)

            } else {
                return categorys  //返回二级列表  当前async函数返回的promise就会成功且value为categorys
            }

        }

    }

    //验证价格的自定义验证函数
    validatePrice = (rule, value, callback) => {
        if (value * 1 > 0) {
            callback()//验证通过
        } else {
            callback('价格必须大于0')  //验证没通过
        }
    }
    //级联选择器   加载数据  用于加载下一级列表的回调函数
    loadData = async selectedOptions => {
        //得到选择的option对象
        const targetOption = selectedOptions[0];
        // 显示loading
        targetOption.loading = true;
        //根据选中的分类，请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)
        // 隐藏  loading
        targetOption.loading = false;
        if (subCategorys && subCategorys.length > 0) {
            //生成一个二级列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            //关联到当前option上
            targetOption.children = childOptions
        } else {
            targetOption.isLeaf = true
        }

        //更新options状态
        this.setState({
            options: [...this.state.options],
        })
    }

    submit = () => {
        //进行表单验证 ，如果通过了，才发送请求
        this.props.form.validateFields((error, value) => {
            if (!error) {
                alert('发送ajax请求')
            }
        })
    }

    componentDidMount() {
        this.getCategorys('0')
    }
    componentWillMount() {
        //取出携带的state
        const product = this.props.location.state  //如果是添加没有值，否则有值
        //保存是否是更新的标识
        this.isUpdate = !!product
        //保存商品  如果没有，保存{}对象  放置报错
        this.product = product || {}
    }
    render() {
        const { isUpdate, product } = this
        const { pCategoryId, categoryId } = product
        //用来接收级联分类ID的数组
        const categoryIds = []
        if (isUpdate) {
            //商品是一个一级分类的商品
            if (pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }

        }
        const formItemLayout = {
            labelCol: { span: 2 },//左侧label的宽度
            wrapperCol: { span: 22 },//右侧label的宽度
        };
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{ fontSize: 20 }} />
                </LinkButton>
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )
        const { getFieldDecorator } = this.props.form
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="商品名称">
                        {
                            getFieldDecorator('name', {
                                initialValue: product.name,
                                rules: [
                                    { required: true, message: '必须输入商品名称' }
                                ]
                            })(<Input placeholder='请输入商品名称' />)
                        }
                    </Item>
                  
                    <Item label="商品描述">
                        {
                            getFieldDecorator('desc', {
                                initialValue: product.desc,
                                rules: [
                                    { required: true, message: '必须输入商品描述' }
                                ]
                            })(<TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }} />)
                        }

                    </Item>
                    <Item label="商品价格">
                        {
                            getFieldDecorator('price', {
                                initialValue: product.price,
                                rules: [
                                    { required: true, message: '必须输入商品价格' },
                                    { validator: this.validatePrice }
                                ]
                            })(<Input type='number' placeholder='请输入商品价格' addonAfter='元' />)
                        }

                    </Item>
                    <Item label="商品分类">

                        {
                            getFieldDecorator('categoryIds', {
                                initialValue: categoryIds,
                                rules: [
                                    { required: true, message: '必须输入商品分类' },
                                ]
                            })(
                                <Cascader
                                placeholder="请指定商品分类"
                                    // 需要显示的列表数据
                                    options={this.state.options}
                                    //
                                    loadData={this.loadData}

                                />
                                )
                        }

                    </Item>
                    <Item label="商品图片">
                       <PicturesWall/>
                    </Item>
                    
                    <Item label="商品分类">
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                    

                </Form>
            </Card>
        )
    }
}
export default Form.create()(ProductAddUpdate)