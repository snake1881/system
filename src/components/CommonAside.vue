<template>
  <el-menu
    background-color="#3d464d"
    text-color="#fff"
    active-text-color="#ffd04b"
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
          :index="index + ''"
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
      menus: this.$store.state.routes[0].children[this.routerNumber]
    };
  },
  created() {
    this.ad();
  },
  methods: {
    ad() {
      console.log(this.menus.children);
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  text-indent: 25px;
}
</style>
