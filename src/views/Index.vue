<template>
  <el-container>
    <el-header>
      <div class="header_container">
        <img class="header_img" src="../assets/images/logo1.png" />
        <span class="header_text">用户管理系统</span>
        <!-- 导航栏 -->
        <el-menu mode="horizontal" router style="margin-left:100px">
          <div v-for="(item, index) in menus" :key="index">
            <el-menu-item
              :index="index + ''"
              v-if="!item.hidden && item.children.length > 0"
            >
              <template slot="title">
                <span slot="title">{{ item.name }}</span>
              </template>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    menus() {
      return this.$store.state.routes;
    }
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.header_container {
  display: flex;
  flex-direction: row;
  .header_text {
    margin-top: 15px;
    color: #f2f6fc;
    font-size: 24px;
  }
  .header_img {
    width: 100px;
    height: 50px;
    margin-top: 5px;
    margin-right: 6px;
  }
  // .header_menu {
  //   margin-left: 60px;
  //   background-color: brown;
  // }
}
</style>
<style scoped>
.el-header {
  background-color: #164474;
}
.el-main {
  background-color: #f2f6fc;
}
</style>
