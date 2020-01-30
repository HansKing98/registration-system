<template>
	<view class="content">

	</view>
</template>

<script>
	export default {
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
                    name: 'member-detail',
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
	page {
		background: #f0f0f0;
	}
</style>
