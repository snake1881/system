<template>
  <el-pagination
    :current-page.sync="curPage"
    :page-size="pageSize"
    :page-sizes="[1, 2, 3, 4, 5]"
    layout="total, prev, pager, next, jumper, sizes"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script>
export default {
  props: ["currentPage", "pageSize", "total"],
  data() {
    return {
      curPage: this.currentPage
    };
  },
  methods: {
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.$emit("size-change", val);
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.$emit("current-change", val);
    }
  }
};
</script>
