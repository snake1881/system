<template>
  <div class="detailsNotice">
    <el-form :v-model="noticeData" label-width="100px">
    <el-form-item label="发送人">  
        <el-input v-model="this.$route.params.sendName"/>
    </el-form-item>
    <el-form-item label="标题">
        <el-input v-model="this.$route.params.title"/>
    </el-form-item>
    <el-form-item label="内容" >
        <el-input type="textarea" v-model="this.$route.params.content"/>
    </el-form-item>
    <el-form-item class="sendNotice_left_form_item">
        <el-button @click="open">确认</el-button>
        <el-button type="info" plain>取消</el-button>
    </el-form-item>
    </el-form> 
  </div>
</template>
<script>
export default {
  data(){
    return{
      noticeData:{}  
    }
  },
  created(){
    console.log("================================")
    this.open();
  },
  methods:{
    // 确认收到
    open(){
      //修改信息状态
      console.log(this.$route.params);
      this.putRequest("/ChatRecord/changeState?chatRecordId="+this.$route.params.chatRecordId).then(resp=>{
        if (resp) {
          console.log(resp.data);
        }
      })
      // var key = this.$route.params.key;
      // var value = JSON.parse(window.localStorage.getItem(key));
      // value.MsgState = "已读";
      // window.localStorage.setItem(key,JSON.stringify(value));
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/notice/detailsNotice.css";
</style>