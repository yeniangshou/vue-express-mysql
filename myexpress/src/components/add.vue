<template>
  <div class="hello">
   <el-form :form="form">
       <el-form-item label="名字：">
           <el-input v-model="form.name"></el-input>
       </el-form-item>
       <el-form-item label="年龄：">
           <el-input v-model="form.age"></el-input>
       </el-form-item>
       <el-button type="primary" @click="submit">提交</el-button>
   </el-form>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
            console.log('res',res)
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
