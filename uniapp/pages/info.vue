<template>
	<view class="info">
		<SHeader background="transparent"></SHeader>
		<image :src="userinfo.avatar" class="bg-blur"></image>
		<div class="avatar">
			<image class="ava" :src="userinfo.avatar"></image>
			<div class="sex">
				<image :src="`../static/images/index/${userinfo.sex}.png`"></image>
			</div>
		</div>
		<div class="note" v-if="userType != 0">备注</div>
		<div class="name">昵称：{{userinfo.username}}</div>
		<div class="msg">{{userinfo.explain}}</div>

		<button v-if="userType != 0">加为好友</button>
	</view>
</template>

<script>
	import {
		userinfo as userinfoApi
	} from '../api/index.js'
	export default {
		data() {
			return {
				userinfo: {},
				userType: 0, // 状态 0 自己 
			}
		},
		created() {
			this.getTypeFetch()

		},
		methods: {
			async getTypeFetch() {
				const userID = localStorage.TEPCHART_USERID
				const urlId = location.href.split('?').pop().split("=").pop()
				// 查询是否是自己
				if (urlId == userID) {
					this.userType = 0
					this.userinfoFetch()
					return false
				} else {
					// 好友
				}
			},
			async userinfoFetch() {
				const {
					data: {
						userinfo
					}
				} = await userinfoApi()
				this.userinfo = userinfo
			}
		}
	}
</script>

<style lang="scss">
	.info {
		padding-top: 148rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100vw;
		min-height: 100vh;
		box-sizing: border-box;

		.bg-blur {
			background: url('../static/images/test/demo1.jpg') no-repeat 100% 100%;
			position: fixed;
			top: 0;
			bottom: 0;
			let: 0;
			right: 0;
			width: 100%;
			height: 100%;
			filter: blur(35px);
			z-index: -1;
		}

		.avatar {
			width: 400rpx;
			height: 400rpx;
			border-radius: 24rpx;
			background: #FFFFFF;
			position: relative;

			.ava {
				border-radius: 24rpx;
				width: 400rpx;
				height: 400rpx;
				border: 6rpx solid #fff;
			}

			.sex {
				width: 70rpx;
				height: 70rpx;
				position: absolute;
				bottom: 10rpx;
				right: 10rpx;
				border-radius: 50%;
				background: $uni-color-primary;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}

		.note {
			font-size: 40rpx;
			font-weight: 600;
			color: #333;
			margin-top: 50rpx;
		}

		.name {
			font-size: 32rpx;
			font-weight: 500;
			color: #222;
			margin-top: 30rpx;
		}

		.msg {
			color: #111;
			font-size: 28rpx;
			line-height: 30rpx;
			margin-top: 40rpx;
		}

		button {
			position: fixed;
			bottom: 5vh;
			left: 50%;
			transform: translateX(-50%);
			color: #333;
			background: $uni-color-primary;
			font-size: 32rpx;
			width: 90%;
		}
	}
</style>
