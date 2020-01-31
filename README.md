项目负责人：DCloud_UNI_GSQ

## 人员信息字段


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
- 入驻时间：
- 离开时间：
- 状态：
	普通、居家隔离、发烧、疑似、确诊、死亡
	每个状态对应的发生时间，如隔离时间、确诊时间、死亡时间
- 是否接触过确诊人员、对方姓名和联系方式
- 是否接触过疑似人员、对方姓名和联系方式
- 是否接触过来自疫区的人员、对方姓名和联系方式
- 备注

允许配人与人之间的关系，如夫妻（低优先）

## 界面
tab：列表、图表、+、搜索、我的

本软件必须登录，不登录无法使用。

### 列表
主屏是登记人员列表，点击人员item进详情，详情里每个人的电话可以点击拨叫

列表的筛选项包括：所有、普通、居家隔离、发烧、疑似、确诊、死亡

列表主标题为姓名、副标题为现住址

<!-- 列表顶端有搜索按钮 -->
### 图表
显示按时间为横轴的曲线，表达隔离、发烧、疑似、确诊、死亡的曲线
### +
表单，按数据库字段填写。
为快速填写，能选的就选，输入框能做combox的就做。

姓名和联系电话是必填项。

联系电话等信息做前端有效性校验。

保存入库时，除了表单填写内容，还需要在数据库里同时存入操作人员的姓名、id、操作时间、操作ip。

### 搜索
可以按人名、状态搜索，搜索结果同列表
### 我的
操作员登陆、登出、修改密码。支持微信登陆

初始账户，可在uniCloud的web控制台直接操作云数据库植入。有精力后续可以再做一个可视化的新增、删除账户的管理界面。

## 请你填
门卫在手机上，点击“请你填”，生成一个二维码，让外来人员扫码，打开h5页面，在页面里自助填写，完毕后回传，经发起的门卫确认，可以入库。