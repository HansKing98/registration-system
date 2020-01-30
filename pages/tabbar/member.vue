//我在做这个文件，我的群昵称是AHello  
<template>
	 <view>			
			<view class="tag">
				<uni-tag style="margin: 5upx 5upx;" v-for="(item,index) in tags" :key="index"  @click="tagQuery(index)" :text="item.text" :type="item.type" ></uni-tag>
			</view>
			<view class="flex-item flex-item-V uni-bg-blue">
				<uni-list>
					<uni-list-item v-for="(item,index) in members" :key="index"  @click="openDetail(item.id_card)" :title="item.name" :note="item.address"></uni-list-item>
				</uni-list>
			</view>
	  </view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	export default {
		components: {
			uniList,
			uniListItem,
			uniTag
		},
		data() {
			return {
               members: [{"id_card":"1","name":"张三1","address": "陕西-西安-雁塔区"},{"id_card":"2","name":"张三2","address": "陕西-西安-雁塔区"},{"id_card":"3","name":"张三3","address": "陕西-西安-雁塔区"}],
			   tags:[{"text":"所有","type": "default"},
			   {"text":"普通","type": "primary"},
			   {"text":"隔离","type": "success"},
			   {"text":"发烧","type": "success"},
			   {"text":"疑似","type": "success"},
			   {"text":"确诊","type": "warning"},
			   {"text":"死亡","type": "error"}]
			}
		},
		onLoad() {
			//this.loadData();
		},
		methods: {
			loadData() {
				uni.showLoading({
					title: "加载中..."
				});

				uniCloud.callFunction({
					name: 'member-list',
					data: {},
					success: (res) => {						
						this.fillData(res);
					},
					fail: (err) => {
						uni.hideLoading();
					},
					complete: (c) => {
						uni.hideLoading();
					}
				})
			},
			fillData(data) {
				this.members=data;
			},
			//明细
			openDetail:function(id_card){
				alert(id_card);
				this.uniSkip.navigateTo({
				url:'',
				data:id_card
			   })
			},
		    //标签搜索
			tagQuery:function(e){
				
			}
		}
	}
</script>

<style>
  .tag{
	  display: flex;
	  flex-direction: row;
	  flex-wrap:wrap; 
	  padding: 10px 10px;
  }
</style>
