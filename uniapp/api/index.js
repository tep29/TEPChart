import {
	http,
	upload
} from './http.js'


// 注册
export const register = (data) => {
	return http('/signup', "post", data)
}
// 登录
export const login = (data) => {
	return http('/login', "post", data)
}

// 搜索
export const search = (data) => {
	return http('/search', "post", data)
}

// 个人信息
export const userinfo = () => {
	return http('/userInfo', "get")
}

// 修改个人信息
export const infoUpdate = (data) => {
	return http('/userInfo/update', "post", data)
}

// 上传头像
export const uploadImage = upload

// 判断是否为好友
export const isFriend = (data) => {
	return http("/verifi/friend", "post", data)
}

// 添加好友
export const addFriend = (data) => {
	return http('/friend/add', "post", data)
}
