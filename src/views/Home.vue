<template>
  <el-container>
    <el-header><home-header /></el-header>
    <el-main style="overflow: hidden;">
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
import HomeHeader from "../components/home/HomeHeader";
export default {
  components: {
    HomeHeader,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
</style>
<style>
body {
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
}
.el-header {
  height: 8% !important;
  width: 100%;
  padding: 0 0;
  background-image: linear-gradient(#4e70ad, #3e4372);
}
.el-main {
  height: 92%;
  width: 100%;
  padding: 0;
}
</style>
