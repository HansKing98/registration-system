// 我在做这个文件，群昵称: 躺希腊额阿毛 QQ:786997741
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('member_list')
	const $ = db.command.aggregate
	const res = await collection.aggregate().group({
		_id: {
			month: {
				$month: "$body_status.time"
			},
			day: {
				$dayOfMonth: "$body_status.time"
			},
			year: {
				$year: "$body_status.time"
			},
			status: "$body_status.status"
		},
		count: $.sum(1)
	}).end();
	return res
};
