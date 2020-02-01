//我在做这个文件，我的群昵称是King,QQ:36568008  
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('member')
	if (event.searchKey != '') {
		const dbCmd = db.command;
		const res = await collection.where(dbCmd.or({
			name: new RegExp(event.searchKey)
		}, {
			address: new RegExp(event.searchKey)
		}, {
			phone: new RegExp(event.searchKey)
		})).orderBy("regtime", "desc").skip((event.page - 1) * event.pageSize).limit(event.pageSize).get();
		return res
	} if (event.startDate != '') {
		const dbCmd = db.command;
		const res = await db.collection('member').aggregate().lookup({
		from: 'member_list',
		localField: 'id_card',
		foreignField: 'id_card',
		as: 'memberList',
	  }).get();
		return res
	}else {
		const res = await collection.orderBy("regtime", "desc").skip((event.page - 1) * event.pageSize).limit(event.pageSize)
			.get();
		return res
	}

};
