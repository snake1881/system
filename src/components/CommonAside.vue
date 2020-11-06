<template>
  <el-menu
    background-color="#1F2D3D"
    text-color="#909399"
    active-text-color="#fff"
    default-active="#"
    :unique-opened="true"
    router
   
  >
    <div v-for="(item, index) in this.menus.children" :key="index">
      <div v-if="item.children">
        <el-menu-item
          :index="item.path"
          v-if="item.children.length === 0 && !item.hidden"
        >
          <i :class="item.icon" style="margin-right:8px;font-size: 22px" />
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
        <el-submenu
          :index="item.path"
          v-if="item.children.length > 0 && !item.hidden"
        >
          <template slot="title">
            <i :class="item.icon" style="margin-right:8px;font-size: 22px" />
            <span slot="title">{{ item.name }}</span>
          </template>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, indexj) in item.children"
            :key="indexj"
          >
            <i :class="subItem.icon" style="margin-right:8px;font-size: 22px" />
            <span slot="title">{{ subItem.name }}</span>
          </el-menu-item>
        </el-submenu>
      </div>
    </div>
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
      // 导航栏内容
      menus: this.$store.state.routes[0].children[this.routerNumber],
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
.toggle-button {
    background-color: rgb(68, 73, 87);
    font-size: 20px;
    height: 20px;
    padding: 8px 0;
    line-height: 24px;
    color: #fff;
    letter-spacing: 0.2em;
    cursor: pointer;
}
.toggle-button-details {
  margin: 0 10%;
}
</style>
<style>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-side {
    overflow: hidden;
  }
  .el-menu-vertical-demo .el-menu-item {
    padding: 0;

  }
  .el-menu[data-v-a28ad4e6]{
    text-indent: 0;
  }
</style>
