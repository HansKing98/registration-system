// 我在做这个文件，群昵称: 躺希腊额阿毛 QQ:786997741
<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">疫情趋势图</view>
		</view>
		<view class="qiun-charts">
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import _ from 'lodash';
	import moment from 'moment';
	import {
		formatDate
	} from '@/common/util.js';
	var _self;
	var canvaLineA = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			getServerData() {
				uni.showLoading({
					title: "加载中..."
				});
				uniCloud.callFunction({
					name: 'chart-member-list',
					data: {},
					success: (res) => {
						this.fillData(res.result.data);
					},
					fail: (err) => {
						uni.hideLoading();
					},
					complete: (c) => {
						uni.hideLoading();
					}
				})
			},
			getLineData(seriesList, categories, max) {
				let LineA = {
					"categories": categories,
					"series": [{
						"name": "隔离",
						"data": seriesList[0]
					}, {
						"name": "发烧",
						"data": seriesList[1]
					}, {
						"name": "疑似",
						"data": seriesList[2]
					}, {
						"name": "确诊",
						"data": seriesList[3]
					}, {
						"name": "死亡",
						"data": seriesList[4]
					}]
				};
				_self.showLineA("canvasLineA", LineA, max);
			},
			fillData(initDatas) {
				let initDates = _.uniq(_.map(initDatas, (data) => {
					return formatDate(data._id.year, data._id.month, data._id.day)
				})).sort()
				let mDates = _.map(initDates, (mDate) => {
					let date = moment(mDate)
					return {
						year: date.year(),
						month: date.month() + 1,
						day: date.date()
					}
				})
				// 0普通、1居家隔离、2发烧、3疑似、4确诊、5死亡
				let statusDatas = [];
				for (let i = 0; i < 5; i++) {
					statusDatas.push(new Array(mDates.length).fill(0));
				}
				let max = 0;
				for (let j = 0, iLen = initDatas.length; j < iLen; j++) {
					for (let i = 0, len = mDates.length; i < len; i++) {
						if (mDates[i].year === initDatas[j]._id.year &&
							mDates[i].month === initDatas[j]._id.month &&
							mDates[i].day === initDatas[j]._id.day) {
							console.log('count', initDatas[j].count)
							let k = initDatas[j]._id.status - 1;
							statusDatas[k][i] = initDatas[j].count;
							max = initDatas[j].count > max ? initDatas[j].count : max;
						}
					}
				}
				let categories = initDates.map((initDate) => {
					return initDate.substr(5, 5)
				})
				this.getLineData(statusDatas, categories, max)
			},
			showLineA(canvasId, chartData, max) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {
						show: true,
						position: 'top'
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type: 'grid',
						disableGrid: true,
						labelCount: 7,
						scrollShow: true,
						rotateLabel: true
					},
					yAxis: {
						gridType: 'solid',
						gridColor: '#CCCCCC',
						splitNumber: chartData.categories.length < 4 ? chartData.categories.length - 1: 5,
						format: (val) => {
							return val.toFixed(0) + '人'
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});

			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			}
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
