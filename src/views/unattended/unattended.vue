<template>
  <div class="unattended">
    <el-container>
      <el-header class="unattended_header">
        <el-link
          class="unattended_header_span"
          :underline="false"
          @click="gotoProTeam()"
          >采油队信息</el-link
        >
        <el-link
          class="unattended_header_span"
          :underline="false"
          @click="gotoOilStation()"
          >采油站信息</el-link
        >
        <el-link
          class="unattended_header_span"
          :underline="false"
          @click="gotoWellsite()"
          >井场信息</el-link
        >
        <el-link
          class="unattended_header_span"
          :underline="false"
          @click="gotoSingleWell()"
          >单井信息</el-link
        >
      </el-header>
      <el-main class="unattended_container">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    gotoProTeam() {
      this.$router.replace("/unattended/proTeam");
    },
    gotoOilStation() {
      this.$router.replace("/unattended/oilStation");
    },
    gotoWellsite() {
      this.$router.replace("/unattended/wellsite");
    },
    gotoSingleWell() {
      this.$router.replace("/unattended/singleWell");
    },
  },
};
</script>

<style lang="less" scoped>
.unattended {
  height: 100%;
  width: 100%;
  background-color: #f2f6fc;
  margin: 0;
}

.unattended_header {
  width: 100%;
  height: 4% !important;
  background-color: #eeeff1;
  display: flex;
  flex-direction: row;
}

.unattended_header_span {
  width: 5%;
}

.unattended_container {
  width: 100%;
  height: 96%;
}
</style>
