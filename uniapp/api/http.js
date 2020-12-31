/**
 * 简易封装uni request接口请求
 * @param {String} url 请求资源  
 * @param {String} method 请求方式  
 * @param {String} data 请求参数  
 */
export const http = (url, method = "get", data = {}, header = {}) => {
	const baseURL = 'http://localhost:3000/api';
	uni.showLoading({
		title: "加载中.."
	})
	return new Promise((resolve, reject) => {
		const token = localStorage.TEPCHART_TOKEN
		header['Authorization'] = "bearer " + (token ? token : "null")
		uni.request({
			url: baseURL + url,
			method,
			data,
			header,
			success: result => {
				if (result.statusCode === 401) {
					// 登录重定向
					uni.showModal({
						content: result.data.message,
						showCancel: false,
						complete: () => {
							uni.redirectTo({
								url: result.data.redirectTo
							})
						}
					})
				}
				console.log(result)
				resolve(result)
			},
			fail: error => {
				reject(error)
			},
			complete: uni.hideLoading()
		})
	})
}

/**
 * 简易封装 上传
 */
export const upload = (tempFilePaths) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: "http://localhost:3000/api/upload",
			filePath: tempFilePaths,
			name: "file",
			header: {
				Authorization: "bearer " + localStorage.TEPCHART_TOKEN
			},
			success: (uploadFile) => {
				uploadFile.data = uploadFile.data && JSON.parse(uploadFile.data)
				resolve(uploadFile.data)
			}
		})
	})
}
