<template>
  <div class="system">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="sys_aside">
        <common-aside :routerNumber="router1" />
      </el-aside>
      <el-main class="sys_main">
        <!-- 页头 -->
        <page-header />
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import CommonAside from "../../components/CommonAside";
import PageHeader from "../../components/PageHeader";
export default {
  components: {
    CommonAside,
    PageHeader,
  },
  data() {
    return {
      // 侧边栏显示
      router1: "系统管理",
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@import "../../assets/css/system/system.css";
</style>
