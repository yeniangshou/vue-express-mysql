<template>
	<div>
		<vue-ueditor-wrap
            @ready="editorReady"
			@beforeInit="addCustomButtom(1)"
			id="ueditor"
			style="width: 600px; display: inline-block"
			v-model="richText"
			:config="myConfig"
		></vue-ueditor-wrap>
        <el-color-picker
            class="picker"
            style="margin-left: -180px"
            @change="myColorChange"
            ref="picker1"
            id="picker1"
            ></el-color-picker>
        <input
            type="file"
            accept="image/*"
            ref="editeUpload"
            id="editeUpload"
            class="el-upload__input"
            />
	</div>
</template>

<script>
/*
 引用该组件地址： import richtextcom from '@src/components/main/ishare/component/richText.vue'
*/
import MarketingService from "@service/ishareService/decorationManage.service";
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
    components: { VueUeditorWrap },
	data() {
		return {
            richText:'',
            editor:'',
			myConfig: {
				// 编辑器不自动被内容撑高
				autoHeightEnabled: false,
				// 初始容器高度
				initialFrameHeight: 280,
				// 初始容器宽度
				initialFrameWidth: '100%',
				// 允许的最大字符数
				maximumWords: '',
				// 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
				// serverUrl: 'http://35.201.165.105:8000/controller.php',
				// UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
				UEDITOR_HOME_URL: '/UEditor/',
				toolbars: [
					[
						'source', // 源码
						'fontfamily', // 字体
						'fontsize', // 字号
						'bold', // 加粗
						'italic', // 斜体
						'underline', // 下划线
						'forecolor', // 颜色板
						'strikethrough', // 删除线
						'justifyleft', // 居左对齐
						'justifyright', // 居右对齐
						'justifycenter', // 居中对齐
						'justifyjustify', // 两端对齐
						'link', // 超链接
						'spechars', // 特殊字符
						// 'insertimage', //多图上传m
					],
				],
			},
		}
	},
    props: {
        content:{
            type: String,
            default:''
        },
        maximumWords:{
            type: Number,
            default: 10000
        },
    },
    mounted(){
        this.content = this.richText || '';
        this.myConfig.maximumWords = this.maximumWords;
    },
	methods: {
		// 自定义富文本按钮
		addCustomButtom() {
			const that = this
			UE.registerUI('图片上传', function(editor, uiName) {
				// 注册按钮执行时的command命令，使用命令默认就会带有回退操作
				editor.registerCommand(uiName, {
					execCommand: function() {
						that.$refs.editeUpload.click()
						that.$refs.editeUpload.onchange = function(e) {
							const file = that.$refs.editeUpload.files[0]
							const formData = new FormData()
							const timer = new Date().getTime()
							formData.append('file', file)
							formData.append('fileKey', timer)
							that.$refs.editeUpload.setAttribute('type', 'text')
							MarketingService.uploadPicture(formData).then(
								(res) => {
									that.$refs.editeUpload.setAttribute(
										'type',
										'file'
									)
									const url =
										'http://pic.iask.com.cn/' + res.data.key
									editor.setContent(
										"<img width='100%' height='auto' src=" +
											url +
											" alt=''>",
										true
									)
								}
							)

							if (window.FileReader) {
								const reader = new FileReader()
								reader.readAsDataURL(file)
								// 监听文件读取结束后事件
								reader.onloadend = function(e) {}
							}
						}
					},
				})
				// 创建一个button
				const btn = new UE.ui.Button({
					// 按钮的名字
					name: uiName,
					// 提示
					title: uiName,
					// 添加额外样式，指定icon图标，这里默认使用一个重复的icon
					cssRules: 'background-position:-728px -78px',
					// 点击时执行的命令
					onclick: function() {
						// 这里可以不用执行命令,做你自己的操作也可
						editor.execCommand(uiName)
					},
				})

				// 因为你是添加button,所以需要返回这个button
				return btn
			});


            UE.registerUI("自定义颜色", function (editor, uiName) {
                // 注册按钮执行时的command命令，使用命令默认就会带有回退操作
                editor.registerCommand(uiName, {
                    execCommand: function () {
                    that.$refs.picker1.showPicker = !that.$refs.picker1.showPicker;
                    },
                });
                // 创建一个button
                const btn = new UE.ui.Button({
                    // 按钮的名字
                    name: uiName,
                    // 提示
                    title: uiName,
                    // 添加额外样式，指定icon图标，这里默认使用一个重复的icon
                    // cssRules: "background-position:-728px -78px",
                    // cssRules:"width:600px;height:300px;background-image: url('../../../../assets/use.jpg')",
                    cssRules: "background-position:-760px -2px;",
                    // 点击时执行的命令
                    onclick: function () {
                    // 这里可以不用执行命令,做你自己的操作也可
                    editor.execCommand(uiName);
                    },
                });

                // 因为你是添加button,所以需要返回这个button
                return btn;
                });
		},
        editorReady(editorInit) {
            this.editor = editorInit;
        },
        myColorChange(color) {
            this.editor.execCommand("forecolor", color); //设置字体颜色
        },
	},
}
</script>
