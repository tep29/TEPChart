<template>
	<div>
		<SHeader left right center border>
			<!-- @keypress.enter 修饰符 回车搜索 -->
			<div class="search-input" slot="center" @keypress.enter="searchFetch">
				<input type="text" v-model="searchValue" @input="changeSearch">
				<div class="search-btn" @click.enter="searchFetch">
					<image src="../static/images/index/search.png" alt="">
				</div>
			</div>
			<div class="search-cancel" slot="right" @click.prevent="clickCencal">取消</div>
		</SHeader>
		<div class="main" v-if="searchValue">
			<div class="list">
				<h3>用户</h3>
				<ul v-if="users.length > 0">
					<li v-for="user in users" :key="user._id" @click="go(user._id)">
						<image :src="user.avatar"></image>
						<div class="name">{{user.username}}</div>
						<button class="sendAdd" @click.stop="addFriend(user)">加好友</button>
						<!-- <button class="sendMsg">发消息</button> -->
					</li>
				</ul>
				<div v-else class="not-data">暂无内容</div>
			</div>
			<div class="list">
				<h3>群组</h3>
				<ul v-if="groups.length > 0">
					<li v-for="group in groups" :key="groups">
						<image :src="group.avatar"></image>
						<div class="name">{{group.name}}</div>
					</li>
				</ul>
				<div v-else class="not-data">暂无内容</div>
			</div>
		</div>

	</div>
</template>

<script>
	import {
		search,
		addFriend as addFriendApi
	} from '../api/index.js'
	export default {
		data() {
			return {
				searchValue: '',
				groups: [],
				users: []
			}
		},
		methods: {
			async addFriend(user) {
				const id = localStorage.TEPCHART_TOKEN
				const _ = await addFriendApi({
					uid: id,
					fid: user.id,
				})
				console.log(_)
			},
			changeSearch(event) {
				const value = event.detail.value
				if (value.length <= 0 || value == '') {
					this.groups = []
					this.users = []
				}
			},
			async go(id) {

				uni.navigateTo({
					url: "/pages/info?id=" + id
				})
			},

			async searchFetch() {

				const data = {
					search: this.searchValue
				}
				const {
					data: {
						group,
						user
					}
				} = await search(data)
				this.groups = group
				this.users = user
			},
			clickCencal() {
				return history.back()
			}
		}
	}
</script>

<style lang="scss">
	.search-input {
		background: #F3F4F6;
		border-radius: 5px;
		border-radius: 5px;
		position: relative;

		input {
			text-align: left;
			font-size: 26rpx;
			padding: 10rpx 20rpx;
		}

		.search-btn {
			padding: 0 20rpx;
			position: absolute;
			top: 5rpx;
			right: 0;

			image {
				width: 40rpx;
				height: 40rpx;

			}
		}

	}

	.search-cancel {
		font-family: PingFangSC-Regular;
		font-size: 28rpx;
		color: #272832;
		letter-spacing: -0.48px;
	}

	.main {
		padding-top: calc(88rpx);
	}

	.list {
		padding: 0 32rpx;
		padding-top: 34rpx;

		.not-data {
			text-align: center;
			width: 100%;
			color: #999;
			font-size: 32rpx;
			padding: 30rpx 0;
		}

		h3 {
			font-family: PingFangSC-Semibold;
			font-size: 22px;
			color: #272832;
			letter-spacing: -0.75px;
		}

		ul {
			list-style: none;
			padding: 0;

			li {
				display: flex;
				align-items: center;
				margin-top: 40rpx;

				image {
					border-radius: 10rpx;
					border-radius: 10rpx;
					width: 80rpx;
					height: 80rpx;
					background: $uni-color-primary;
				}

				.name {
					margin-left: 32rpx;
					flex: 1;
				}

				button {
					border-radius: 24rpx;
					border-radius: 24rpx;
					min-width: 120rpx;
					height: 48rpx;
					font-size: 22rpx;
					border: unset;

					&.sendMsg {
						background: #FFE431;

					}

					&.sendAdd {
						background: rgba(74, 170, 255, 0.10);
						color: #4AAAFF;
					}

					&::after {
						border: unset;
					}

					line-height: 48rpx;
				}
			}
		}
	}
</style>
