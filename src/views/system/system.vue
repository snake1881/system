<template>
  <div class="system">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="sys_aside">
        <common-aside :routerNumber="router1" />
      </el-aside>
      <el-main class="sys_main" :width="this.isCollapse?'100px':'900px'">
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
    PageHeader
  },
  props: {
    // 侧边栏收缩
    isCollapse: {
      type: Boolean
    }
  },
  data() {
    return {
      // 侧边栏显示
      router1: 4
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import "../../assets/css/system/system.css";
</style>
