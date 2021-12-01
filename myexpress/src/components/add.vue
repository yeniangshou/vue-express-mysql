<template>
  <div class="add">
    <h3 style="margin-bottom: 40px;"> 向mySql表user注入一条新数据： </h3>
   <el-form :form="form" style="width:400px;" >
       <el-form-item label="名字：">
           <el-input v-model="form.name" style="width:300px;"></el-input>
       </el-form-item>
       <el-form-item label="年龄：">
           <el-input v-model="form.age" style="width:300px;"></el-input>
       </el-form-item>
       <el-form-item >
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="primary" @click="cancle">返回</el-button>
       </el-form-item>
   </el-form>

  </div>
</template>

<script>
export default {
  name: 'add',
  data () {
    return {
     form:{
         name:'',
         age:''
     }
    }
  },
  methods:{
      submit(){
        this.$axios({
            method:'post',
            url:'/api/user/addUser',
            data:this.form
        }).then((res) =>{
            if(res.data.code == '0'){
                this.$message({
                    message: '新增成功！',
                    type: 'success',
                    duration: 2000
                });
                this.$router.push({path:'/'});
            } else {
                this.$message({
                    message: '新增失败！',
                    type: 'warning',
                    duration: 2000
                });
            }
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        })
    },
    cancle(){
        this.$router.push({path:'/'});
    }
  }
}
</script>


<style scoped>
.add {
    padding:20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
