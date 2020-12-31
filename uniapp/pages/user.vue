<template>
	<div class="userInfo">
		<div class="userinfo-item">
			<div class="l">头像</div>
			<div class="avatar" @click="uploadFile">
				<image v-if="model.avatar" :src="model.avatar"></image>
				<image v-else></image>
			</div>
			<image src="../static/images/signIn/back.png"></image>
		</div>
		<div class="userinfo-item">
			<div class="l">注册</div>
			<input type="text" v-model="model.createTime" disabled>
		</div>
		<div class="userinfo-item">
			<div class="l">昵称</div>
			<input type="text" v-model="model.username">
			<image src="../static/images/signIn/back.png"></image>
		</div>
		<div class="userinfo-item flexStart">
			<div class="l">签名</div>
			<textarea placeholder="" v-model="model.explain" />
			</div>
		<div class="userinfo-item">
				<div class="l">性别</div>
			<picker @change="bindPickerChange" :value="model.sex" :range="sexArray">
				<input type="text" v-model="sexArray[model.sex]" disabled>
			</picker>
			<image src="../static/images/signIn/back.png"></image>
		</div>
		<div class="userinfo-item" @click="showBirth = true">
			<div class="l">生日</div>
			<input type="text" v-model="model.birth" disabled>
			<image src="../static/images/signIn/back.png"></image>
		</div>
		<div class="userinfo-item">
			<div class="l">电话</div>
			<input type="number" v-model="model.phone">
			<image src="../static/images/signIn/back.png"></image>
		</div>
		<div class="userinfo-item">
			<div class="l">邮箱</div>
			<input type="email" v-model="model.email">
			<image src="../static/images/signIn/back.png"></image>
		</div>
		<div class="userinfo-item">
			<div class="l">密码</div>
			<input type="password" v-model="model.password">
			<image src="../static/images/signIn/back.png"></image>
		</div>
		<div class="userinfo-item">
			<button class="btn color" @click="logout">退出登录</button>
			<button class="btn" @click="submit">保存资料</button>
		</div>
		
		
		<SDatePicker @date-select="selectDate" v-if="showBirth" @cancel="selectDate" />
	</div>
	
</template>

<script>
	import { userinfo as userinfoApi, infoUpdate, uploadImage } from '../api/index.js'
	import { SDatePicker } from '../components/index.js'
	import { format } from 'silly-datetime'
	export default {
		components:{SDatePicker},
		data() {
			return {
				model: { password: ''},
				sexArray: ['女生','男生','中性'],
				showBirth: false
			}
		},
		filters: {
			usePassword(val) {
	
				return val && val.slice(0,14)
			}
		},
		created() {
			this.userInfoFetch()
		},
		methods: {
			bindPickerChange(e) {
				const sex = e.detail.value
				this.model.sex = sex
			},
			selectDate(birth) {
				this.showBirth = !this.showBirth
				if(!birth) {
					return false
				}
				this.model.birth = birth
			},
			uploadFile() {

				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: async (res) => {
						 const tempFilePaths = res.tempFilePaths[0];
						const { message, code , file } = await uploadImage(tempFilePaths)
						if(code === 0) {
							this.model.avatar = file.url
						}
					}
				})
			
			},
			logout() {
				localStorage.clear()
				uni.redirectTo({
					url: "/pages/signin"
				})
			},
			async userInfoFetch() {
				const { data: { userinfo } } = await userinfoApi()
				userinfo.createTime = format(userinfo.createTime, 'YYYY-MM-DD HH:mm')
				this.model = userinfo
			},
			async submit() {
				if(this.model.password == '' || String(this.model.password).trim().length <= 0) {
					delete this.model.password
				}
				console.log(this.model)
				const { data : {code , message }} = await infoUpdate(this.model)
				if(code === 0) {
					uni.showModal({
						showCancel:false,
						content: message,
						complete: () => {
							this.userInfoFetch()
						}
					})
				}
			}

		}
	}
</script>

<style lang="scss">
	.userInfo {
		padding: 0 32rpx;

		.userinfo-item {
			display: flex;
			align-items: center;
			padding: 35rpx 0;
			border-bottom: 1px solid #eee;

			&:last-of-type {
				border-bottom: unset;
			}
			.color {
				color: #dec100 !important;
			}
			.btn {
				width: 100%;
				background: unset;
				border: unset;
				font-family: PingFangSC-Regular;
				font-size: 34rpx;
				color: #FF5D5B;
				letter-spacing: -0.55px;

				&::after {
					border: unset;
				}
			}
			&:first-of-type {
				padding: 20rpx 0;
			}
			.avatar {
				flex: 1;
				text-align: right;
				image {
					width:100rpx;
					height: 100rpx;
					margin-right: 30rpx;
					border-radius: 20rpx;
					background-color: $uni-color-primary;
				    transform: initial;
				}
			}
			&.flexStart {
						align-items: flex-start;
			}
			textarea {
					max-height: 270rpx;
			}
			.l {
				font-family: PingFangSC-Regular;
				font-size: 38rpx;
				color: #272832;
				letter-spacing: -0.55px;
				margin-right: 20rpx;
			}
			picker {
				flex: 1;
			}
			input,
			textarea{
				font-family: PingFangSC-Regular;
				font-size: 30rpx;
				color: rgba(39, 40, 50, 0.60);
				letter-spacing: -0.55px;
				flex: 1;
				text-align: right;
				padding-right: 30rpx;
			}

			image {
				width: 28rpx;
				height: 28rpx;
				transform: rotate(180deg);
			}
		}
	}
</style>
