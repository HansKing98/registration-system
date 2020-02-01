//我在做这个文件，我的群昵称是AHello <!--丛林野战军2020.2.1修改，增加二维码-->
<template>
	<view>		
		<uni-list>			
		    <uni-list-item :title="this.username" :note="this.phone" show-arrow="false" thumb="/static/font/user.png"></uni-list-item>
		    <uni-list-item title="修改密码" thumb="/static/font/pwd.png" @click="modifyPwd()"></uni-list-item>
			<uni-list-item title="关于" thumb="/static/font/about.png" @click="aboutUs()"></uni-list-item>
			<uni-list-item title="切换账号/退出" thumb="/static/font/exit.png" @click="exit()"></uni-list-item>
		</uni-list>
		<view class="list"><x style="">扫码直接填写信息</x><x style=""><image :src="ewm" style="width:300upx;height:300upx;margin:auto;"></image></x></view>
	</view>
	
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniIcon from "@/components/uni-icons/uni-icons.vue"
	import QR from '../../common/qrcode.js';
	export default {	
		components: {uniList,uniListItem,uniIcon},
		data() {
			return {				
				username:'张三',
				phone:"15022103112",
				ewm:''  //二维码
			}
		},
		onLoad() {
			let userid="user"
			let ewmurl="http://www.anjnet.com/xinguan/#/pages/index/add?id="+userid;
			this.ewm=QR.createQrCodeImg(ewmurl, {
										size: 350
									});
		}
		onShow() {
			//TODO 此处需要根据登录设置适当调整
			let that = this ;
			uni.getStorage({
				key: 'username',
				success: function(res) {						 
					that.username = res.data;
				}
			});
			uni.getStorage({
				key: 'phone',
				success: function(res) {						 
					that.phone = res.data;
				}
			});
		},
		methods: {
			//修改密码
			modifyPwd() {				
				uni.navigateTo({
					url: 'change-pwd'
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
				uni.navigateTo({
					url: 'login'
				})
			},
		}
	}
</script>

<style>
	.list{
		height:350upx;
		display: flex;
		flex-direction: column;
		margin:20upx;
        background:#f0f0f0;
       margin:auto;
	}
</style>
