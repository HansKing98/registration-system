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
        methods: {
            addUser() {
                uni.showLoading({
                    title: "处理中..."
                });

                uniCloud.callFunction({
                    name: 'add-user', // 云函数名
                    data: {}, // 表单数据
                    success: (res) => {
                    },
                    fail: (err) => {},
                    complete: (c) => {
                        uni.hideLoading();
                    }
                })
            },
        }
    }
</script>

<style>

</style>
