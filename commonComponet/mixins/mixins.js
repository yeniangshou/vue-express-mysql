import MarketingService from '@service/ishareService/decorationManage.service';
import { timeToDate } from '@src/util/date.js'
import { getCurrentTime, formatDate } from '@src/util/date';
import { resolve } from 'core-js/fn/promise';
/*
 ** 上传文件、销售站点、终端、分页、按钮权限、确认提示框
 */
const mixins = {
    data() {
        return {
            loading: false, // table加载框
            siteOptiion: [], // 销售站点
            termianOptiion: [], // 可售终端
            limitChannelOption: [], //禁售渠道
            userId: '', // 用户ID
            userName: '', //  用户名称
            params: {
                pageSize: 10,
                currentPage: 1
            },
            totalSize: 0, // 总共分页
            setHeader: {
                Authorization: localStorage.getItem('Authorization')
            },
            sellEnvOptiion: [
                // 1：开发环境 2：测试环境 3：预发环境 4：生产环境
                {
                    value: 3,
                    label: '预发环境'
                },
                {
                    value: 4,
                    label: '生产环境'
                },
                {
                    value: 2,
                    label: '测试环境'
                },
                {
                    value: 1,
                    label: '开发环境'
                }
            ],
        }
    },
    created() {
        this.userId = localStorage.getItem('userId');
        this.userName = localStorage.getItem('userName');
    },
    filters: {
        tableFilter(value, type) {
            switch (type) {
                case 'price':
                    value = value - 0
                    return (value / 100).toFixed(2)
                        // 1-下架 2-上架 3-删除 4-下架删除 5-上架删除 
                case 'status':
                    if (value === 1) return '下架';
                    if (value === 2) return '上架';
                    if (value === 3) return '删除';
                    if (value === 4) return '下架转删除';
                    if (value === 5) return '上架转删除';
                case 'executionStatus':
                    if (value == 0) return '执行中';
                    if (value == 1) return '成功';
                    if (value == 2) return '失败';
                case 'time':
                    if (typeof value === 'object' || value < 1) {
                        return '';
                    } else if (typeof value === 'number' && value > 0) {
                        const { year, month, date, hour, minute, second } = formatDate(value);
                        return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
                    } else {
                        return '';
                    }
                    break;
                default:
                    return '';
                    break;
            }
        }
    },
    methods: {
        getCurrentTime,
        timeToDate,
        // 获取销售站点
        getSite() {
            MarketingService.dictionaryData({ code: 'site' }).then(res => {
                if (res.code == '0') {
                    this.siteOptiion = res.data.map(item => {
                        const obj = {};
                        obj.value = item.pcode;
                        obj.label = item.pname;
                        return obj;
                    });
                }
            });
        },
        // 不限
        getSite1() {
            MarketingService.dictionaryData({ code: 'site' }).then(res => {
                if (res.code == '0') {
                    this.siteOptiion = res.data.map(item => {
                        const obj = {};
                        obj.value = item.pcode;
                        obj.label = item.pname;
                        return obj;
                    });
                    this.siteOptiion.push({
                        label: '不限',
                        value: "-1"
                    });
                }
            });

        },

        // 获取终端
        getTerminal() {
            return new Promise((resolve, reject)=>{ 
                MarketingService.dictionaryData({ code: 'terminal' }).then(res => {
                    if (res.code == '0') {
                        this.termianOptiion = res.data.map(item => {
                            const obj = {};
                            obj.value = item.pcode;
                            obj.label = item.pname;
                            return obj;
                        });
                        resolve(this.termianOptiion)
                    } else {
                        reject([])
                    }
                })  
            });
           
        },
        // 获取终端，增加不限终端
        getTerminal1(value = '-1') {
            MarketingService.dictionaryData({ code: 'terminal' }).then(res => {
                if (res.code == '0') {
                    this.termianOptiion = res.data.map(item => {
                        const obj = {};
                        obj.value = item.pcode;
                        obj.label = item.pname;
                        return obj;
                    });
                    this.termianOptiion.push({ label: '不限', value: value });
                }
            });
        },
        // 获取终端，增加不限终端和暂不销售
        getTerminal2(v1 = '-1', v2 = '998') {
            MarketingService.dictionaryData({ code: 'terminal' }).then(res => {
                if (res.code == '0') {
                    this.termianOptiion = res.data.map(item => {
                        const obj = {};
                        obj.value = item.pcode;
                        obj.label = item.pname;
                        return obj;
                    });
                    this.termianOptiion.push({ label: '不限', value: v1 }, { label: '暂不销售', value: v2 });
                }
            });
        },
        // 获取禁售渠道
        getLimitChannel() {
            MarketingService.dictionaryData({ code: "channelPartner" }).then(
                (res) => {
                    if (res.code == "0") {
                        this.limitChannelOption = res.data.map((item) => {
                            const obj = {};
                            obj.value = item.pcode;
                            obj.label = item.pname;
                            return obj;
                        });
                    }
                }
            );
        },
        // 获取禁售渠道，增加全部
        getLimitChannel2() {
            MarketingService.dictionaryData({ code: "channelPartner" }).then(
                (res) => {
                    if (res.code == "0") {
                        var limitChannelOptions = [];
                        limitChannelOptions.push({
                            label: "全部",
                            value: "",
                        });
                        limitChannelOptions.push({
                            label: "无",
                            value: "-1",
                        });
                        this.limitChannelOption = res.data.map((item) => {
                            const obj = {};
                            obj.value = item.pcode;
                            obj.label = item.pname;
                            return obj;
                        });
                        this.limitChannelOption = limitChannelOptions.concat(this.limitChannelOption);
                    }
                }
            );
        },
        // 改变表格显示数据条数
        handleSizeChange(val) {
            this.params.pageSize = val;
            this.getTableList();
        },
        // 改变表格当前页
        handleCurrentChange(val) {
            this.params.currentPage = val;
            this.getTableList();
        },
        // 搜索
        search() {
            this.params.currentPage = 1;
            this.getTableList();
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 打开新链接窗口
        newTab(url) {
            const a = document.createElement('a');
            a.setAttribute('target', '_blank');
            a.setAttribute('href', url);
            a.click();
        },
        // 是否有按钮权限
        isAuthority(params) {
            const btnAuthorityList =
                (JSON.parse(localStorage.getItem('user_info_key')).ext &&
                    JSON.parse(localStorage.getItem('user_info_key')).ext
                    .btnAuthorityList) || [];
            if (btnAuthorityList.length > 0) {
                return btnAuthorityList.indexOf(params) != -1;
            } else {
                return false;
            }
        },
        // 数组对象去重
        filterArr(arr, key) {
            let hash = {};
            return arr.reduce((ss, item) => {
                hash[item[key]] ? '' : (hash[item[key]] = true && ss.push(item));
                return ss;
            }, []);
        },
        // 控制显示上传条
        handleChange(file, fileList) {
            this.fileData = fileList.slice(-1);
        },
        // 上传之前
        beforeImageUpload(file) {
            const _index = file.name.lastIndexOf('.');
            const fileForm = file.name.slice(_index + 1, file.name.length);
            if (fileForm != 'xls' && fileForm != 'xlsx') {
                this.$message({
                    message: '文件格式必须是excel (.xls,xlsx)！',
                    type: 'warning',
                    duration: 3000
                });
                return false;
            }
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                this.$message.error('上传文件大小不能超过 5MB!');
                return false;
            }
        },
        // 上传成功
        handlePictureSuccess(res, file) {
            if (res.code === '0') {
                this.form.fileUrl = res.data;
                this.$message({
                    message: '上传成功',
                    type: 'success',
                    duration: 2000
                });
                // 在请求数据
            } else {
                this.$message({
                    message: res.message,
                    type: 'error',
                    duration: 5000
                });
            }
        },
        // 查看页面权限
        isShowPage(authorityInfo){
            let showPageFlag = this.isAuthority(
                authorityInfo
            )
            if (! showPageFlag) {
                this.$message({
                    message: `暂无查看此页面权限`,
                    type: 'error',
                    duration: 2000,
                })
                this.$router.go(-1)
                return false
            }
        },
        // 数字转为字符串
        intFormatStr(ary = []) {
            return ary.map(item => '' + item)
        },
        // 提示弹框-非html
        confirmCommit(msg) {
            return this.$confirm(msg, '提示', {
                confirmButtonText: '确 认',
                cancelButtonText: '取 消',
                type: 'warning'
            });
        },
        // 提示弹框-html 类
        confirmCommitHtml(msg) {
			return this.$confirm(msg, {
				dangerouslyUseHTMLString: true,
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
		},
        //提示消息
        showMessage(message = '', type = 'warning', duration = 2000) {
            this.$message({
                message: message,
                type: type,
                duration: 2000,
            });
        },
        // 数组是否重复
		isRepeat(ary) {
			return Array.from(new Set(ary)).length < ary.length
		},
        // 表头添加*
		addRedStar(h, { column }) {
			return [
				h('span', { style: 'color: red' }, '*'),
				h('span', ' ' + column.label),
			]
		},
    }
}

export { mixins }