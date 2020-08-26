<template>
  <el-menu
    background-color="#303133"
    text-color="#C0C4CC"
    active-text-color="white"
    default-active="1-1"
    :unique-opened="true"
    router
  >
    <div v-for="(item, index) in menus" :key="index">
      <el-submenu
        :index="index + ''"
        v-if="!item.hidden && item.children.length > 0"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </template>

        <el-menu-item
          v-for="(subItem, indexj) in item.children"
          :index="subItem.path"
          :key="indexj"
        >
          <span slot="title">{{ subItem.name }}</span>
        </el-menu-item>
      </el-submenu>
    </div>
  </el-menu>
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
  }
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
}
</style>
