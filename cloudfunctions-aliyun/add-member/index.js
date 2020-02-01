'use strict';
const db = uniCloud.database()
const defaultMemberInfo = {
	id_type: '',
	id_card: '',
	name: '',
	phone: '',
	age: '',
	city: '',
	area: '',
	address: '',
	sex: 2,
	regtime: ''
}

const defaultRecordInfo = {
	id_type: '',
	status: '',
	// 来自地区 {country: 0, province: 0, city: 0, district: 0, street: ""}
	from_address: null,
	from_hb: 0,
	from_wh: 0,
	// type:交通工具类型 0列车、1自驾车牌号、2公共汽车 car_plate: 交通工具信息
	traffic: null,
	temperature: '',
	// 现住址 {country: 0, province: 0, city: 0, district: 0, street: ""}
	check_in_address: null,
	check_in_time: '',
	// 0普通、1居家隔离、2发烧、3疑似、4确诊、5死亡， 每个状态对应的发生时间，如隔离时间、确诊时间、死亡时间
	body_status: 0,
	// 是否接触过确诊人员、对方姓名和联系方式 {status: 0, name: "", contact: ""}, // 0没有, 1有，
	contact_virus: null,
	contact_like_virus: null,
	contact_like_virus_region: null,
	comment: '',
	create_time: 0
}

exports.main = async (event = {}, context) => {

	// 测试数据
	event = {
		id_type: 0,
		id_card: '341222198008086001',
		name: '测试姓名',
		phone: '18811118888',
		age: 40,
		sex: 2,
		// 来自地区 {country: 0, province: 0, city: 0, district: 0, street: ""}
		from_address: {
			country: 0,
			province: 0,
			city: 0,
			district: 0,
			street: "测试地址"
		},
		from_hb: 0,
		from_wh: 0,
		// type:交通工具类型 0列车、1自驾车牌号、2公共汽车 car_plate: 交通工具信息
		traffic: {
			type: 0,
			car_plate: 'K123'
		},
		temperature: '36.5',
		// 现住址 {country: 0, province: 0, city: 0, district: 0, street: ""}
		check_in_address: {
			country: 0,
			province: 0,
			city: 0,
			district: 0,
			street: "测试地址"
		},
		check_in_time: Date.now(),
		// 0普通、1居家隔离、2发烧、3疑似、4确诊、5死亡， 每个状态对应的发生时间，如隔离时间、确诊时间、死亡时间
		body_status: 0,
		// 是否接触过确诊人员、对方姓名和联系方式 {status: 0, name: "", contact: ""}, // 0没有, 1有，
		contact_virus: {
			status: 1,
			name: "",
			contact: ""
		},
		contact_like_virus: {
			status: 1,
			name: "",
			contact: ""
		},
		contact_like_virus_region: {
			status: 1,
			name: "",
			contact: ""
		},
		comment: '测试额外信息'
	}
	const memberCollection = db.collection('member')
	const recordCollection = db.collection('member_list')
	// TODO 操作记录更新
	// const oprateCollection = db.collection('member_opera_history')

	// TODO 操作员id
	// const operator_id = ''

	const phone = event.phone

	const memberInfo = {}
	const recordInfo = {}
	const operateInfo = {}

	// member
	Object.keys(defaultMemberInfo).forEach(key => {
		if (key in event && event[key] !== '') {
			memberInfo[key] = event[key]
		}
	})
	if (event.from_address) {
		memberInfo.city = event.from_address.city
		memberInfo.area = event.from_address.district
		memberInfo.address = event.from_address.street
	}

	// record
	Object.keys(defaultRecordInfo).forEach(key => {
		if (key in event) {
			recordInfo[key] = event[key]
		}
	})
	recordInfo.create_time = Date.now()


	if (!memberInfo.name) {
		return {
			code: -1,
			msg: '姓名不能为空'
		}
	}
	if (!memberInfo.phone) {
		return {
			code: -1,
			msg: '联系电话不能为空'
		}
	}

	// 没有事务，无法回滚。只能一步到底

	try {
		const memberInDb = await memberCollection.where({
			phone
		}).get()

		let memberUpdateResult,
			member_id
		if (memberInDb.data && memberInDb.data.length === 0) {
			memberUpdateResult = await memberCollection.add(Object.assign({
				regtime: Date.now(),
				status: 0
			}, memberInfo))
			member_id = memberUpdateResult.id
		} else {
			memberUpdateResult = await memberCollection.doc(memberInDb.data[0]._id).update(memberInfo)
			member_id = memberInDb.data[0]._id
		}

		const recordUpdateResult = await recordCollection.add({
			...recordInfo,
			member_id
		})

		// TODO 操作记录更新
		// const operateInfo = {
		// 	member_id,
		// 	status: 0,
		// 	create_time: Date.now()
		// }

		return {
			code: 0,
			msg: '记录添加成功'
		}
	} catch (e) {
		return {e}
		return {
			code: -2,
			msg: '记录添加失败'
		}
	}
};
