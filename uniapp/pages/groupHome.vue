<template>
	<view class="groupHome-page">
		<SHeader left right background="transparent">
			<image slot="left" class="h-left" src="../static/images/groupHome/white-back.png"></image>
			<image slot="right" class="h-right" src="../static/images/groupHome/more.png"></image>
		</SHeader>
		<div class="top-ads">
			<image src="../static/images/test/demo2.jpg"></image>
		</div>
		<div class="main">
			<div class="title-wrap">
				<div class="title">开心就好了</div>
				<div class="date">2019/12/12</div>
			</div>
			<div class="info-wrap">特别的爱给特别的你，就阿什顿库，大哭高科技啊老哭高科技啊老大。领导咖啡什顿库，大哭高科技啊老哭高科…</div>
			<div class="group-p">
				<div class="group-title">群成员</div>
				<div class="group-admin">成员管理 <image src="../static/images/signIn/back.png"></image>
				</div>
			</div>
			<div class="member-ls">
				<div class="member-item" v-for="i in 8" :key="i">
					<div class="imgs">
						<!-- <image class="close" src="../static/images/groupHome/del.png" alt=""> -->
						<image class="avatar" src="../static/images/test/demo3.jpg"></image>
					</div>
					<text>风子</text>
				</div>
				<div class="member-item">
					<div class="imgs bg-c">
						<!-- <image class="close" src="../static/images/groupHome/del.png" alt=""> -->
						<image class="add" src="../static/images/groupHome/Group_add.png"></image>
					</div>
					<text>邀请</text>
				</div>
			</div>
			<div class="member-setting">
				<div class="setting-item">
					<div class="l">群名称</div>
					<input type="text">
					<image src="../static/images/signIn/back.png"></image>
				</div>
				<div class="setting-item flexStart">
					<div class="l">群公告</div>
					<textarea value="" placeholder="" />
					</div>
				<div class="setting-item">
					<div class="l">群内名</div>
					<input type="text">
					<image src="../static/images/signIn/back.png"></image>
				</div>
				<div class="setting-item">
					<div class="l">消息免打扰</div>
					<div class="switch">
						<switch checked color="#FFE431" @change="changeSwitch" />
					</div>
				</div>
				<div class="setting-item">
					<button>退出群聊</button>
				</div>
			</div>

		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			changeSwitch() {
				
			}
		}
	}
</script>

<style lang="scss">
	.groupHome-page {

		.h-left,
		.h-right {
			width: 45rpx;
			height: 45rpx;
		}

		.top-ads {
			width: 100vw;
			height: 334rpx;
			z-index: 1;

			image {
				width: 100%;
				height: 100%;
				z-index: 1;
			}
		}

		.main {
			background: #fff;
			margin-top: -20rpx;
			border-radius: 20rpx 20rpx 0 0;
			z-index: 2;
			position: relative;

			padding-top: 40rpx;

			.title-wrap {
				display: flex;
				align-items: center;
			padding: 0 32rpx;
				.title {
					font-family: PingFangSC-Semibold;
					font-size: 48rpx;
					font-weight: 600;
					color: #272832;
					letter-spacing: -0.82px;
					flex: 1;
				}

				.date {
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: rgba(39, 40, 50, 0.50);
					letter-spacing: -0.48px;
				}
			}

			.info-wrap {
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: #272832;
				letter-spacing: -0.48rpx;
							padding: 0 32rpx;
				margin-top: 20rpx;
				padding-bottom: 20rpx;
				border-bottom: 8rpx solid #eee;
			}

			.group-p {
				margin-top: 42rpx;
				display: flex;
				align-items: center;
			padding: 0 32rpx;
				.group-title {
					font-family: PingFangSC-Semibold;
					font-size: 36rpx;
					font-weight: 600;
					color: #272832;
					letter-spacing: -0.62px;
					flex: 1;
				}

				.group-admin {
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: rgba(39, 40, 50, 0.60);
					letter-spacing: -0.48px;

					image {
						margin-left: 10rpx;

						width: 28rpx;
						height: 28rpx;
						transform: rotate(180deg);
					}
				}
			}

			.member-ls {
				display: flex;
				flex-wrap: wrap;

				.member-item {
					margin-top: 40rpx;
					display: flex;
					align-items: center;
					flex-direction: column;
					width: 20%;

					.bg-c {
						background: #FFE431;
						line-height: 124rpx;
					}

					.imgs {
						width: 104rpx;
						height: 104rpx;
						position: relative;
						border-radius: 20rpx;
						text-align: center;

						.close {
							position: absolute;
							top: -20rpx;
							right: -20rpx;
							width: 40rpx;
							height: 40rpx;
							z-index: 1;
						}

						.add {
							width: 50rpx;
							height: 50rpx;
						}

						.avatar {
							width: 100%;
							height: 100%;
							border-radius: 20rpx;
						}
					}

					text {
						font-family: PingFangSC-Regular;
						font-size: 28rpx;
						text-align: center;
						color: #272832;
						letter-spacing: -0.48px;
						margin-top: 5rpx;
					}
				}
			}

			.member-setting {
				padding: 0 32rpx;
				border-top: 8rpx solid #eee;
				margin-top: 40rpx;

				.setting-item {
					display: flex;
					align-items: center;
					padding: 35rpx 0;
					border-bottom: 1px solid #eee;
					button {
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
					.l {
						font-family: PingFangSC-Regular;
						font-size: 38rpx;
						color: #272832;
						letter-spacing: -0.55px;
						margin-right: 20rpx;
					}
					.switch {
						flex: 1;
						text-align: right;
					}
					&.flexStart {
						align-items: flex-start;
					}
					textarea {
							max-height: 270rpx;
					}
					input,
					textarea{	
						font-family: PingFangSC-Regular;
						font-size: 38rpx;
						color: rgba(39, 40, 50, 0.60);
						letter-spacing: -0.55px;
						flex: 1;
					
					}

					image {
						width: 28rpx;
						height: 28rpx;
						transform: rotate(180deg);
					}
				}
			}
		}
	}
</style>
