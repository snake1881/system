<template>
  <div class="page_header" v-if="showTags">
   <ul>
      <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
          <router-link :to="item.path" class="tags-li-title">
              {{item.name}}
          </router-link>
          <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close" /></span>
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
        // 删除已关闭标签
        const delItem = this.tagsList.splice(index, 1)[0];
        // 已关闭标签的前一个标签
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
      // 判断是否为首页
      if (route.path === "/home") {
        this.tagsList = []
      }else if(route.path === "/system/system"){    //判断是否为系统管理
        this.tagsList.push({
          path:"/system/user",
          name:route.matched[2].name,
        })
      }else if(route.path === "/assessment/assessment"){   //判断是否为绩效考核
        this.tagsList.push({
          path:"/assessment/template",
          name:route.matched[2].name,
        })
      }else if(route.path === "/diagnosis/diagnosis"){   //判断是否为油水井诊断
        this.tagsList.push({
          path:"/diagnosis/abnormal/waterAbnormal",
          name:route.matched[2].name,
        })
      }else if(route.path === "/unattended/unattended"){   //判断是否为无人值守
        this.tagsList.push({
          path:"/unattended/unattended",
          name:route.matched[2].name,
        })
      }else if(route.path === "/information/information"){   //判断是否为基础信息
        this.tagsList.push({
          path:"/information/baswellinfor",
          name:route.matched[2].name,
        })
      }
       else {
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
@import "../assets/css/pageHeader.css";

</style>