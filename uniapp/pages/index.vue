<template>
	<view class="content">
		<SHeader right left center border>
			<navigator url="/pages/user" slot="left">
				<image class="h-left-logo" :src="userinfo.avatar"></image>
			</navigator>
			<!-- <image slot="center" class="h-center-l -->ogo" src="../static/images/index/logo.png"></image>
			<div class="h-right" slot="right">
				<div class="imgs" @click.prevent="iconRouter('search')">
					<image src="../static/images/index/search.png" alt="">
				</div>
				<div class="imgs">
					<image src="../static/images/index/add.png" alt="">
				</div>
			</div>
		</SHeader>
		<!-- <view class="top-bar">
			<view class="top-bar-left">
				<image src="../static/images/test/demo3.jpg"></image>
			</view>
			<view class="top-bar-center">
				<image src="../static/images/index/logo.png"></image>
			</view>
			<view class="top-bar-right">
				<div class="imgs">
					<image src="../static/images/index/search.png" alt="">
				</div>
				<div class="imgs">
					<image src="../static/images/index/add.png" alt="">
				</div>
			</view>
		</view> -->
		<div class="main">

			<div class="apply"></div>
			<div class="friends">
				<div class="friends-list" v-for="(friend,i) in frineds" :key="i">
					<div class="friends-list-l">
						<text class="tip">{{friend.tip}}</text>
						<image :src="`../static/images/test/${friend.imgUrl}`"></image>
					</div>
					<div class="firends-list-r">
						<div class="top">
							<div class="name">{{ friend.name }}</div>
							<div class="date">{{ friend.time }}</div>
						</div>
						<div class="msg">{{ friend.news }}</div>
					</div>

				</div>

			</div>
		</div>
	</view>
</template>

<script>
	import {
		frined
	} from '../commons/js/datas.js'
	import {
		format
	} from 'silly-datetime'
	import {
		userinfo as userinfoApi
	} from '../api/index.js'
	export default {
		data() {
			return {
				frineds: [],
				userinfo: {}
			}
		},
		created() {
			this.fetch()
			this.userinfoFetch()
		},

		methods: {
			async userinfoFetch() {
				const {
					data: {
						userinfo
					}
				} = await userinfoApi()

				this.userinfo = userinfo && userinfo
			},
			async fetch() {
				const {
					status,
					data: {
						frineds
					}
				} = await frined()
				this.frineds = frineds.map(x => {
					x.time = format(x.time, 'HH:MM')
					return x
				})
			},
			iconRouter(url) {
				uni.navigateTo({
					url: `/pages/${url}`
				})
			}
		}
	}
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: var(--status-bar-height);

		.h-left-logo {
			width: 68rpx;
			height: 68rpx;
			border-radius: 16rpx;
		}

		.h-center-logo {
			width: 88rpx;
			height: 42rpx;
		}

		.h-right {
			height: 100%;
			display: flex;
			align-items: center;

			.imgs {
				width: 80rpx;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: calc(100% / 1.7);
					height: calc(100% / 1.8);
				}

				&:last-of-type {
					margin-left: 10rpx;

					image {
						width: calc(100% / 1.7);
						height: calc(100% / 1.9);
					}
				}
			}
		}
	}

	.main {
		width: 100%;
		padding-top: 88rpx;

		.friends {
			padding: 0 32rpx;
			width: 100%;

			.friends-list {
				padding: 20rpx 0;
				display: flex;
				align-items: center;
				max-width: 100%;

				.friends-list-l {
					position: relative;
					width: 96rpx;
					height: 96rpx;
					min-width: 96rpx;

					.tip {
						background-color: $uni-color-warning;
						position: absolute;
						top: calc(-36rpx / 2.5);
						height: 36rpx;
						line-height: 36rpx;
						color: #fff;
						padding: 0 10rpx;
						right: calc(-36rpx / 2.5);
						z-index: 1;
						font-size: 24rpx;
						border-radius: 36rpx;
						text-align: center;

					}

					image {
						width: 100%;
						height: 100%;
						border-radius: 24rpx;
						background-color: $uni-color-primary;
					}
				}

				.firends-list-r {
					padding-left: 33rpx;
					display: flex;
					flex: 1;
					justify-content: flex-end;
					flex-direction: column;
					width: calc(100% - (96rpx * 2)) !important;

					.top {
						display: flex;
						flex: 1;

						.name {
							font-family: PingFangSC-Regular;
							font-size: 32rpx;
							font-weight: 600;
							color: #272832;
							letter-spacing: -0.62rpx;
							flex: 1;
						}

						.date {
							font-size: 26rpx;
							color: rgba(39, 40, 50, 0.40);
							letter-spacing: -0.41rpx;
						}
					}

					.msg {
						font-size: 26rpx;
						color: rgba(39, 40, 50, 0.60);
						letter-spacing: -0.48px;
						margin-top: 10rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						width: auto;
					}
				}
			}
		}
	}
</style>
