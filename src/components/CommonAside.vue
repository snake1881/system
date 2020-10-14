<template>
  <el-menu
    background-color="#1F2D3D"
    text-color="#909399"
    active-text-color="#fff"
    default-active="#"
    :unique-opened="true"
    router
    :collapse="isCollapse"
    :width="isCollapse?'64px':'200px'"
  >
    <!-- 侧边栏伸缩 -->
    <div class="toggle-button" @click="toggleCollapse">|||</div>
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
      // 侧边栏伸缩
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
.toggle-button {
    background-color: #303752;
    font-size: 20px;
    height: 20px;
    padding: 8px 0;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}

</style>
