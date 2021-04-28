<template>
  <div class="survey">
    <el-button
      @click="gotoIndex()"
      class="survey_footer"
      type="text"
      icon="el-icon-video-play"
      size="medium "
      >进入系统</el-button
    >
  </div>
</template>
<script>
export default {
  methods: {
    gotoIndex() {
      this.$router.replace("/Home");
    },
  },
};
</script>
<style lang="less" scoped>
.survey {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/survey.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.survey_footer {
  position: fixed;
  bottom: 0;
  left: 94%;
  top: 96%;
  font-size: 16px;
}
</style>
