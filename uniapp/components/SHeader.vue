<template>
	<view :class="{'top-bar':true, 'border': border}" :style="`background:${background}`">
		<view class="top-bar-left">
			<slot name="left" v-if="left"></slot>
			<image class="right-icon" v-else @click.prevent="leftClick" src="../static/images/signIn/back.png"></image>
		</view>
		<view class="top-bar-center">
			<text v-if="title">{{title}}</text>
			<slot name="center" v-else></slot>
		</view>
		<div class="top-bar-right" @click.prevent="rightClick">
			<slot name="right" v-if="right"></slot>
		</div>

	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
			},
			right: {
				type: Boolean
			},
			left: {
				type: Boolean
			},
			border: {
				type: Boolean
			},
			background: {
				type: String
			}

		},
		data() {
			return {

			}
		},
		methods: {
			leftClick() {
				if (!this.left) {
					// 浏览器历史记录返回
					return history.back()
				} else {
					this.$emit('left-click')
				}
			},
			rightClick() {
				if (this.right) {
					this.$emit('right-click')
				}
			}
		}
	}
</script>

<style lang="scss">
	.top-bar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 88rpx;
		background: $uni-bg-color;

		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;

		&.border {
			border-bottom: 4rpx solid #eee;
		}

		.top-bar-left {
			line-height: 100%;

			.right-icon {
				width: 45rpx;
				height: 45rpx;
			}
		}

		.top-bar-center {
			line-height: 100%;
			flex: 1;
			text-align: center;
			// position: absolute;
			// top: 25rpx;
			// left: 50%;
			// transform: translateX(-50%);
		}

		.top-bar-right {
			height: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 0 20rpx;

		}
	}
</style>
