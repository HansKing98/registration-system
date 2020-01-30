//我在做这个文件，我的群昵称是AHello  
<template>
	<uni-list>
		
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
