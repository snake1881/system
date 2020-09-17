<template>
  <div class="page_header">
    <i class="el-icon-s-unfold" style="font-size: 30px;line-height: 50px;margin-right: 1.5%" />
    <span class="page_header_left">{{ this.pageHeaderName }}</span>
    <i class="el-icon-arrow-right" style="font-size: 16px;line-height: 50px;margin-left: 0.5%;margin-right: 1%" />
    <span class="page_header_right" v-if="this.$route.name == null">首页</span>
    <span class="page_header_right" v-else>{{ this.$route.name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    pageHeaderName: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.page_header {
  height: 50px;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  background-color: #e4e7ed;
}
.page_header_left {
  font-size: 16px;
  font-weight: bolder;
}
.page_header_right {
  color: #303133;
  font-size: 14px;
}
.page_header_left,.page_header_right {
  line-height: 50px;
  background-color: #e4e7ed;
}
</style>