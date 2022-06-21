<template>
	<div>
		<el-upload
			ref="upload_price"
			:multiple="multiple"
			:limit="9"
			:action="action"
			:headers="setHeader"
			name="file"
			:on-success="handlePictureSuccess"
			:show-file-list="false"
			:before-upload="beforeImageUpload"
			:data="uploadData"
			accept=".xlsx"
			:auto-upload="true"
		>
			<el-button size="small" type="primary">上传</el-button>
			<span class="ml10">xlsx格式，不可超过{{ tipSize }}</span>
		</el-upload>
	</div>
</template>

<script>
/**
import fileupload from '@src/components/main/ishare/component/FileUpload.vue'

 *  */

import { BASE_URL } from '@src/util/imgBaseUrl'
export default {
	data() {
		return {
			fileData: [],
			setHeader: {
				Authorization: localStorage.getItem('Authorization'),
			},
		}
	},
	props: {
		multiple: {
			type: Boolean,
			default: false,
		},
		limit: {
			type: Number,
			default: 1,
		},
		action: {
			type: String,
			default: BASE_URL + '/ishare-upload/uploadCmsBucket',
		},
		uploadData: {
			type: Object,
			default: () => {
				return {}
			},
		},
		form: {
			type: Object,
			default: () => {
				return {}
			},
		},
		filesize: {
			type: Number,
			default: () => {
				return 3
			},
		},
		tipSize: {
			type: String,
			default: '3M',
		},
	},
	methods: {
		beforeImageUpload(file) {
			this.form.fileUrl = ''
			const result = file.size / 1024 / 1024 <= this.filesize
			if (!result) {
				this.$message.error(`文件大小请勿超过${this.filesize}M!`)
			}
			this.form.fileName = file.name
			return result
		},

		// 上传成功
		handlePictureSuccess(res) {
			if (res.code === '0') {
				this.form.fileUrl = res.data
			} else {
				this.$message({
					message: res.message,
					type: 'error',
					duration: 5000,
				})
			}
			this.$refs.upload_price.clearFiles()
			this.$emit('filesuccess', this.form)
		},
	},
}
</script>
