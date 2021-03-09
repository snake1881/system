<template>
  <div class="personal">
    <el-card>
      <div slot="header">About Me</div>
      <el-form label-width="80px">
        <el-form-item>
          <img class="personal_form_img" alt="用户" src="../assets/images/header.jpg" />
        </el-form-item>
      </el-form>
      <el-form>
          <el-form-item style="padding-left:50px"  label="昵称">
            <span>{{this.user.userName}}</span>
          </el-form-item>
          <el-form-item  style="padding-left:50px"  label="ID">
            <span>{{this.user.userId}}</span>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userId:"",
      userName:"",
      user:{},
    }
  },
  created(){
this.userInfoInit();
  },
  methods:{
    userInfoInit(){
      console.log("初始化用户信息")
    this.user = JSON.parse(window.sessionStorage.getItem("user"));
    console.log(this.user)
    }
  }
}
</script>

<style lang="less" scoped>
 @import '../assets/css/personal.css';
</style>
