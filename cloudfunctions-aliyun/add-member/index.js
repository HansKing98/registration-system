'use strict';
const db = uniCloud.database()
const defaultInfo = {
	// 姓名
	name: '',
	// 证件类型
	cardType: '',
	// 证件号码
	cardNumber: '',
	// 年龄
	age: 0,
	// 性别
	sex: '',
	// 联系电话
	phoneNumber: '',
	// 是否来自武汉
	wuhan: false,
	// 是否来自湖北
	hubei: false,
	// 来自地区
	from: '',
	// 交通工具类型
	fromType: '',
	// 交通工具详细信息
	fromTypeExt: '',
	// 现住址
	address: '',
	// 体温
	heat: 0,
	// 体温检测时间
	time: 0,
	// 其他症状
	symptom: [],
	// 接触确诊人员信息 name phoneNumber
	touchDiagnose: null,
	// 接触疑似人员信息 name phoneNumber
	touchSeemingly: null,
	// 备注
	ext: ''
}
exports.main = async (event = {}, context) => {
	const collection = db.collection('member')
	const info = {}
	Object.keys(defaultInfo).forEach(key => {
		info[key] = key in event ? event[key] : defaultInfo[key]
	})
	if (!info.name) {
		return {
			code: -1,
			msg: '姓名不能为空'
		}
	}
	if (!info.phoneNumber) {
		return {
			code: -1,
			msg: '联系电话不能为空'
		}
	}
	const res = await collection.add(event)
	return {
		code: 0,
		msg: 'ok'
	}
};
