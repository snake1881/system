<template>
  <div class="survey">
    <el-button
      @click="gotoIndex()"
      class="survey_footer"
      type="primary"
      icon="el-icon-video-play"
      size="medium "
    />
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
  left: 97%;
  top: 95%;
  font-size: 25px;
}
</style>
