<template>
<div class="unattended">
  <el-container>
    <el-aside class="unattended_aside">
      <el-menu  router background-color="#1F2D3D" text-color="#fff"  active-text-color="#fff">
        <el-menu-item index="/unattended/proTeam">
          <span slot="title">采油队信息</span>
        </el-menu-item>
        <el-menu-item index="/unattended/oilStation">
          <span slot="title">采油站信息</span>
        </el-menu-item>
        <el-menu-item index="/unattended/wellsite">
          <span slot="title">井场信息</span>
        </el-menu-item>
        <el-menu-item index="/unattended/singleWell">
          <span slot="title">单井信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="unattended_container">
      <router-view />
    </el-main>
  </el-container>
</div>
</template>

<style lang="less" scoped>
.unattended {
  height: 100%;
  width: 100%;
  background-color: #f2f6fc;
  margin: 0;
}

.unattended_aside {
  width: 6% !important;
  height: 100%;
  overflow: hidden;
}

.unattended_container {
  width: 94%;
  height: 100%;
}
</style>
<style lang="less" scoped>
.unattended_aside .el-menu {
  height: 100%;
}
</style>
