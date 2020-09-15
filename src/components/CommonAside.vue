<template>
  <el-menu
    background-color="#3d464d"
    text-color="#fff"
    active-text-color="#ffd04b"
    default-active="#"
    :unique-opened="true"
    router
  >
    <el-menu-item
      :index="item.path"
      v-for="(item, index) in menus.children"
      :key="index"
    >
      <i :class="item.icon" style="margin-right:8px;font-size: 22px" />
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
  text-indent: 25px;
}
</style>
