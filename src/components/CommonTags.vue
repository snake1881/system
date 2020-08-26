<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li
        class="tags-li"
        v-for="(item, index) in tagsList"
        :class="{
          active: isActive(item.path)
        }"
        :key="index"
      >
        <!-- <div>{{ item }}</div> -->
        <router-link :to="item.path" class="tags-li-title">
          {{ item.name }}
        </router-link>
        <span class="tags-li-icon" @click="closeTags(index)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tagsList: []
    };
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    // 对router进行监听，每当访问router时，对tags的进行修改
    $route(newValue) {
      this.setTags(newValue);
    }
  },
  created() {
    // 第一次进入页面时，修改tag的值
    this.setTags(this.$route);
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags(index) {
      if (this.tagsList.length > 1) {
        const delItem = this.tagsList.splice(index, 1)[0];
        const item = this.tagsList[index]
          ? this.tagsList[index]
          : this.tagsList[index - 1];
        if (item) {
          delItem.path === this.$route.fullPath && this.$router.push(item.path);
        } else {
          this.$router.push("/Home");
        }
      } else {
        this.$router.push("/Home");
      }
    },
    // 设置标签
    setTags(route) {
      if (route.path === "Home") {
        this.tagsList = [];
      } else {
        const isExist = this.tagsList.some(item => {
          return item.path === route.fullPath;
        });
        !isExist &&
          this.tagsList.push({
            path: route.fullPath,
            name: route.matched[1].name
          });
      }
    }
  }
};
</script>
<style>
.tags {
  position: relative;
  height: 50px;
  overflow: hidden;
  background-color: #ebeff5;
}
.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.tags-li {
  text-decoration: none;
  float: left;
  margin: 0 5px 4px 5px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all .3s ease-in;
  -moz-transition: all .3s ease-in;
  transition: all .3s ease-in;
}
.tags-li:not(.active):hover {
  background: #f8f8f8;
}
.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}
.tags-li.active {
  color: #fff;
  background-color: #909399;
}
.tags-li.active .tags-li-title {
  color: #fff;
}
</style>
