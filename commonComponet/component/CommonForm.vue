<template>
  <!--是否行内表单-->
  <el-form
    :inline="inline"
    :model="form"
    ref="form"
    :label-width="labelwidth"
    :rules="rules"
  >
    <!--标签显示名称-->
    <el-form-item
      v-for="item in formLabel"
      :key="item.model"
      :label="item.label"
      :prop="item.model"
    >
      <!--根据type来显示是什么标签-->
      <el-input
        v-model="form[item.model]"
        :placeholder="'请输入' + item.label"
        :disabled="item.disabled"
        v-if="item.type === 'input'"
        :key="item.label"
        @input="change($event)"
        clearable
      ></el-input>
      <el-select
        v-model="form[item.model]"
        placeholder="请选择"
        :disabled="item.disabled"
        v-if="item.type === 'select'"
      >
        <!--如果是select或者checkbox 、Radio就还需要选项信息-->
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-switch
        v-model="form[item.model]"
        v-if="item.type === 'switch'"
        :disabled="item.disabled"
      ></el-switch>
      <el-date-picker
        v-model="form[item.model]"
        type="date"
        :disabled="item.disabled"
        placeholder="选择日期"
        v-if="item.type === 'date'"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-date-picker
        v-if="item.type === 'datetime'"
        v-model="form[item.model]"
        type="datetime"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
      <el-date-picker
       v-if="item.type === 'datetimerange'"
        v-model="form[item.model]"
        type="datetimerange"
        @change="selectTime"
        value-format="yyyy-MM-dd HH:mm:ss"
        :default-time="['00:00:00', '23:59:59']"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
    >
    </el-date-picker>
    </el-form-item>
    <!--留一个插槽-->
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  //inline 属性可以让表单域变为行内的表单域
  //form 表单数据 formLabel 是标签数据
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array,
    refObj: {
      type: Object,
      default: null,
    },
    labelwidth: String,
    rules: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  //  watch: {
  //     data: {
  //         handler: function (val) {
  //             // 将form实例返回到父级
  //             this.$emit("updateRefObj", this.$refs.form);
  //         },
  //         deep: true, // 深度监听
  //     },
  // },
  mounted() {
    // 将form实例返回到父级
    // this.sunmmitfunc(this.$refs.form);
    this.$emit("updateRefObj", this.$refs.form);
  },
  methods:{
      // 确定选择时间
		selectTime() {
			if (this.form.timeValue) {
				this.form.createStartTime = this.form.timeValue[0]
				this.form.createEndTime = this.form.timeValue[1]
			} else {
				this.form.createStartTime = ''
				this.form.createEndTime = ''
			}
            this.$emit("updateRefObj", this.$refs.form);
		},
        change(e){
            this.$forceUpdate(e);
        }
  }
};
</script>
