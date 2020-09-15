<template>
  <div class="page_header">
    <i class="el-icon-s-unfold" style="font-size: 30px;line-height: 50px" />
    <span class="left">{{ this.pageHeaderName }}</span>
    <i class="el-icon-arrow-right" style="font-size: 16px;line-height: 50px" />
    <span class="right" v-if="this.$route.name == null">首页</span>
    <span class="right" v-else>{{this.$route.name}}</span>
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
.left {
  font-size: 16px;
  font-weight: bolder;
  padding-left: 2%;
}
.right {
  color: #303133;
  font-size: 14px;
  padding-left: 1%;
}
.left,.right {
  width: 5%;
  line-height: 50px;
  background-color: #e4e7ed;
}
</style>