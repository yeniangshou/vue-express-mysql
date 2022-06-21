<template>
	<div>
	    <div v-if="type == 'detail'">
            <el-image
                v-if="imageUrl"
                style="width: 100px; height: 100px"
                :src="imageUrl"
                :preview-src-list="[imageUrl]"
            >
            </el-image>
        </div>

        <!-- 上传图片  表格中的图片适用class-imgTableItemWH，默认用于表单 -->
        <el-upload
          v-else
          class="img-uploader imgFormWH"
          :class="{'imgSmallWH': imgSmallWH}"
          :action="uploadUrl"
          :data="uploadData"
          :show-file-list="false"
          :on-success="handlePictureSuccess"
          :before-upload="beforeImageUpload"
          :name="name"
        >
          <div class="ele-site-item-logo-empty">
            <el-image
              style="width: 100px; height: 100px"
              v-if="imageUrl"
              :src="imageUrl"
            />
            <span v-else class="img-uploader-icon"> 上传图片 </span>
          </div>
        </el-upload>
	</div>
</template>

<script>
/*
 引用该组件地址： import picupload from '@src/components/main/ishare/component/picUpload.vue'
*/
import { BASE_URL } from "@src/util/imgBaseUrl";
import MarketingService from "@service/ishareService/decorationManage.service";
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
    components: { VueUeditorWrap },
	data() {
		return {
            // 上传的图片url
            imageUrl:''
		}
	},
    props: {
        // 页面是新增、编辑、详情
        type:{
            type: String,
            default:'add'
        },
        // 详情、编辑传的url
        url:{
            type: String,
            default:''
        },
        // 限制图片大小，默认2M
        picLimt:{
            type: Number,
            default:2
        },
        // 表单或者数组对象图片的参数
        paramName:{
            type: String,
            default:''
        },
        // 数组索引
        tableitemindex:{
            type: Number,
            default: -1
        },
        // 图片上传
        name:{
            type: String,
            default: "file"
        },
        // 图片上传地址
        uploadUrl:{
            type: String,
            default: BASE_URL + '/ishare-upload/picUploadCatalog',
        },
        uploadData: {
            type: Object,
            default: ()=>{
                return  {
                    fileCatalog: 'ishare'
                }
            }
        },
        imgUrlPre: {
            type: String,
            default: 'https://pic.iask.com.cn/ishare/',
        },
        status:{ // 1 代表直接返回的url,2代表上传图片返回key拼接
            type: String,
            default:"2"
        },
        imgSmallWH:{
            type: Boolean,
            default: false
        }
    },
    mounted(){
        // 刚开始的时候加载图片-在详情编辑的时候
        if(this.status ==2){
            this.imageUrl = this.url?(this.imgUrlPre+this.url) :'';
        } else {
            this.imageUrl = this.url;
        }
      
    },
	methods: {
		// 上传成功提示
		handlePictureSuccess(res, file) {
			if (res.code === '0') {
                if(this.status ==2){
                     this.imageUrl = this.imgUrlPre+ res.data.picKey;
                      this.$emit('getImageUrl',{paramName:this.paramName, url:  res.data.picKey, tableitemindex: this.tableitemindex})
                } else {
                    this.imageUrl = res.data;
                    this.$emit('getImageUrl',{paramName:this.paramName, url:  res.data, tableitemindex: this.tableitemindex})
                }
               
			} else {
				this.$message({
					message: res.message,
					type: 'error',
					duration: 2000,
				})
			}
		},
        // 上传图片检查
        beforeImageUpload(file){
            const testmsg = /^image\/(JPG|PNG|jpg|png|jpeg)$/.test(file.type);
			const isLt3M = file.size / 1024 / 1024 < this.picLimt;
			if (!testmsg) {
				this.$message({
					message: '上传图片格式不对!',
					type: 'warning',
					duration: 2000,
				})
				return false
			}

			if (!isLt3M) {
				this.$message({
					message:`图片超过${this.picLimt}M，不可上传！`,
					type: 'warning',
					duration: 2000,
				})
				return testmsg && isLt3M
			}
        }
	},
}
</script>
<style scoped>

.img-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-uploader .el-upload:hover {
  border-color: #409eff;
}

.img-uploader-icon {
  font-size: 12px;
  line-height: 12px;
  color: #cccccc;
}

.imgFormWH {
    width: 100px;;
    height: 100px;;
}

.imgSmallWH {
    width: 60px;;
    height: 60px;;
}
</style>
