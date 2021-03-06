项目负责人：DCloud_UNI_GSQ

项目预览地址：[wlry.m3w.cn](https://wlry.m3w.cn)。此地址为测试体验地址，具体某单位上线时，需要单独部署。

本项目是基于木兰宽松许可证的开源项目，代码全部开源，开发者可自由使用其中的代码，自己部署相关的系统。

## 项目运行和部署说明

本项目需要HBuilderX 2.5.8以上版本才能运行。

项目需要注册和开通uniCloud，因阿里云审核要求，需要实名认证。

拉取项目源码后，对cloudfunctions目录点右键，选择你的服务空间。如果没有服务空间，需要创建，创建时会引导登录和注册uniCloud。

配好服务空间后，请根据项目下的`db.md`文件，在你的云数据库中创建相应的表。具体方式是对cloudfunctions目录点右键，打开uniCloud web控制台，在里面的云数据库界面点击新建表，表名里把`db.md`涉及的表名都创建一遍。

对每个云函数点右键，上传并部署到你的服务空间中。

修改 manifes.json 中的 DCloud_AppID 为自己的，再修改 main.js 中 云空间的 spaceId、clientSecret 为自己的（在 uniCloud web 控制台复制）。

因为项目中使用了几个npm库，需要在项目根目录下，终端界面，执行`npm i`，安装node_modules。

最后，可以运行了。如果是win版，可以直接运行在内置浏览器。如果是mac版，内置浏览器也有跨域问题，需要运行到小程序模拟器或app中，或者给mac的外部浏览器安装跨域插件。

运行起来的系统，需要登陆。在云函数`create-user`目录上右键点击上传并测试，会在user表里插入以下操作员信息。

```
{
	username: 'admin',
	password: '123456'
}
```

//数据库内存储的是加密之后的密码，登录依然使用123456作为密码

然后就可以在前端界面里，用上述账户密码登陆了。

**注意**

- 实际部署时切记更换`cloudfunctions-module/src/utils/constants.js`内的`passSecret`，更换之后重新编译上传云函数，导入操作员信息

## 人员信息字段说明


- 姓名
- 身份证件名称
- 证件号码
- 年龄
- 性别
- 照片
- 联系电话
- 是否来自武汉
- 是否来自湖北
- 来自地区
- 交通工具：
    *列车号、航班号、自驾车牌号
- 体温：
	温度、检测时间
- 现住址：
	街道、楼号、房号
- 到访单位：
- 到访单位联系人：
- 入驻时间：
- 离开时间：
- 状态：
	普通、居家隔离、发烧、疑似、确诊、死亡
	每个状态对应的发生时间，如隔离时间、确诊时间、死亡时间
- 是否接触过确诊人员、对方姓名和联系方式
- 是否接触过疑似人员、对方姓名和联系方式
- 是否接触过来自疫区的人员、对方姓名和联系方式
- 备注

更详细的字段说明，见源码根目录下的`db.md`文档。

## 界面
tab：列表、图表、+、搜索、我的

本软件必须登录，不登录无法使用。但操作员登陆后，可以在软件内看到一个二维码，外来人员可以扫描此码，打开一个H5页面，自助填写。

### 列表
主屏是登记人员列表，点击人员item进详情，详情里每个人的电话可以点击拨叫

如果列表中的人员，含有车次信息，会自动去危险车次数据源查询，验证外来人员乘坐的车次、航班，是否是国家通告的已发现确诊人员的车次。

列表主标题为姓名、副标题为现住址


### 图表
显示按时间为横轴的曲线，表达隔离、发烧、疑似、确诊、死亡的曲线

### +
表单，按数据库字段填写。

姓名、联系电话是必填项。如部署时各单位有定制需求，比如删减一些字段、改一些字段为必填项，可在开源项目基础上自行修改。

保存入库时，除了表单填写内容，还需要在数据库里同时存入操作人员的姓名、id、操作时间、操作ip。

### 搜索
可以按人名、手机号、登记时间来查询外来人员登记记录，搜索结果同列表。

搜索结果可以导出，导出格式是csv，可以用excel打开。如果需要对导出的字段删减。自行在开源代码中删减。

### 我的
操作员登陆、登出、修改密码。

本系统不支持注册。操作员账户由管理员通过云函数创建，然后每个操作员登陆后，可自行修改密码。

如忘记密码，请管理员在云函数中重置其密码。

云函数`create-user`目录上右键点击上传并测试。

如开发者有精力，欢迎贡献一个管理员可视化创建用户、重置用户密码的界面。


## 请外来人员自助填写。
操作员可以登陆后，可以在界面上直接登记。也可以点tab中的”我的“，会展现一个二维码。外来人员可以扫描此码，自助填写。