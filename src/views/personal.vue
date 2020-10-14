<template>
  <div class="personal">
    <el-card>
      <div slot="header">About Me</div>
      <el-form label-width="80px">
        <el-form-item>
          <img class="personal_form_img" alt="用户" src="../assets/images/header.jpg" />
        </el-form-item>
          <el-form-item label="昵称">
        <el-input />
          </el-form-item>
        <el-form-item label="密码">
          <el-input />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{}
  },
  methods:{}
}
</script>

<style lang="less" scoped>
 @import '../assets/css/personal.css';
</style>
