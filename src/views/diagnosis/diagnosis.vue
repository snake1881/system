<template>
<<<<<<< HEAD
  <div class="system">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="sys_aside">
        <common-aside :routerNumber="router6" />
      </el-aside>
      <el-main class="sys_main">
        <!-- 页头 -->
        <page-header pageHeaderName="油水井诊断" />
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
  data() {
    return {
      // 侧边栏显示
      router6: 3
    };
=======
  <div>
      油水井诊断
  </div>
</template>
<script>
export default {
  data() {
    return {};
>>>>>>> 0c9ff95c384db45f6f75ee524b75f452fbb007b5
  },
  methods: {}
};
</script>
<<<<<<< HEAD
<style lang="less" scoped>
@import "../../assets/css/system/system.css";
</style>
=======
<style lang='less' scoped>
</style>
<style>
</style>
>>>>>>> 0c9ff95c384db45f6f75ee524b75f452fbb007b5
