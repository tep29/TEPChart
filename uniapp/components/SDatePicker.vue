<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
	<view class="popup">
		<view class="uni-padding-wrap">
			<div class="left-btn" @click="cancel">
				取消
			</div>
			<view class="uni-title">{{year}}年{{month}}月{{day}}日</view>
			<div class="right-btn" @click="select">
				确认
			</div>
		</view>
		<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
			<picker-view-column>
				<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>
<script>
	export default {
		data: function() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 1990; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				title: 'picker-view',
				years,
				year,
				months,
				month,
				days,
				day,
				value: [9999, month - 1, day - 1],
				visible: true,
				indicatorStyle: `height: 50px;`
			}
		},
		methods: {
			bindChange: function(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]] < 10 ? '0' + this.months[val[1]] : this.months[val[1]]
				this.day = this.days[val[2]] < 10 ? '0' + this.days[val[2]] : this.days[val[2]]
			},
			cancel() {
				this.$emit('cancel', false)
			},
			select() {
				console.log(this.year, this.month, this.day)
				this.$emit('date-select', `${this.year}-${this.month}-${this.day}`)
			}
		}
	}
</script>
<style lang="scss">
	.uni-padding-wrap {
		display: flex;
		align-items: center;
		height: 80rpx;
		padding: 0 30rpx;
		background: #f5f5f5;
		box-shadow: 0px -14px 29px #ccc;

		.left-btn {
			color: #666 !important;
		}

		.left-btn,
		.right-btn {
			height: 80rpx;
			line-height: 80rpx;
			color: #333;
			font-size: 30rpx;

			&:active {
				color: $uni-color-primary;
			}
		}

		.uni-title {
			flex: 1;
			text-align: center;
			font-size: 30rpx;
			color: #666;
		}
	}

	.popup {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		background: #fff;
	}


	.picker-view {
		width: 750rpx;
		height: 400rpx;
		margin-top: 20rpx;
	}

	.item {
		height: 50px;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
</style>
