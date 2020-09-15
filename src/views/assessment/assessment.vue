<template>
  <div class="system">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="sys_aside">
        <common-aside :routerNumber="router2" />
      </el-aside>
      <el-main class="sys_main">
        <!-- 面包屑 -->
        <breadcrumb />
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import CommonAside from "../../components/CommonAside";
import Breadcrumb from "../../components/Breadcrumb";

export default {
  components: {
    CommonAside,
    Breadcrumb
  },
  data() {
    return {
      // 侧边栏显示
      router2: 2
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import "../../assets/css/system/system.css";
</style>