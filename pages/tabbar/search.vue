//我在做这个文件，我的群昵称是King
<template>
	<view>
		<view class="search uni-flex" style="align-items: center;margin-bottom:20upx;padding:20upx;background-color:#0A98D5;">
			<view class="uni-flex  bg-white" style="flex: 1;padding: 10upx 30upx;border-radius: 80upx;align-items: center;">
				<picker :range="searchType" @change="change">
					<view style="display: flex;align-items: center;">{{searchType[index]}}<text class="uni-icon uni-icon-arrowdown"
						 style="font-size: 16px;height: 16px;padding-left: 10upx;"></text></view>
				</picker>
				<input type="text" v-model="searchKey" :placeholder="'请输入搜索的'+searchType[index]" style="flex:1" @confirm="search"
				 v-if="index<2" />
				<view style="display: flex;align-items: center;flex: 1;" v-if="index==2">
					<input type="text" disabled="true" v-model="startDate" placeholder="开始日期" style="border-bottom: 1px solid #d1d1d1;padding-left: 10upx;"
					 @tap="openCalendar" />
					<text style="padding: 0 10px;">至</text>
					<input type="text" disabled="true" v-model="endDate" placeholder="结束日期" style="border-bottom: 1px solid #d1d1d1;padding-left: 10upx;"
					 @tap="openCalendar" />
				</view>
				<text class="uni-icon uni-icon-search" style="color: #999999;font-size: 24px;" @tap="search"></text>
			</view>

		</view>
		<uni-list>
			<uni-list-item v-for="(item,index) in list" :key="index" @click="openDetail(item._id)" :title="item.name" :note="item.address"></uni-list-item>
		</uni-list>
		<view class="uni-flex" style="justify-content: center;padding: 10upx;">
			{{contentText[loadingType]}}
		</view>
		<uni-calendar ref="calendar" :date="info.date" :insert="info.insert" :lunar="info.lunar" :startDate="info.startDate"
		 :endDate="info.endDate" :range="info.range" @confirm="confirm" />
	</view>
</template>

<script>
	// #ifdef H5
	import xlsxUtil from '@/common/xlsxUtil.js'
	import fileSaver from 'file-saver'
	import moment from 'moment'
	import {
		exportTitle,
		bodyStatus,
		trafficType
	} from "@/common/name.js"
	// #endif
	var _this;
	export default {
		data() {
			return {
				searchKey: '',
				list: [],
				exportList: [],
				page: 1,
				loadingType: 0,
				index: 0,
				searchType: ['姓名', '手机', '日期'],
				showCalendar: false,
				startDate: '',
				endDate: '',
				info: {
					startDate: '2019-12-01',
					endDate: '2025-10-15',
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				contentText: ["上拉显示更多", "正在加载...", "没有更多数据了"]

			}
		},
		onLoad() {
			_this = this;
		},
		onShow() {

			this.reload();
		},
		onReachBottom() {
			this.page = this.page + 1;
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			this.load();
		},
		methods: {
			change: function(e) {
				this.index = e.detail.value;
				if (this.index == 2) {
					this.openCalendar();
				}
			},
			openCalendar: function() {
				this.$refs.calendar.open();
			},
			confirm: function(res) {
				this.startDate = res.range.data[0];
				this.endDate = res.range.data[res.range.data.length - 1];
				this.search();
			},
			search: function() {
				_this.reload();
			},
			load: function() {
				uni.showLoading();
				var startDate = '';
				var endDate = '';
				if (this.startDate != '') {
					startDate = new Date(this.startDate).toISOString();
					endDate = new Date(this.endDate).toISOString();
				}
				this.$cloud.callFunction({
					name: 'search',
					data: {
						page: this.page,
						startDate: startDate,
						endDate: endDate,
						searchKey: this.searchKey,
						pageSize: 10
					}
				}).then((res) => {
					uni.hideLoading();
					if (res.result.data.length == 0) {
						this.loadingType = 2;
						return;
					} else {
						var list = [];
						var exportList = [];
						if (_this.index == 2) {
							res.result.data.forEach(s => {
								list = list.concat(s.member)
							});
							exportList = res.result.data;
						} else {
							list = res.result.data;
							res.result.data.forEach(s => {
								exportList.push({
									member: [s]
								})
							});
						}
						_this.list = _this.list.concat(list);
						_this.exportList = _this.exportList.concat(exportList)
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
			openDetail: function(id) {
				uni.navigateTo({
					url: '../member-detail/member-detail?id=' + id
				})
			},
			reload: function() {
				_this.page = 1;
				_this.loadingType = 0;
				_this.list = [];
				_this.exportList = [];
				_this.load();
			},
			// #ifdef H5
			exportTableData() {
				let arr = [];
				for (let data of _this.exportList) {
					let info = {};
					Object.keys(exportTitle).map((key) => {
						if (key in data) {
							switch (key) {
								case 'from_hb':
									info[exportTitle[key]] =  data[key]== 1 ? '是' : '否'
									break;
								case 'from_wh':
									info[exportTitle[key]] =  data[key] == 1 ? '是' : '否'
									break;
								case 'check_in_time':
									info[exportTitle[key]] = moment(data[key]).format('YYYY-MM-DD');
									break;
								case 'check_out_time':
									info[exportTitle[key]] = moment(data[key]).format('YYYY-MM-DD HH:mm:ss');
									break;
								case 'traffic':
									info[exportTitle[key]['type']] = trafficType[data[key]['type']];
									info[exportTitle[key]['car_plate']] = data[key]['car_plate'];
									break;
								case 'body_status':
									info[exportTitle[key]['status']] = bodyStatus[data[key]['status']];
									info[exportTitle[key]['time']] =  moment(data[key]['time']).format('YYYY-MM-DD HH:mm:ss');
									break;
								default:
									if (typeof exportTitle[key] === 'object') {
										if (key === 'member' && data.member && data.member.length > 0) {
											data.member = data.member[0];
										}
										Object.keys(exportTitle[key]).map((k) => {
											if (data[key] && (k in data[key])) {
												switch (k) {
													case 'id_type':
														info[exportTitle[key][k]] = data[key][k] == 0 ? '身份证' : '护照';
														break;
													case 'sex':
														info[exportTitle[key][k]] = data[key][k] == 0 ? '男' : '女';
														break;
													case 'status':
														info[exportTitle[key][k]] = data[key][k] == 1 ? '是' : '否';
														break;
													default:
														info[exportTitle[key][k]] = data[key][k];
												}
											} else {
												info[exportTitle[key][k]] = '';
											}
									
										})
									} else {
										info[exportTitle[key]] = data[key];
									}
							}
							
						} else {
							info[exportTitle[key]] = ''
						}
					})
					arr.push(info)
				}
				const xlsx = xlsxUtil.jsonToExcel(arr, 'Sheet1')
				const blob = new Blob([xlsx], {
					type: 'application/octet-stream'
				})
				fileSaver.saveAs(blob, 'Info.xlsx')
			}
			// #endif
		},
		onNavigationBarButtonTap(e) {
			// #ifdef H5
			_this.exportTableData()
			// #endif
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
