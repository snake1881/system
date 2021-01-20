<template>
  <el-menu
    class="asider-el-menu"
    text-color="#909399"
    active-text-color="#fff"
    :unique-opened="true"
    router
    :default-active="$route.path"
  >
    <div v-for="(item, index) in this.menus.children" :key="index">
      <div v-if="item.children">
        <el-menu-item
          :index="item.path"
          v-if="item.children.length === 0 && !item.hidden"
        >
          <i :class="item.icon" style="margin-right: 8px; font-size: 22px" />
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
        <el-submenu
          :index="item.path"
          v-if="item.children.length > 0 && !item.hidden"
        >
          <template slot="title">
            <i :class="item.icon" style="margin-right: 8px; font-size: 22px" />
            <span slot="title">{{ item.name }}</span>
          </template>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, indexj) in item.children"
            :key="indexj"
          >
            <i
              :class="subItem.icon"
              style="margin-right: 8px; font-size: 22px"
            />
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
      type: Number,
    },
  },
  data() {
    return {
      // 导航栏内容
      menus: this.$store.state.routes[0].children[this.routerNumber],
    };
  },
};
</script>


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
.el-menu[data-v-a28ad4e6] {
  text-indent: 0;
}
.asider-el-menu {
  background-color: #133168;
}
.el-submenu__title:hover,
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #444b91 !important;
  border-bottom-color: #565d99 !important;
  color: #fff !important;
}
.el-menu-item.is-active {
  background-image: linear-gradient(#3e4e7e, #565d99) !important;
  border-bottom-color: #565d99 !important;
}
</style>
