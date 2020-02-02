<template>
	<view class="container">
		<view class="section">
			<input v-model="phone" placeholder="手机号" />
		</view>
		<view class="section">
			<input v-model="password" password="true" placeholder="密码" />
		</view>
		<button class="login-btn" type="primary" @click="login">登录</button>
	</view>
</template>

<script>
	let _self;
	export default {
		data() {
			return {
				phone: '',
				password: '',
			};
		},
		methods: {
			login() {
				const {
					phone,
					password
				} = this
				if (!phone) {
					uni.showModal({
						content: '请填写手机号码',
						showCancel: false
					})
					return
				}
				if (!password) {
					uni.showModal({
						content: '请填写手机号码',
						showCancel: false
					})
					return
				}
				uni.showLoading({
					title: '登录中...'
				})
				this.$cloud.callFunction({
					name: 'login',
					data: {
						phone,
						password,
					}
				}).then((res) => {
					uni.hideLoading()
					if (res.result.token) {
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						})
						uni.setStorageSync('token', res.result.token)
						uni.switchTab({
							url: '/pages/tabbar/member'
						})
					} else {
						return Promise.reject(new Error(res.result.msg))
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: err.message || '登录失败',
						showCancel: false
					})
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 30px;
	}

	.section {
		margin: 20px;
		padding: 10px 0px;
		border-bottom: 2upx solid #eee;
	}

	.login-btn {
		margin: 30px 20px 0px 20px;
	}
</style>
