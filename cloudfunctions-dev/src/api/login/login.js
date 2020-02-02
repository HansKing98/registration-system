const crypto = require('crypto')
const jwt = require('jwt-simple')
const {
	tokenExp
} = require('../../utils/constants.js')
const {
	encryptPassword
} = require('../../utils/encryptPassword.js')

const db = uniCloud.database()

async function login(event) {
	const {
		phone,
		password
	} = event
	
	let userInfo = {
		phone
	}

	const userInDB = await db.collection('user').where({
		phone,
		password: encryptPassword(password)
	}).get()

	let tokenSecret = crypto.randomBytes(16).toString('hex'),
		token = jwt.encode(userInfo, tokenSecret)
	let userUpdateResult
	if (userInDB.data && userInDB.data.length === 0) {
		return {
			code: -1,
			msg: '手机号或密码不正确'
		}
	} else {
		userUpdateResult = await db.collection('user').doc(userInDB.data[0]._id).update({
			tokenSecret,
			exp: Date.now() + tokenExp
		})
	}

	if (userUpdateResult.id || userUpdateResult.affectedDocs === 1) {
		return {
			code: 0,
			token,
			msg: '登录成功'
		}
	}

	return {
		code: -1,
		msg: '登录失败'
	}
}

exports.main = login
