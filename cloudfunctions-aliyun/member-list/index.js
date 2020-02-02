'use strict';
const db = uniCloud.database()
exports.main = async (event = {}, context) => {
	const collection = db.collection('member_list')
	const length = Number(event.length) || 10
	const page = Number(event.page) || 0
	const result = await collection.skip(length * page).limit(length).get()
	const data = []
	for (var i = 0; i < result.data.length; i++) {
		const item = result.data[i]
		const collection = db.collection('member')
		const res = await collection.where({
			_id: item.member_id
		}).get()
		if (res.data.length) {
			data.push(Object.assign(item, res.data[0], {
				list_id: item._id
			}))
		}
	}
	return {
		code: 0,
		data,
		msg: 'ok'
	}
};
