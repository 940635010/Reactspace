import store from 'store'
const  USER_KEY='user_key'

//进行local数据存储管理
export default{
//保存user
saveUser(user){
    // localStorage.setItem(USER_KEY,JSON.stringify(user))
    store.set(USER_KEY,user)
},
//读取user
getUser(){
    return store.get(USER_KEY) || {}
    // return JSON.parse(localStorage.getItem(USER_KEY)|| '{}')
},
removeUser(){
    store.remove(USER_KEY)
    // localStorage.removeItem(USER_KEY)
}
//删除user
}