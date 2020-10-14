<template>
  <div class="sendNotice">
    <!-- 发布通知 -->
    <div class="sendNotice_left">
      <el-form :v-model="noticeData" label-width="100px">
        <el-form-item label="接收人" class="sendNotice_left_form_item_one">
          <el-tag v-for="(item,index) in noticeData.receiver" :key="index" closable @close="handelClosed(index)">
            {{item}}
          </el-tag>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="noticeData.title" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="noticeData.content" />
        </el-form-item>
        <el-form-item label="发送人">
          <el-input v-model="noticeData.userName" />
        </el-form-item>
        <el-form-item >
          <el-button @click="sendNotice()">发送</el-button>
          <el-button type="info" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 选择通知接收人 -->
    <div class="sendNotice_right">
      <!-- 搜索框 -->
      <div class="sendNotice_right_top">
        <el-input v-model="receiver" placeholder="查找联系人" suffix-icon="el-icon-search" @click="searchReceiver()"/>
      </div>
      <!-- 联系人 -->
      <div class="sendNotice_right_contentiner">
        <div v-if="inputFlag" >
          <el-tree :data="allPeople" :props="defaultProps" ref="tree" @node-click="handleNodeClick"/>
        </div>
        <div v-else>
          <span>{{this.receiver}}</span>
        </div>
      </div>
    </div> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 通知内容
      noticeData: {
        title: "",
        content: "",
        receiver: [],
        userName: this.$store.state.currentUser.username, 
      },
      // 选择接收人
      receiver:"",
      // 全体员工
      allPeople: [
        {
          label:"总公司",
          children:[
            {  label:"缘缘" },
            {  label:"冬冬"},
            {  label:"萱萱" },
            {  label:"凡凡"}
          ]
        },
        {
          label:"西安分公司",
          children:[
            {  label:"妮妮" },
            {  label:"冬冬"},
          ]
        },
        {
          label:"克拉玛依分公司",
          children:[
            {  label:"妮妮" },
            {  label:"冬冬"},
          ]
        },
        {
          label:"北京分公司",
          children:[
            {  label:"妮妮" },
            {  label:"冬冬"},
          ]
        }
      ],
      defaultProps: {
        label: "label",
        children: "children"
      },
      // 显示标志
      inputFlag: true
    }
  },
  methods: {
    // 发送通知
    sendNotice() {
      this.getRequest("/", this.noticeData).then(resp => {
        if (resp) {
          this.$message({
            message: "通知发送成功!",
            type: "success"
          });
        } else {
          this.$message.error("通知发送失败，请重新发送!");
        }
      });
    },
    // 点击节点，获取节点数据
    handleNodeClick(data) {
      this.noticeData.receiver.push(data.label);
    },
    // 删除接收人
    handelClosed(val){
      this.noticeData.receiver.splice(val,1);
    },
    // 搜索
    searchReceiver(){
      this.getRequest("/", this.receiver).then(resp => {
        if (resp) {
          this.inputFlag = false;
          this.receiver = resp.data;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/notice/sendNotice.css";
</style>

<style>
.el-textarea__inner {
  height: 400px;
}
</style>
