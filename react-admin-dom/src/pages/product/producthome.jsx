import React, { Component } from 'react'
import { Card, Select, Input, Button, Icon, Table,message } from 'antd'
import LinkButton from '../../components/link-button'
import { reqProduct, reqSelectProducts,reqUpdateStatus } from '../../api'
const Option = Select.Option
/**
 * product的默认子路由组件
 */
export default class ProductHome extends Component {
    state = {
        total: 0,//商品的总数量
        products: [],//商品的数组
        loading: false, //转圈是否正在加载
        searchName: '',//搜索的关键字
        searchType: 'productName',//根据那个字段搜索

    }
    //初始化table列的数组
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price //当前字段指定了对应的属性，传入的是对应的属性值
            },
            {
                width: 200,
                title: '状态',
                // dataIndex: 'status',
                render: (product) => {
                    const {status,_id}=product
                    return (
                        <span>
                            <Button 
                            type='primary'
                            onClick={()=>this.updateStatus(_id,status===1?2:1)}> 
                            {status===1?'下架':'上架'}</Button>
                            <span style={{ margin: '0 15px' }}>{status===1?'销售中':'已下架'}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作选项',
                render: (product) => {
                    return (
                        <span>
                            <LinkButton onClick={()=>this.props.history.push('/product/detail',{product})}>详情</LinkButton>
                            <LinkButton onClick={()=> this.props.history.push('product/addupdate',product)}>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }
    //获取指定页码的列表数据显示
    getProducts = async (pageNum) => {
        this.pageNum=pageNum //保存pageNum ，让其他方法可以看到
        this.setState({ loading: true })//显示loading
        const {searchName,searchType}=this.state
        let result
        //如果搜索关键字  有值  ，说明我们要做搜索分页
        if(searchName){
          result=await reqSelectProducts({pageNum,pageSize:3,searchName,searchType})
        }else{
            //一般分页请求
           result = await reqProduct(pageNum, 3)
        }
      
        this.setState({ loading: false })//隐藏loading
        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({
                total,
                products: list
            })
        }
    }
    //更新指定商品的状态
    updateStatus=async (productId,status)=>{
        const result = await reqUpdateStatus(productId,status)
        if(result.status===0){
            message.success('更新商品成功')
            this.getProducts(this.pageNum)
        }else{
            console.log('错误')
        }
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getProducts(1)
    }

    render() {
        //取出状态数据
        const { products, total, loading, searchType, searchName } = this.state

        const title = (
            <span>
                <Select value={searchType} style={{ width: 150 }}
                 onChange={value => this.setState({ searchType: value })}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })} />
                <Button type='primary' onClick={()=>this.getProducts(this.pageNum)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary'
            onClick={()=>this.props.history.push('/product/addupdate')}
            >
                <Icon type='plus' />
                添加商品

            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    rowKey='_id'
                    loading={loading}
                    bordered
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        total,
                        defaultPageSize: 3,
                        showQuickJumper: true,
                        onChange: (pageNum) => { this.getProducts(pageNum) }
                    }}
                />
            </Card>
        )
    }
}