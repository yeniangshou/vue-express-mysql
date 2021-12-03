<template>
  <div class="about">
    <h1>组件：{{msg}}</h1>
    <el-button @click="tip">测试 @Emit</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop  } from 'vue-property-decorator'

@Component({
})
export default class Home extends Vue {
    @Prop({default:'正在测试中。。。。。'}) 
    msg !:string

    @Emit()
    tip(){
        return '成功传值';
    }

    /*
        @Emit()
        tip(){
            return '成功传值';
        }

        tip(){
            this.$emit('这里默认@emit括号里面的值否则就取tip这个方法名用-连接，大写的时候')
        }
    */

}
</script>