<template>
  <div class="unattended">
    <el-container>
      <el-header class="unattended_header">
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          class="unattended_header_crumb"
        >
          <el-breadcrumb-item :to="{ path: '/unattended/proTeam' }"
            >采油队信息(东仁沟采油队)</el-breadcrumb-item
          >
          <el-breadcrumb-item
            :to="{ path: '/unattended/oilStation' }"
            v-if="this.$route.name === '采油站'"
            >采油站信息({{ this.$route.query.name }}采油站)</el-breadcrumb-item
          >
          <el-breadcrumb-item
            :to="{ path: '/unattended/wellsite' }"
            v-if="this.$route.name === '井场'"
            >井场信息({{ this.$route.query.name }}井场)</el-breadcrumb-item
          >
          <el-breadcrumb-item
            :to="{ path: '/unattended/singleWell' }"
            v-if="this.$route.name === '单井'"
            >单井信息({{ this.$route.query.name }})</el-breadcrumb-item
          >
        </el-breadcrumb>
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
  created() {
    console.log(this.$route);
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.unattended {
  height: 100%;
  width: 100%;
  margin: 0;
  // background-image: url("../../assets/images/unttend_one.png");
   background-image: linear-gradient(#f3f3f3, #ececec);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.unattended_header {
  width: 100%;
  height: 4% !important;
  background-color: #0a2146;
  border: 1px solid #253e69;
  display: flex;
  flex-direction: row;
}

.unattended_container {
  width: 100%;
  height: 96%;
}
</style>
<style>
.el-breadcrumb {
  margin: 0.2% 0;
  width: 100%;
  height: 100%;
}
.el-breadcrumb__separator[class*="icon"] {
  margin: 0.2% 0;
}
.el-breadcrumb_item,
.el-breadcrumb__inner {
  font-size: 12px;
  color: rgb(196, 194, 194) !important;
}
</style>
