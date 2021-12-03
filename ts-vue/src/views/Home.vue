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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Home extends Vue {
    form = {
        name:'',
        age:''
    }

    tableData:[] = [];

    ref: any = this.$refs['formName'];

    created(){
        this.search();
    } 

    reset():void{
      this.ref.resetFields()
    }

     del(row: any){
        this.axios({
            method:'post',
            url:'/api/user/del',
            data:row
        }).then((res:any) =>{          
           this.$message({
                message: '删除成功！',
                type: 'success',
                duration: 2000
            });
            this.search();
        }).catch((error:any) =>{
            console.log(error)       //请求失败返回的数据
        })
    }

    search(){
        this.axios({
            method:'post',
            url:'/api/user/query',
            data:this.form
        }).then((res:any) =>{  
            this.tableData = res.data
        }).catch((error:any) =>{
            console.log(error)       //请求失败返回的数据
        })
    }

    add():void{
        this.$router.push({path:'/add'})
    }
}
</script>
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