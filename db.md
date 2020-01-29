# 外来人员登记系统 数据库(初稿)


#### 用户表
```
user
{
    _id: "", // string，自生成
    guid: "", // string 用户唯一标识，注册时生成无法修改
    username: "", // string 用户
    password: "", // string 密码(禁止明文)
    wx_open_id: "", // string 关联微信openid  用户code 换取
    id_card: "", // string 身份证号，需验证符合规则
    name: "", // string 不能为空
    phone: "", // string 不能为空，需验证符合规则
    age: 18, // int
    sex: 0, // int (0女, 1男, 2未知)
    photo: "", // string 图片url地址
    status: 0, // int 0正常 1冻结
    permission: 0, int 默认2，0超级管理员, 1普通管理员, 2普通
    create_time: 0,// 时间戳 GMT
    create_ip: "",// 注册 ip
}
```

#### 成员表
```
member
{
    _id: "", // string，自生成
    guid: "", // string 用户唯一标识，添加时生成无法修改
    id_type: 0, // int 证件类型 0 身份证, 1 护照
    id_card: "", // string 证件号码，需验证符合规则
    name: "", // string 不能为空
    phone: "", // string 不能为空，需验证符合规则
    age: 18, // int
    sex: 0, // int (0女, 1男, 2未知)
    photo: "" // string 图片url地址
}
```

#### 成员登记
```
// 新增成员登记, 需要检测 member表中是否存在 id_card，同一个人可以增加多条记录
member_list
{
    _id: "", // string，自生成
    id_card: 0, // 关联身份证ID
    status: 0, // 0正常, 1删除
    from_address: {country: 0, province: 0, city: 0, district: 0, street: ""}, // 来自地区
    from_hb: 0, // 默认0，没有来之湖北
    traffic: {type: 0, car_plate: ""}, // 交通工具类型 0列车、1自驾车牌号 2公共汽车
    temperature: 0, // 体温
    check_in_address: {country: 0, province: 0, city: 0, district: 0, street: ""}, // 现住址
    check_in_time: 0, // 入住时间 时间戳 GMT
    body_status: {status: 0, time: 0}, // int 0普通、1居家隔离、2发烧、3疑似、4确诊、5死亡， 每个状态对应的发生时间，如隔离时间、确诊时间、死亡时间
    contact_virus: {status: 0, name: "", contact: ""}, // 0没有, 1有，是否接触过确诊人员、对方姓名和联系方式
    contact_like_virus: {status: 0, name: "", contact: ""}, // 0没有, 1有，是否接触过疑似人员、对方姓名和联系方式
    contact_like_virus_region: {status: 0, name: "", contact: ""}, // 0没有, 1有，是否接触过来自疫区的人员、对方姓名和联系方式
    comment: "", // 备注
    create_time: 0, // 时间戳 GMT
}
```

#### 成员操作历史
```
// 增加人员时需要写入
member_opera_history
{
    _id: "", // string，自生成
    user_guid: "", // string 用户唯一标识
    member_id: 0, // string 成员唯一标识
    status: 0, // int 0新增，1删除
    create_time: 0, // int 时间戳 GMT
    create_ip: "", // string 当前操作ip
}
```
