<template>
  <el-menu
    background-color="#1F2D3D"
    text-color="#909399"
    active-text-color="#fff"
    default-active="#"
    :unique-opened="true"
    router
    :collapse="isCollapse"
  >
    <!-- 侧边栏伸缩 -->
    <i class="el-icon-s-unfold menu-icon" @click="toggleCollapse()" />
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
      menus: this.$store.state.routes[0].children[this.routerNumber],
      isCollapse: false
    };
  },
  methods: {
    // 侧边栏伸缩
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  text-indent: 25px;
}
.menu-icon{
  font-size: 30px;
  margin: 0 12px;
  // background-color: rgb(209, 205, 205);
}
</style>
