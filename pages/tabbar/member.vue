//我在做这个文件，我的群昵称是AHello
<template>
	<view>
		<view class="tag">
			<uni-tag style="margin: 5upx 5upx;" v-for="(item,index) in tags" :key="index" @click="tagQuery(index)" :text="item.text"
			 :type="item.type"></uni-tag>
		</view>
		<view class="flex-item flex-item-V uni-bg-blue">
			<uni-list>
				<uni-list-item v-for="(item,index) in members" :key="index" @click="openDetail(item)" :title="item.name" :note="item.address"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	export default {
		components: {
			uniList,
			uniListItem,
			uniTag
		},
		data() {
			return {
				members: [],
				tags: [{
						"text": "所有",
						"type": "default"
					},
					{
						"text": "普通",
						"type": "primary"
					},
					{
						"text": "隔离",
						"type": "success"
					},
					{
						"text": "发烧",
						"type": "success"
					},
					{
						"text": "疑似",
						"type": "success"
					},
					{
						"text": "确诊",
						"type": "warning"
					},
					{
						"text": "死亡",
						"type": "error"
					}
				]
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			loadData() {
				uni.showLoading({
					title: "加载中..."
				});

				this.$cloud.callFunction({
					name: 'member-list',
					data: {
						page: 0,
						length: 10
					}
				}).then(({
					result
				}) => {
					uni.hideLoading()
					console.log(result)
					if (result.code !== 0) {
						uni.showToast({
							icon: 'none',
							title: result.msg
						})
						return
					}
					this.fillData(result.data)
				}).catch(err => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '数据加载失败'
					})
				})
			},
			fillData(data) {
				this.members = data;
			},
			//明细
			openDetail: function(item) {
				console.log(item)
			},
			//标签搜索
			tagQuery: function(e) {}
		}
	}
</script>

<style>
	.tag {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 10px 10px;
	}
</style>
