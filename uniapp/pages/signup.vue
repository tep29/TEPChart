<template>
	<view>
		<SHeader></SHeader>
		<div class="main">
			<div class="logo">
				<image src="../static/images/signIn/logo.png"></image>

			</div>
			<h3>注册</h3>

			<div class="sign-form">
				<form @submit="registerFetch">
					<div class="input-item">
						<input type="text" placeholder-style="color: #999;font-weight:400;" name="username" v-model="model.username"
						 placeholder="请取个名字">
						<div class="text-err" v-if="isUsername">请填写用户名</div>
					</div>
					<div class="input-item">
						<input type="text" @input="verifEmail" placeholder-style="color: #999;font-weight:400;" name="email" v-model="model.email"
						 placeholder="邮箱">
						<image v-if="isEmail" src="../static/images/signIn/Group.png"></image>
					</div>
					<div class="employ" v-if="!isEmail && isEmail != null">邮箱错误</div>
					<div class="input-item">
						<input v-if="!isPwd" placeholder-style="color: #999;font-weight:400;" type="password" name="password" v-model="model.password"
						 placeholder="密码">
						<input v-else type="text" name="password" v-model="model.password" placeholder="密码">
						<image @touchstart.prevent="isPwd = !isPwd" @touchend="isPwd = !isPwd" class="lookpwd" src="../static/images/signIn/lookpwd.png"></image>
					</div>
					<div class="employ" v-if="isPwd">请填写正确大于6位密码</div>
					<button form-type="submit">注册</button>
				</form>
			</div>
		</div>
	</view>
</template>

<script>
	import {
		register
	} from '../api/index.js'
	export default {
		data() {
			return {
				model: {
					username: '',
					email: '',
					password: ''
				},
				isUsername: null,
				isEmail: null,
				isPwd: null,
			}
		},
		methods: {
			register(e) {
				const formData = e.detail.value
				console.log(formData)
			},
			// 判断邮箱格式
			verifEmail(e) {
				const reg = /^([azA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
				const value = e.detail.value
				this.isEmail = reg.test(value)
			},
			async registerFetch(e) {
				const data = e.detail.value

				// 随便校验一下
				if (String(this.model.username).trim().length === 0) {
					return this.isUsername = true
				} else {
					this.isUsername = false
				}

				if (String(this.model.email).trim().length === 0) {
					return this.isEmail = false
				} else {
					this.isEmail = true
				}

				if (String(this.model.password).trim().length < 6) {
					return this.isPwd = true
				} else {
					this.isPwd = false
				}
				
				const {
					data: {
						message
					},
					statusCode
				} = await register(data)
				uni.showModal({
					showCancel: false,
					content: message,
					success: () => {
						if (statusCode === 200) {
							this.model = {}
							uni.redirectTo({
								url: "/pages/signin"
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		padding: 0 62rpx;
		padding-top: 88rpx;

		.logo {
			margin-top: 80rpx;
			text-align: center;

			image {
				width: calc(192rpx);
				height: calc(91rpx);
			}
		}

		h3 {
			font-size: 60rpx;
			padding-top: 54rpx;
		}

		.sign-form {
			margin-top: 60rpx;

			.input-item {
				display: flex;
				align-items: center;
				border-bottom: 4rpx solid rgba(39, 40, 50, 0.08);

				input {
					padding: 30rpx 0;
					border: unset;
					font-size: 40rpx;
					background: unset;
					flex: 1;



					&:focus {
						border: unset;
					}

					&:-internal-autofill-selected {
						background: unset !important;
					}
				}

				.text-err {
					color: $uni-color-error;
				}

				image {
					width: 46rpx;
					height: 40rpx;
				}

				.lookpwd {
					height: 46rpx;
				}



				margin-bottom: 10rpx;



			}

			.employ {
				padding: 5rpx 0;
				color: $uni-color-error;
			}

			button {
				margin-top: 120rpx;
				background: #FFE431;
				box-shadow: 0 25px 16px -18px rgba(255, 228, 49, 0.40);
				border-radius: 24px;
				border-radius: 24px;
				border: unset;
				font-family: PingFangSC-Medium;
				font-size: 16px;
				color: #272832;
				letter-spacing: 0;
				transition: .1s ease-in-out;

				&:active {
					box-shadow: 0px 3px 10px #dcc602 inset;
					transform: translateY(3px);
				}

				&::after {
					border: unset;
				}
			}
		}
	}
</style>
