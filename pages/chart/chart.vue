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
	// 躺希腊额阿毛 2020/1/30 0:01 QQ:786997741
	import uCharts from '@/components/u-charts/u-charts.js';
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
				let LineA = {
					"categories": ["20/12", "20/13","20/14", "20/15", "2016", "2014","2013","2014", "2015", "2016", "2014", "2015", "2016", "2017"],
					"series": [{
						"name": "隔离",
						"data": [35, 8, 25, 37, 4, 25,8, 25, 37, 4, 25, 37, 4,20]
					}, {
						"name": "发烧",
						"data": [70, 40, 62, 100, 44,8, 25, 37, 4, 25,25, 37, 4, 68]
					}, {
						"name": "疑似",
						"data": [10, 20, 61, 10,8, 25, 37, 4, 25, 44,25, 37, 4, 68]
					}, {
						"name": "确诊",
						"data": [5, 40, 65, 100, 8, 25, 37, 4, 25,44, 25, 37, 4,68]
					}, {
						"name": "死亡",
						"data": [100, 80, 95, 150,8, 25, 37, 4, 25,25, 37, 4, 112, 132]
					}]
				};
				_self.showLineA("canvasLineA", LineA);
			},
			showLineA(canvasId, chartData) {
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
						calibration: true,
						splitNumber: 4,
						min: 10,
						max: 180,
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
