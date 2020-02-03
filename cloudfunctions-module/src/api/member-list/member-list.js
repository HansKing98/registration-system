'use strict';
const {
    validateToken
} = require('../../utils/validateToken.js')

const db = uniCloud.database()
exports.main = async (event = {}, context) => {
    let validateResult
    try {
        validateResult = await validateToken(event.token)
    } catch (e) {
        //TODO handle the exception
        return {
            code: -3,
            errCode: 'TOKEN_INVALID',
            msg: '登录状态无效，请重新登录'
        }
    }

    if (validateResult.code !== 0) {
        return {
            code: -3,
            errCode: 'TOKEN_INVALID',
            msg: '登录状态无效，请重新登录'
        }
    }

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
