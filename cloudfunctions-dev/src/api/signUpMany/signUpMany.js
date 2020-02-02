const crypto = require('crypto')
const jwt = require('jwt-simple')
const {
	tokenExp
} = require('../../utils/constants.js')
const {
	encryptPassword
} = require('../../utils/encryptPassword.js')

const db = uniCloud.database()

async function signUp(event) {
	const {
		phone,
		password,
		username
	} = event

	let userInfo = {
		phone
	}

	const userInDB = await db.collection('user').where(userInfo).get()

	let tokenSecret = crypto.randomBytes(16).toString('hex'),
		token = jwt.encode(userInfo, tokenSecret)

	let userUpdateResult
	if (userInDB.data && userInDB.data.length === 0) {
		userUpdateResult = await db.collection('user').add({
			...userInfo,
			password: encryptPassword(password),
			username,
			tokenSecret,
			exp: Date.now() + tokenExp
		})
	} else {
		return {
			code: -1,
			msg: '此操作员已添加，请勿重复添加'
		}
	}

	if (userUpdateResult.id || userUpdateResult.affectedDocs === 1) {
		return {
			code: 0,
			token,
			msg: '注册成功'
		}
	}

	return {
		code: -1,
		msg: '注册失败'
	}
}

// 批量注册操作员账号

async function signUpMany() {
	const userList = [{
		phone: '18811112222',
		password: '111222',
		username: '操作员1'
	}, {
		phone: '18822223333',
		password: '222333',
		username: '操作员2'
	}, {
		phone: '18833334444',
		password: '333444',
		username: '操作员3'
	}]

	let resultList = [];
	for (let i = 0; i < userList.length; i++) {
		const res = await signUp(userList[i]);
		resultList.push(res.code);
	}
	
	let signUpManyResult = resultList.every((item) => {
		return item === 0
	})
	
	if (signUpManyResult) {
		return {
			msg: '操作员账号注册完成'
		}
	} else {
		return {
			msg: '一个或多个操作员账号注册失败'
		}
	}
}

exports.main = signUpMany
