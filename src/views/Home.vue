<template>
  <el-container>
    <el-header><home-header /></el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
import HomeHeader from "../components/home/HomeHeader";
export default {
  components: {
    HomeHeader
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
</style>
<style>
body {
  margin: 0;
  width: 100%;
  height: 100%;
}
.el-header {
  height: 8% !important;
  width: 100%;
  padding: 0 0;
  background-color: #132231;
}
.el-main {
  height: 90%;
  width: 100%;
  background-color: #f2f6fc;
  padding: 0;
}
</style>
