<!--丛林野战军上传于2020-01-31 18：38 QQ:31853722-->
<template>
	<view class="content">
        <view v-if="showxg==0">参数传递错误</view>
        <view class="ryxq" v-if="showxq!=0">
			<view class="xq-title">登记单位<view><image @click="gbxq()" src="/static/gb.png" style="width:50upx;height:50upx;display: flex;position: absolute;right:20upx;top:20upx;"></image></view></view>
			<view class="xq-list">
				<view class="items">记录人员：春晖社区（{{ryinfo['shry']}}）</view>
				<view class="items">最后更新：2020-01-30 12:21</view>
			</view>
			<view class="xq-title" style="position: relative;">人员信息</view>
			<view class="xq-list">
				<view class="items">姓名：{{ryinfo['name']}}</view>
				<view class="items">性别：{{ryinfo['sex']}}</view>
				<view class="items">年龄：{{ryinfo['age']}}岁</view>
				<view class="items">证件类型：{{ryinfo['cardname']}}</view>
				<view class="items">证件号码：{{ryinfo['cardnumber']}}</view>
				<view class="items">联系电话：{{ryinfo['phonenumber']}}</view>
			</view>
			<view class="xq-title">来源地信息</view>
			<view class="xq-list">
				<view class="items">是否来自武汉：{{ryinfo['iswh']}}</view>
				<view class="items">是否来自湖北：{{ryinfo['ishb']}}</view>
				<view class="items">出行方式：{{ryinfo['jtgj']}}</view>
				<view class="items">车牌号：{{ryinfo['jtgjhm']}}</view>
				<view class="items">来源：{{ryinfo['place']}}</view>
				<view class="items">现居：{{ryinfo['xzplace']}}</view>
			</view>
			<view class="xq-title">健康状况</view>
			<view class="xq-list">
				<view class="items">体温：{{ryinfo['tw']}}</view>
				<view class="items">检测时间：{{ryinfo['twsj']}}</view>
				<view class="items">其它症状：{{ryinfo['qtzz']}}</view>
				<view class="items">是否接触确诊病人：{{ryinfo['sfjc']}}</view>
				<view class="items">确诊病人姓名：{{ryinfo['jcname']}}</view>
				<view class="items">确诊病人电话：{{ryinfo['jcphone']}}</view>
				<view class="items">是否接触疑似病人：{{ryinfo['sfjcys']}}</view>
				<view class="items">疑似病人姓名：{{ryinfo['jcysname']}}</view>
				<view class="items">疑似病人电话：{{ryinfo['jcysphone']}}</view>
			</view>
			<view style="width:700upx;margin:auto;text-align:center;margin-top:20upx;padding-top:20upx;border-top:#cccccc 1upx solid;float: left;margin-bottom:40upx;"><button  type="primary" style="width:340upx;float:left;">编辑信息</button><button  type="warn" style="width:340upx;margin-left:0upx;float:right" @click="gbxq()">关闭</button></view>
		</view>
		<view class="bottom">
			<navigator url="gl"><view class="bottom-list"><image src="/static/gl.png" style="width:60upx;height:60upx"></image>人员管理</view></navigator>
			<navigator url="add"><view class="bottom-list"><image src="/static/tj.png" mode="widthFix"></image>添加人员</view></navigator>
			<navigator url="my"><view class="bottom-list"><image src="/static/my.png" mode="widthFix"></image>我的</view></navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ryinfo:{}  //存放人员信息
			}
		},
		onLoad() {
            this.ryinfo={
	"id": 6,
	"name": "李思思",
	"cardname": "身份证",
	"cardnumber": "432123232322112212",
	"age": 20,
	"sex": '女',
	"phonenumber": "32323",
	"photo": "",
	"iswh": '否',
	"ishb": '否',
	"place": "北京东大街1348号",
	"jtgj": "自驾",
	"jtgjhm": "京A12345",
	"sfqz": "否",
	"sfys": "否",
	"tw": 36.8,
	"twsj": "2020-01-30 10:00:00",
	"xzplace": "上海市南京路366号",
	"rzsj": "0000-00-00 00:00:00",
	"xzzt": "",
	"ztsj": "0000-00-00 00:00:00",
	"sfjc": 0,
	"jcname": "张三",
	"jcphone": "17777777777",
	"jctime": "0000-00-00 00:00:00",
	"sfjcys": 0,
	"jcysname": "李四",
	"jcysphone": "18888888888",
	"jcystime": "0000-00-00 00:00:00",
	"sfsh": 1,
	"shry": "张某强",
	"addtime": "2020-01-31 05:01:59",
	"about": ""
}
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
	.ryxq{
		display: flex;
		width:750upx;
		height:100%;
		background:#ffffff;
	
		position: fixed;
		z-index: 99;
		margin-top:0upx;
		top:0upx;
		flex-direction: column;
		overflow: auto;
	
	}
	.xq-list{
	
		flex-direction: row;
		font-size:30upx;
		line-height:60upx;
		flex-wrap: wrap;
		margin-top:20upx;
		height:auto;
		margin-bottom: 20upx;
	}
	.items{
		float:left;
		overflow: hidden;
		background:#efefef;
		height:50upx;
		line-height: 50upx;
		margin:20upx 20upx 0upx 20upx;
		padding:5upx 15upx 5upx 15upx;
		border-radius: 20upx;
		
	}
	.xq-title{
		
		padding:20upx;
		border-bottom:#cccccc 2upx solid;
	}
</style>
