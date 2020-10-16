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
  background-color: #1a2a3a;
}
.el-header {
  height: 8% !important;
  width: 100%;
  padding: 0 0;
  background-color: #20374e;
}
.el-main {
  height: 92%;
  width: 100%;
  padding: 0;
}
</style>
