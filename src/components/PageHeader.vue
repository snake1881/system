<template>
  <div class="page_header" v-if="showTags">
   <ul>
      <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
          <router-link :to="item.path" class="tags-li-title">
              {{item.name}}
          </router-link>
          <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagsList: []
    }
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
        const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
        if (item) {
          delItem.path === this.$route.fullPath && this.$router.push(item.path);
        } else {
          this.$router.push('/home');
        }
      } else {
        this.$router.push('/home');
      }
    },
    // 设置标签
    setTags(route) {
      if (route.path === "/home") {
        this.tagsList = []
      } else {
        const isExist = this.tagsList.some(item => {
          return item.path === route.fullPath;
        });
        !isExist && this.tagsList.push({
          path: route.fullPath,
          name: route.matched[2].name
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page_header {
  height: 35px;
  background-color: #f4f5f7;
  border-bottom: 2px solid rgb(35, 34, 80);
  position: relative;
  overflow: hidden;
}
.tags ul {
  width: 90%;
  height: 100%;
}
.tags-li {
    float: left;
    margin: -8px 4px 5px 4px;
    padding:0px 5px;
    border-radius: 3px;
    font-size: 8px;
    overflow: hidden;
    line-height: 20px;
    border: 1px solid #e9eaec;
    background: #fff;
    vertical-align: middle;
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
    border: 1px solid #409EFF;
    background-color: #409EFF;
}
.tags-li.active .tags-li-title {
    color: #fff;
}
</style>