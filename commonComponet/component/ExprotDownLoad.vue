<template>
	<div>
		<div>
			<el-button type="primary" @click="expertInfo">
				导出
			</el-button>
			<el-button type="primary" @click="checkDownload">
				查看下载
			</el-button>
		</div>
		<!-- 查看下载-->
		<downloadPop :type="type" ref="downloadDetail"> </downloadPop>
	</div>
</template>

<script>
/*
 引用该组件地址： import exprotdownLoad from '@src/components/main/ishare/component/ExprotDownLoad.vue'
*/
import downloadPop from './downloadPop'
import MarketingService from '@service/ishareService/marketing.service';

export default {
	components: { downloadPop },
	data() {
		return {}
	},
	props: {
		// 查看下载参数
		type: {
			type: String,
			default: 'add',
		},
        params:{
            type: Object,
            default:()=>{
                return {
                }
            }
        },
        url:{
            type: String,
            default:''
        }

	},
	methods: {
		expertInfo() {
			MarketingService.exportFileXls(this.params, this.url).then((res) => {
				if (res.code === '0') {
					this.$refs.downloadDetail.require()
					this.$message({
						message: res.message,
						type: 'success',
						duration: 2000,
					})
				} else {
					this.$message({
						message: res.message,
						type: 'warning',
						duration: 2000,
					})
				}
			})
		},
        checkDownload() {
			this.$refs.downloadDetail.popModule();
		},
	},
}
</script>
<style scoped>
</style>
