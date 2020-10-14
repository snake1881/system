<template>
  <div class="receiveNotice">
    <el-card>
      <div slot="header">
        <span class="receiveNotice_span">通知中心</span>
      </div>
      <div v-for="(item, index) in this.noticeData " :key="index" class="receiveNotice_container">
        <el-button type="warning" icon="el-icon-place" circle class="receiveNotice_container_button"/>
        <div class="receiveNotice_container_detail">
          <el-button @click="gotoDetailsNotice()" type="text" style="margin-right:30px"> {{ item.notContainer}} </el-button>
          <el-button type="text"> {{ item.notTime}} </el-button>
          <el-button type="text"> {{ item.notSend}} </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      noticeData: [
        {
          notContainer: "下午14点开发科会议室开会。",
          notTime:"2020/9/22",
          notSend:"李科长"
        },
        {
          notContainer: "本周学习延长石油发展历程相关资料，并写出个人感悟。",
          notTime:"2020/9/23",
          notSend:"宣传部"
        },
        {
          notContainer: "有关东仁沟采油队智能油田改造汇报会议将在早上8点举行，请大家按时参加。",
          notTime:"2020/9/25",
          notSend:"开发科"
        },
        {
          notContainer: "本周学习延长石油发展历程相关资料，并写出个人感悟。",
          notTime:"2020/9/23",
          notSend:"宣传部"
        },
        {
          notContainer: "下午14点开发科会议室开会。",
          notTime:"2020/9/22",
          notSend:"李科长"
        },
        {
          notContainer: "本周学习延长石油发展历程相关资料，并写出个人感悟。",
          notTime:"2020/9/23",
          notSend:"宣传部"
        },
        {
          notContainer: "下午14点开发科会议室开会。",
          notTime:"2020/9/22",
          notSend:"李科长"
        },
        {
          notContainer: "本周学习延长石油发展历程相关资料，并写出个人感悟。",
          notTime:"2020/9/23",
          notSend:"宣传部"
        }
      ]
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
          // this.noticeData = resp;
        }
      });
    },
    // 详情
    gotoDetailsNotice() {
      this.$router.push(
        { 
          name: '消息详情',
          params: { 
            msg: this.noticeData[0].notContainer,
            sendUser: this.$store.state.currentUser.username  ,
            title: this.noticeData[0].notTime
          } 
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/notice/receiveNotice.css";
</style>
<style scoped>
.el-button--text {
  color: black;
}
</style>