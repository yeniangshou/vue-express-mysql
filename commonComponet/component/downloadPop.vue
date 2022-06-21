<template>
    <div>
        <el-dialog title="下载列表" :visible.sync="downloadVisible" >
          <div style="padding-bottom:10px"><el-button  @click="refreash"> 刷 新 </el-button></div>
          <el-table border :data="tableData" max-height="400px" >
            <el-table-column prop="name" label="文件名"  align="center"></el-table-column>
            <el-table-column  label="导出时间"  align="center">
              <template slot-scope="scope">
                <span>{{scope.row.createTime|timeToDate}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="执行状态"  align="center">
              <template slot-scope="scope">
				       <!-- 0:执行中 1:成功 2：失败 -->
                <span>{{scope.row.status==0?'执行中':scope.row.status==1?'成功':scope.row.status==2?'失败':''}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="creatorName" label="操作人昵称"  align="center">
            </el-table-column>
            <el-table-column  label="操作" align="center">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status==1"   type="text" @click="download(scope.row.url)">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
		  	<div class="page-column" v-show="totalSize >= 0">
				<el-pagination
					@size-change="changePageSize"
					@current-change="changePage"
					:current-page="currentPage"
					:page-sizes="[10, 20, 50, 100]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="totalSize"
				></el-pagination>
			</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="downloadVisible = false">取 消</el-button>
                <el-button type="primary" @click="downloadVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import _NgUtil from '@src/util/base/_NgUtil';
export default {
  components: {},
   props: ['type'],
  data() {
    return {
      listParam: {
        func: this.type, // 0：风控-审核管理-待审核 1：风控-审核管理-已审核
        uid: localStorage.getItem('userId')
      },
	  downloadVisible: false,
		// 数据总数
		totalSize: 0,
		// 分页参数
		currentPage: 1,
		// 分页参数
		pageSize: 20,
      tableData: []
    };
  },
  created() {

  },
  methods: {
    popModule() {
    this.downloadVisible = true;
    this.require();
	},
  // 获取列表
   /** *
     * currentPage	integer	必须页数 从1开始
      func	string	非必须 所属模块 0：风控-审核管理-待审核 1：风控-审核管理-已审核
      pageSize	integer	必须 每页数量 大于1	format: int32
      uid	string	非必须 用户ID
     */
	require() {
		const { currentPage, pageSize } = this;
		const params = {
		...this.listParam,
		currentPage,
		pageSize
    };
		this.$axios
		.post('/market/export/taskList', params)
		.then(res => {
			if (res.data.code == 0) {
        this.totalSize = res.data.data.totalSize;
        this.tableData = res.data.data.rows;
			} else {
        this.tableData = [];
      }
		});
	},
	// 刷新
	refreash() {
		this.currentPage = 1;
		this.require();
	},
	// 下载
	download(data) {
		const a = document.createElement('a');
		a.setAttribute('download', '');
		a.setAttribute('href', data);
		a.click();
	},
	// 改变页码
    changePage(currentPage) {
        this.currentPage = currentPage;
        this.require();
    },
    // 改变每页显示数量
    changePageSize(size) {
      this.currentPage = 1;
      this.pageSize = size;
      this.require();
    },
    // 提示弹框
    confirmCommit(msg) {
      return this.$confirm(msg, '提示', {
        confirmButtonText: '确 认',
        cancelButtonText: '取 消',
        type: 'warning'
      });
    }
  }
};
</script>

<style scoped>
  .labelItem{
    display: block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 5px 10px;
    background-color: #ecf5ff;
    border-color: #d9ecff;
    font-size: 12px;
    color: #666;
  }
</style>
