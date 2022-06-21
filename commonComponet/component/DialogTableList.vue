<template>
  <div class="table">
    <!-- 表格开始 -->
    <el-table
      ref="table"
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      :height="height"
      @selection-change="handleSelectionChange"
    >
     <slot name="contenttop"></slot>
      <!-- prop是对应列内容的字段名 width是对应列宽度 sortable是是否排序 label是对应列名称 -->
      <el-table-column
        v-for="(item, index) in tableColumns"
        :key="index"
        :prop="item.param"
        :width="item.width ? item.width : ''"
        :label="item.label"
        :type="item.type"
      >
      <!-- 因为有些参数需要判定比如性别所以判断一下 -->
        <template slot-scope="scope">
          <span v-if="item.render">
            {{ item.render(scope.row) }}
          </span>
          <span v-else>{{ scope.row[item.param] }}</span>
        </template>
      </el-table-column>
      <!-- 操作 或者用slot-->
      <slot name="operation"></slot>
      <el-table-column
        v-if="tableOption.label"
        :label="tableOption.label"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in tableOption.options"
            :key="index"
            :type="item.type"
            :icon="item.icon"
            @click="handleButton(item.methods, scope.row, scope.$index)"
            size="mini"
          >
            {{ item.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->

    <!-- 翻页 -->
    <div v-if="isPage" class="inline-flex flex-left ">
        <el-pagination
          class="mr-10"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize"
        ></el-pagination>  
     </div>
  </div>
</template>

<script>
/**
 * 用于弹出框的列表查询表格，自定义高度
 * params：height (高度)、 tableData 列表数据、tableColumns (表头数据)、tableOption（表格操作） 已做operation具名插槽
 * 父组件监听handleSelectionChange、handleSizeChange、handleCurrentChange
 * 父组件页面引用
 * <tablelist 
      :tableData="tableData"
      :tableColumns="tableLabel"
      :loading="loading"
      height="500px"
      @handleSelectionChange="handleSelectionChange">
      <el-table-column slot="contenttop" type="selection" width="55" :reserve-selection="false"></el-table-column>
    </tablelist>
 * import tablelist from '@src/components/main/ishare/component/tablelist'
 案例：  dialogtable.vue
 *  */
export default {
  props: {
    loading: {
      // 预加载
      type: Boolean,
      default: false
    },
    tableData: {
      // 表格数据
      type: Array,
      default: () => {
        return [];
      }
    },
    tableColumns: {
      // 表头数据
      type: Array,
      default: () => {
        return [];
      }
    },
    height:{
      type:String,
      default:()=>{
        return ''
      }
    },
    tableOption: {
      // 表格操作
      type: Object,
      default: () => {
        return {};
      }
    },
    currentPage: {
      // 当前页
      type: Number,
      default: () => {
        return 1;
      }
    },
    pageSize: {
      // 当前页展示数
      type: Number,
      default: () => {
        return 10;
      }
    },
    totalSize: {
      // 总数
      type: Number,
      default: () => {
        return 0;
      }
    },
    isPage:  {
      // 总数
      type: Boolean,
      default: () => {
        return false;
      }
    },
  },
  methods: {
    // 切换当前一页展示多少条
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    // 翻页
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    // 按钮点击事件
    // methods方法名 row当前点击列数据 index当前点击的index
    handleButton(methods, row, index) {
      this.$emit("clickButton", { methods: methods, row: row, index: index });
    },
   // 勾选的数据
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
  }
};
</script>

<style lang="scss" scoped>
.table {
  margin-top: 10px;
}
.el-table {
  margin: 10px 0;
  & td,
  & th {
    text-align: center;
  }
}
.el-pagination {
  text-align: right;
}
</style>

