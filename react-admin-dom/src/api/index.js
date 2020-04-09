//登录
import ajax from './ajax'
// export function reqLogin(u=>ajax('/login',{username,password},'POST')sername,password){

// }
//登录
export const reqLogin = (username,password)=>ajax('/login',{username,password},'POST')
//获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax('/manage/category/list',{parentId})
//添加分类
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add',{categoryName, parentId},'POST')
//更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update',{categoryId, categoryName},'POST')
//根据分类ID获取分类
export const reqCategory=(categoryId)=>ajax('/manage/category/info',{categoryId})
//对商品进行上架/下架处理 
export const reqUpdateStatus=(productId,status)=>ajax('/manage/product/updateStatus',{productId,status},'POST')
//获取商品分页列表
export const reqProduct=(pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize})
//搜索商品分页列表(根据商品名称/商品描述)
export const reqSelectProducts=({pageNum,pageSize,searchName,searchType})=>ajax('/manage/product/search',
{pageNum,pageSize,[searchType]:searchName})



