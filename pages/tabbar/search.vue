<template>
	<!--King上传于2020年1月30日12：40，QQ:36568008-->
	<view>
		<view class="search uni-flex bg-white" style="align-items: center;">
			<input type="text" class="flex-sub" style="padding: 0 20upx;" v-model="searchKey" placeholder="请输入人名,状态等关键词"
			 confirm-type="search" />
			<text class="uni-bg-green" style="padding: 15upx 30upx;">搜索</text>
		</view>
		<view class="flex-sub" style="position: relative;">
			<scroll-view scroll-y="true" style="position: absolute;width: 100%;height: 100%;" @scrolltolower="next">
				<view class="uni-list-cell" v-for="(item,index) in list" :key="index">
					
				</view>
				<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	var _this;
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	export default {
		data() {
			return {
				list: [],
				page: 1,
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		components: {
			uniLoadMore
		},
		onLoad(){
			_this=this;
		},
		onShow(){
			this.load();
		},
		methods: {
			next() {
				this.page = this.page + 1;
				if (this.loadingType !== 0) {
					return;
				}
				this.loadingType = 1;
				this.load();
			},
			load: function() {
				uniCloud.callFunction({
				  name: 'member-list'
				}).then((res) => {
				  uni.hideLoading()
				  uni.showModal({
				    content: `查询成功，获取数据列表为：${JSON.stringify(res.result.data)}`,
				    showCancel: false
				  })
				  console.log(res)
				}).catch((err) => {
				  uni.hideLoading()
				  uni.showModal({
				    content: `查询失败，错误信息为：${err.message}`,
				    showCancel: false
				  })
				  console.error(err)
				})
				// this.tool.post('/Message/GetList', {
				// 	page: this.page
				// }).then(res => {
				// 	if (res.data.code == 0) {
				// 		if (res.data.data.length == 0) {
				// 			this.loadingType = 2;
				// 			return;
				// 		} else {
				// 			_this.list = _this.list.concat(res.data.data);
				// 		}
				// 		this.loadingType = 0;
				// 	} else {}
				// });
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
	}

	.flex-sub {
		flex: 1;
	}

	.bg-white {
		background-color: white;
	}
</style>
