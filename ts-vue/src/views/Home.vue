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
        <div>
            <el-button type="primary" @click="add">新增</el-button>
        </div>
       
        <about style="margin-left:20px;" :msg="msg" @tip="tip"></about>
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import about from './About.vue'


@Component({ // 这里将组件放在这里
  components: {
      about
  },
})
export default class Home extends Vue {
    // 这里相当于vue里面data数据
    form = {
        name:'',
        age:''
    }

    msg:string = '已经开始测试。。。'

    tableData:[] = [];

    ref: any = this.$refs['formName'];

    created(){ // 这里相当于created函数
        this.search();
    }

    // 这里是computed
    get formmsg(){
        return this.form.name + this.form.age
    }
    
    @Watch('formmsg') // 监听的值
    consoleFormsg(newVal:any, oldVal:any){ // 这里相当于放在method的方法
        console.log('formmsg',newVal, oldVal)
    }


    reset():void{ // 这里相当于method的方法
      this.ref.resetFields()
    }

     del(row: any){ // 这里相当于method的方法
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

    search(){ // 这里相当于method的方法
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

    add():void{ // 这里相当于method的方法
        this.$router.push({path:'/add'})
    }

    // 这里是接收emit方法的值
    tip(msg:string):void {
        this.$message({
            message: msg,
            type: 'success',
            duration: 2000
        });
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