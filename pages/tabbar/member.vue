//我在做这个文件，我的群昵称是xxx
<template>
	<uni-list>
		<!-- <uni-list-item title="标题文字" :show-arrow="false"></uni-list-item>
		<uni-list-item title="标题文字"></uni-list-item>
		<uni-list-item title="标题文字" :show-badge="true" badge-text="12"></uni-list-item>
		<uni-list-item title="禁用状态" :disabled="true" :show-badge="true" badge-text="12"></uni-list-item> -->
	</uni-list>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {

			}
		},
		onLoad() {
			// this.loadData();
		},
		methods: {
			loadData() {
				uni.showLoading({
					title: "加载中..."
				});

				uniCloud.callFunction({
					name: 'member-list',
					data: {},
					success: (res) => {
						this.fillData(res);
					},
					fail: (err) => {},
					complete: (c) => {
						uni.hideLoading();
					}
				})
			},
			fillData() {}
		}
	}
</script>

<style>

</style>
