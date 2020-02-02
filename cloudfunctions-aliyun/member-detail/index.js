'use strict';
const db = uniCloud.database()
exports.main = async (event = {}, context) => {
	const collection = db.collection('member_list')
	const id = event.id
	if (!id) {
		return {
			code: -1,
			msg: 'error:id'
		}
	}
	const res = await collection.where({
		member_id: id
	}).limit(1).get()
	return {
		code: 0,
		data: res.data[0] || {},
		msg: 'ok'
	}
};
