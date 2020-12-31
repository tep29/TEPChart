<template>
	<view>
		<SHeader right left>
			<navigator slot="right" url="./signup">注册</navigator>
		</SHeader>
		<div class="main">

			<div class="logo">
				<image src="../static/images/signIn/logo.png"></image>
			</div>
			<h3>登录</h3>
			<div class="sign-form">
				<form @submit="loginFetch">
					<div class="input-item flex-wrap">
						<input type="text" placeholder-style="color: #999;font-weight:400;" name="email" v-model="model.email"
						 placeholder="邮箱">
						<!-- <div class="employ">用户名不存在</div> -->
					</div>
					<div class="input-item flex-wrap">
						<input type="password" placeholder-style="color: #999;font-weight:400;" name="password" v-model="model.password"
						 placeholder="密码">
						<!-- <div class="employ">密码错误</div> -->
					</div>

					<button form-type="submit">登录</button>
				</form>
			</div>

		</div>
	</view>
</template>

<script>
	import {
		login as loginApi
	} from '../api/index.js'
	export default {
		data() {
			return {
				model: {
					email: '',
					password: ''
				},
			}
		},
		created(e) {

		},
		methods: {
			async loginFetch(e) {

				const params = e.detail.value
				if (String(params.email).trim().length === 0) {
					return uni.showToast({
						message: "请输入邮箱"
					})
				}
				if (String(params.password).trim().length === 0) {
					return uni.showToast({
						message: "请输入密码"
					})
				}

				const {
					data: {
						message,
						token,
						userID
					}
				} = await loginApi(params)
				uni.showModal({
					content: message,
					showCancel: false,
					complete: () => {
						if (token) {
							localStorage.TEPCHART_TOKEN = token
							localStorage.TEPCHART_USERID = userID
							uni.redirectTo({
								url: "/pages/index"
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

				&.flex-wrap {
					flex-direction: column;
				}

				.employ {
					padding: 5rpx 0;
					color: $uni-color-error;
				}

				input {
					background: unset;
					border: unset;
					border-bottom: 4rpx solid rgba(39, 40, 50, 0.08);
					padding: 30rpx 0;
					font-size: 40rpx;
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
