<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <span>通知中心</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          icon="el-icon-setting"
        >
          设置
        </el-button>
      </div>
      <div v-for="o in 14" :key="o" class="noticeContainer">
        <el-button
          type="warning"
          icon="el-icon-place"
          circle
          style="margin:0 10px 15px 0"
        />
        <div style="margin-bottom:15px">
          <el-button @click="gotoDetailsNotice()" type="text">
            <span> {{ "列表内容 " + o }} </span>
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      noticeData: []
    };
  },
  created() {
    this.noticeInit();
  },
  methods: {
    // 初始化所有通知
    noticeInit() {
      this.getRequest("/").then(resp => {
        if (resp) {
          this.noticeData = resp;
        }
      });
    },
    // 跳转到接收通知页面
    gotoDetailsNotice() {
      this.$router.replace("/detailsNotice");
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100px;
  background-color: white;
}
.noticeContainer {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 35px;
  border-bottom: 1px solid rgb(209, 208, 208);
}
</style>
<style scoped>
.el-button--text {
  color: black;
}
</style>
