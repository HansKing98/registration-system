<!-- //我在做这个文件，我的群昵称是AHello -->
<!--丛林野战军2020.2.1修改，增加二维码-->
<!-- heavensoft，修改二维码的地址 -->
<template>
	<view>
		<uni-list>
			<uni-list-item :title="this.username" show-arrow="false" thumb="/static/font/user.png"></uni-list-item>
			<uni-list-item title="修改密码" thumb="/static/font/pwd.png" @click="modifyPwd()"></uni-list-item>
			<uni-list-item title="关于" thumb="/static/font/about.png" @click="aboutUs()"></uni-list-item>
			<uni-list-item title="切换账号/退出" thumb="/static/font/exit.png" @click="exit()"></uni-list-item>
		</uni-list>
		<view class="list">
			<view class="tips">可以让外来人员扫描此码，自助填写信息</view>
			<view>
				<image class="qrcode" :src="ewm" mode="widthFix"></image>
			</view>
		</view>
	</view>

</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniIcon from "@/components/uni-icons/uni-icons.vue"
	import QR from '../../common/qrcode.js';
	export default {
		components: {
			uniList,
			uniListItem,
			uniIcon
		},
		data() {
			return {
				username: uni.getStorageSync('username'),
				ewm: '' //二维码
			}
		},
		onLoad() {
			let ewmurl = `${location.protocol}//${location.host}/#/pages/tabbar/add?id=${this.username}`;
			this.ewm = QR.createQrCodeImg(ewmurl, {
				size: 350
			});
		},
		methods: {
			//修改密码
			modifyPwd() {
				uni.navigateTo({
					url: '/pages/change-pwd/change-pwd'
				})
			},
			//关于我们
			aboutUs() {
				uni.navigateTo({
					url: ''
				})
			},
			//退出
			exit() {
				uni.removeStorageSync('token')
				uni.removeStorageSync('username')
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},
		}
	}
</script>

<style>
	.list {
		padding: 20px 0px;
		text-align: center;
		border-top: solid 1px #DDDDDD;
	}

	.tips {
		line-height: 80px;
		font-size: 14px;
		color: #999999;
	}

	.qrcode {
		width: 150px;
		height: 150px;
	}
</style>
