<template>
  <div class="breadcrumb">
    <i class="el-icon-s-unfold" style="font-size: 30px;line-height: 50px"></i>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadList"
        :key="index"
        :to="{ path: item.path }"
      >{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadList: [] // 路由集合
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    isHome(route) {
      return route.name === "Home"; 
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      //如果不是首页
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/Home", name: "首页" }].concat(matched);
      } else {
        matched = [{ path: "/Home", name: "首页/发布通知" }];
      }
      this.breadList = matched;
    }
  }
};
</script>

<style lang="less" scoped>
.breadcrumb {
  height: 50px;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  background-color: #e4e7ed;
}
</style>

<style>
.breadcrumb .el-breadcrumb {
  font-size: 17px;
}
.breadcrumb .el-breadcrumb .el-breadcrumb__item {
  line-height: 50px;
  margin-left: 15px;
}
</style>