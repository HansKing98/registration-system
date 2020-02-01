'use strict';
const db = uniCloud.database()
exports.main = async (event = {}, context) => {
	const collection = db.collection('member')
	const length = Number(event.length) || 10
	const page = Number(event.page) || 0
	const res = await collection.skip(length * page).limit(length).get()
	return {
		code: 0,
		data: res.data,
		msg: 'ok'
	}
};
