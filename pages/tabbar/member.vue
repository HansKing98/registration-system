//我在做这个文件，我的群昵称是AHello
<template>
    <view>

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
