<template>
  <el-menu
    background-color="#303133"
    text-color="#C0C4CC"
    active-text-color="white"
    default-active="1-1"
    :unique-opened="true"
    router
  >
    <el-menu-item
      :index="item.path"
      v-for="(item, index) in menus.children"
      :key="index"
    >
      <i :class="item.icon" style="margin-right:5px" />
      <span slot="title">{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  props: {
    routerNumber: {
      type: Number
    }
  },
  data() {
    return {
      menus: this.$store.state.routes[0].children[this.routerNumber]
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
}
</style>
