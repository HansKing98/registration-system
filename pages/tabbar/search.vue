	//我在做这个文件，我的群昵称是King,QQ:36568008  
<template>
	<view class="fixed">
		<view class="search uni-flex bg-white" style="align-items: center;">
			<uni-search-bar @confirm="search" v-model="searchKey"  style="flex:1" />
		</view>
		<view class="flex-sub" style="position: relative;">
			<scroll-view scroll-y="true" style="position: absolute;width: 100%;height: 100%;padding-top: 20upx;" @scrolltolower="next">
				<uni-list>
					<uni-list-item v-for="(item,index) in list" :key="index"  @click="openDetail(item._id)" :title="item.name" :note="item.address"></uni-list-item>
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
			openDetail:function(id){
				uni.navigateTo({
					url:'../member-detail/member-detail?id='+id
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
