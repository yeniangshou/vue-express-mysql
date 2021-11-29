<template>
  <div class="wrap">
   <el-form :form="form" style="width: 800px" inline>
       <el-form-item label="名字：">
           <el-input v-model="form.name" style="width:200px;"></el-input>
       </el-form-item>
       <el-form-item label="年龄：">
           <el-input v-model="form.age" style="width:200px;"></el-input>
       </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
   </el-form>

    <div>
        <el-button type="primary" @click="add">新增</el-button>
    </div>


    <el-table
      :data="tableData"
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
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>


     <el-pagination
        style="display: inline-block; margin-top:30px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :page-sizes="[20, 50, 100, 200, 500, 1000]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize"
      ></el-pagination>
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

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
