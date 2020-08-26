<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadList"
        :key="index"
        :to="{ path: item.path }"
        >{{ item.name }}
      </el-breadcrumb-item>
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
        matched = [{ path: "/Home", name: "首页" }];
      }
      this.breadList = matched;
    }
  }
};
</script>
