'use strict';
const db = uniCloud.database()
exports.main = async (event = {}, context) => {
	const collection = db.collection('member')
	const length = Number(event.length) || 10
	const res = await collection.limit(length).get()
	return {
		code: 0,
		data: res.data,
		msg: 'ok'
	}
};
