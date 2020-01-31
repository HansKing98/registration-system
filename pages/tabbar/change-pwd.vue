<template>
	<view class="e-container">
		<form @submit="formSubmit" class="login-form">
			<view class="section">
				<input name="oldpwd" placeholder="原密码"  />
			</view>
			<view class="section">
				<input name="newpwd" type="password" placeholder="新密码"  />
			</view>
			<view class="section">
				<input name="confirmpwd" type="password" placeholder="确认新密码"  />
			</view>
			<view class="btn-area" hover-class="e-hover-btn">
				<button formType="submit" class="login-btn" type="primary">确认</button>
			</view>
		</form>
	</view>
</template>

<script>
	let _self;
	export default {
		data() {
			return {
				userId:'',
				userName:'',
			};
		},
		onLoad: function(params) {
			//TODO:此次根据登录存储用户信息需要调整
			_self = this;
			uni.getStorage({
				key: 'userId',
				success: function(res) {
					_self.userId = res.data
				}
			});
			uni.getStorage({
				key: 'userName',
				success: function(res) {
					_self.userName = res.data
				}
			});
		},
		methods: {
			formSubmit: function(e) {
				let formData= e.detail.value;	
			    let flag=this.validation(formData);
				if(!flag){
					return false;
				}
				var dataObj = {
					"OldPwd": formData.oldpwd,
					"NewPwd": formData.newpwd,
					"Name": _self.userName,
					 userId: _self.userId
				}
				//提交服务器
			},
		    validation:function(_formData){
				if(_formData.oldpwd==""){
					uni.showToast({
						title: '请输入原密码！',
						icon: 'none',
						duration: 2000
					});
					return false;
				}else{
					if(_formData.oldpwd.length<6){
						uni.showToast({
							title: '密码不能少于6位！',
							icon: 'none',
							duration: 2000
						});
						return false;
					}
				}
				if(_formData.newpwd==""){
					uni.showToast({
						title: '请输入新密码！',
						icon: 'none',
						duration: 2000
					});
					return false;
				}else{
					if(_formData.newpwd.length<6){
						uni.showToast({
							title: '密码不能少于6位！',
							icon: 'none',
							duration: 2000
						});
						return false;
					}
				}
				if(_formData.confirmpwd==""){
					uni.showToast({
						title: '请输入确认密码！',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				if(_formData.newpwd!=_formData.confirmpwd){
					uni.showToast({
						title: '新密码和确认密码不匹配！',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				return true;
			}
		}
	}
</script>

<style scoped="">
	.section {
		margin: 40upx;
		border-bottom: 2upx solid #eee;
	}

	.btn-area {
		margin: 60upx 40upx 0upx 40upx;
	}
</style>
