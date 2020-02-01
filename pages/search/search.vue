<template>
	<view>
		<!-- #ifdef H5 -->
		<view style="text-align: center;"><button type="primary" style="width: 100px;height: 50px;" @click="exportBoardData">导出</button></view>
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifdef H5
	import xlsxUtil from '@/common/xlsxUtil.js'
	import fileSaver from 'file-saver'
	import {
		exportTitle,
	} from "@/common/name.js"
	// #endif
	export default {
		data() {
			return {
				// 测试数据
				exportList: [{
					"name": "掌声",
					"body_status": {
						"status": 1,
						"time": "2019-03-20T14:36:31.092Z"
					},
					"check_in_address": {
						"city": 0,
						"country": 0,
						"district": 0,
						"province": 0,
						"street": ""
					},
					"check_in_time": "2020-01-20T15:36:31.092Z",
					"comment": "",
					"contact_like_virus": {
						"contact": "",
						"name": "",
						"status": 0
					},
					"contact_like_virus_region": {
						"contact": "",
						"name": "",
						"status": 0
					},
					"contact_virus": {
						"contact": "",
						"name": "",
						"status": 0
					},
					"create_time": "2019-03-20T14:36:31.092Z",
					"from_address": {
						"city": 0,
						"country": 0,
						"district": 0,
						"province": 0,
						"street": "武汉"
					},
					"from_hb": 0,
					"id_card": "310115199501042752",
					"status": 0,
					"temperature": 0,
					"traffic": {
						"car_plate": "沪11111",
						"type": 0
					}
				}]
			}
		},
		onLoad() {
		},
		methods: {
			// #ifdef H5
			exportBoardData() {
				let arr = [];
				for (let data of this.exportList) {
					let info = {};
					Object.keys(exportTitle).map((key) => {
						if (typeof exportTitle[key] === 'object') {
							Object.keys(exportTitle[key]).map((k) => {
								info[exportTitle[key][k]] = data[key] && (k in data[key]) ? data[key][k] : ''
							})

						} else {
							info[exportTitle[key]] = key in data ? data[key] : ''
						}
					})
					arr.push(info)
				}
				const xlsx = xlsxUtil.jsonToExcel(arr, 'Sheet1')
				const blob = new Blob([xlsx], {
					type: 'application/octet-stream'
				})
				fileSaver.saveAs(blob, 'Info.xlsx')
			},
			// #endif
		}
	}
</script>

<style>
</style>
