<template>
  <div class="wrap">
   <el-form :model="form"  ref="ruleForm" style="width: 800px" inline>
       <el-form-item label="名字：" prop="name">
           <el-input v-model="form.name" style="width:200px;" clearable></el-input>
       </el-form-item>
       <el-form-item label="年龄："  class="ml30" prop="age"> 
           <el-input v-model="form.age" style="width:200px;" clearable></el-input>
       </el-form-item>
        <el-form-item class="ml30">
            <el-button type="primary"  class="ml30" @click="search">搜索</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
   </el-form>

    <div class="btn-warp">
        <el-button type="primary" @click="add">新增</el-button>
    </div>


    <el-table
      :data="tableData"
      stripe
      border
      style="width: 80%">
      <el-table-column
        prop="name"
        label="名字"
        >
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
       >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>

      <el-table-column
        label="操作">
            <template slot-scope="scope">
                <el-button type="primary" @click="del(scope.row)">删除</el-button>
            </template>
      </el-table-column>
    </el-table>

     <!-- <el-pagination
        style="display: inline-block; margin-top:30px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :page-sizes="[20, 50, 100, 200, 500, 1000]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize"
      ></el-pagination> -->
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
     form:{
        name:'',
        age:'',
        pageSize:10,
        currentPage:1
     },
     tableData:[],
     totalSize:0
    }
  },
  created(){
    this.search();
  },
  methods:{
    reset(){
       this.$refs['ruleForm'].resetFields()
    },
    del(row){
        console.log('row:',row)
        this.$axios({
            method:'post',
            url:'/api/user/del',
            data:row
        }).then((res) =>{          
           this.$message({
                message: '删除成功！',
                type: 'success',
                duration: 2000
            });
            this.search();
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        })
    },
    search(){
        this.$axios({
            method:'post',
            url:'/api/user/query',
            data:this.form
        }).then((res) =>{  
            this.tableData = res.data
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        })
    },
    add(){
        this.$router.push({path:'/add'})
    },
    // 改变表格显示数据条数
    handleSizeChange(val) {
        this.form.pageSize = val;
        this.getTableList();
    },
    // 改变表格当前页
    handleCurrentChange(val) {
        this.form.currentPage = val;
        this.getTableList();
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
    padding: 20px;;
}

.ml30 {
    margin-left:30px;
}

.el-table--border td{
   border-right: none;
}
 
.el-table::before{
  height:0;
}
 
.base .el-table__body{
  border-top: 1px solid #CCCCCC;
}

.btn-warp {
    margin-bottom: 20px;
    display: flex
}
</style>
