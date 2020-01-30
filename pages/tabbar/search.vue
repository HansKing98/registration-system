<template>
	<!--King上传于2020年1月30日12：40，QQ:36568008-->
	<view class="fixed">
		<view class="search uni-flex bg-white" style="align-items: center;">
			<uni-search-bar @confirm="search" v-model="searchKey"  style="flex:1" />
			<!-- <input type="text" class="flex-sub" style="padding: 0 20upx;" v-model="searchKey" @confirm="search" placeholder="请输入人名,状态等关键词"
			 confirm-type="search" />
			<text class="uni-bg-green" style="padding: 15upx 30upx;">搜索</text> -->
		</view>
		<!-- <button type="primary" @tap="add"></button> -->
		<view class="flex-sub" style="position: relative;">
			<scroll-view scroll-y="true" style="position: absolute;width: 100%;height: 100%;padding-top: 20upx;" @scrolltolower="next">
				<uni-list>
					<uni-list-item v-for="(item,index) in list" :key="index"  @click="openDetail(item.id_card)" :title="item.name" :note="item.address"></uni-list-item>
				</uni-list>
				<view class="uni-flex" style="justify-content: center;padding: 10upx;">
					{{contentText[loadingType]}}
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				searchKey:'',
				list: [],
				page: 1,
				loadingType: 0,
				contentText: ["上拉显示更多", "正在加载...","没有更多数据了"]
				
			}
		},
		onLoad() {
			_this = this;
		},
		onShow() {
			this.load();
		},
		methods: {
			input:function(res) {
				this.searchKey = res.value
			},
			search:function(){
				_this.reload();
			},
			add: function() {
				// uniCloud.callFunction({
				// 	name: 'add-member',
				// 	data: {

				// 		guid:"sdfdsafassasafasdfasdf", // string 用户唯一标识，添加时生成无法修改
				// 		id_type: 0, // int 证件类型 0 身份证, 1 护照
				// 		id_card: "510222181851551544", // string 证件号码，需验证符合规则
				// 		name: "张三", // string 不能为空
				// 		phone: "13123456789", // string 不能为空，需验证符合规则
				// 		age: 18, // int
				// 		sex: 0, // int (0女, 1男, 2未知)
				// 		photo: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-unic0430a1/95e8e1b0-430b-11ea-bfb9-1bb194e2d539.jpg", // string 图片url地址
				// 		address: {
				// 			country: 0,
				// 			province: 0,
				// 			city: 0,
				// 			district: 0,
				// 			street: 0
				// 		},
				// 		city: "重庆市", //string (市-搜索字段)
				// 		area: "九龙坡区", //(区-搜索字段)
				// 		address: "重庆市九龙坡区杨家坪1号", //身份证地址
				// 		regtime: Date.now() //（入库时间）

				// 	}
				// });
			},
			next() {
				this.page = this.page + 1;
				if (this.loadingType !== 0) {
					return;
				}
				this.loadingType = 1;
				this.load();
			},
			load: function() {
				uni.showLoading();
				uniCloud.callFunction({
					name: 'search',
					data:{page:this.page,searchKey:this.searchKey.value,pageSize:10}
				}).then((res) => {
					uni.hideLoading();
					if (res.result.data.length == 0) {
						this.loadingType = 2;
						return;
					} else {
						_this.list = _this.list.concat(res.result.data);
						this.loadingType = 0;
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `查询失败，错误信息为：${err.message}`,
						showCancel: false
					})
				})
				
			},
			reload: function() {
				_this.page = 1;
				_this.loadingType = 0;
				_this.list = [];
				_this.load();
			}
		}
	}
</script>

<style>
	@import "../../common/uni.css";

	page {
		background-color: #EEEEEE;
	}

	.fixed {
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	.flex-sub {
		flex: 1;
	}

	.bg-white {
		background-color: white;
	}
</style>
