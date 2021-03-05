<template>
  <div class="sendNotice">
    <!-- 发布通知 -->
    <div class="sendNotice_left">
      <el-form :v-model="noticeData" label-width="100px">
        <el-form-item label="接收人" class="sendNotice_left_form_item_one">
          <el-tag
            v-for="(item, index) in this.receiverLabelList"
            :key="index"
            closable
            @close="handelClosed(index)"
          >
            {{ item.name }}
          </el-tag>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="noticeData.title" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="noticeData.content" />
        </el-form-item>
        <el-form-item label="发送人">
          <el-input disabled v-model="noticeData.userName" />
        </el-form-item>
        <el-form-item>
          <el-button @click="sendNotice()">发送</el-button>
          <el-button type="info" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 选择通知接收人 -->
    <div class="sendNotice_right">
      <!-- 搜索框 -->
      <div class="sendNotice_right_top">
        <el-input
          v-model="receiver"
          placeholder="查找联系人"
          suffix-icon="el-icon-search"
          @click="searchReceiver()"
        />
      </div>
      <!-- 联系人 -->
      <div class="sendNotice_right_contentiner">
        <div v-if="inputFlag">
          <el-tree
            :data="allPeople"
            :props="defaultProps"
            ref="tree"
            @node-click="handleNodeClick"
          />
        </div>
        <div v-else>
          <span>{{ this.receiver }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import websocket from "../../utils/websocket.js";
export default {
  data() {
    return {
      // 通知内容
      noticeData: {
        title: "",
        content: "",
        userId: "",
        userName: "",
        receiverList: [{}],
      },
      // 选择接收人
      receiver: "",
      // 全体员工
      allPeople: [],
      defaultProps: {
        label: "labelName",
        children: "userList",
      },
      // 显示标志
      inputFlag: true,
      message: [],
      receiverLabelList: [],
      reveiverDepaetmentList: [],
      // reveiverDepaetmentList:[]
    };
  },
  created() {
    this.noticeData.userId = JSON.parse(
      window.sessionStorage.getItem("user")
    ).userId;
    this.noticeData.userName = JSON.parse(
      window.sessionStorage.getItem("user")
    ).userName;
    this.userInit();
  },
  methods: {
    //用户列表初始化
    userInit() {
      this.getRequest("/system/sysUser/selectWsUser").then((resp) => {
        if (resp) {
          this.allPeople = resp.data;
        }
      });
    },
    // 发送通知
    sendNotice() {
      // 调用前端的方法（可以传json格式数据）
      // websocket.Send(toUserId,this.message);
      // 调用后端方法（只可以传string类型的参数）
     let list = [];
    //  list = this.reveiverDepaetmentList;
    console.log(this.reveiverDepaetmentList);
     this.reveiverDepaetmentList.forEach(items=>{
       if(items.userName){
         let user = {
             name:items.userName,
             userId:items.userId
           }
        list.push(user);
       }else{
         items.userList.forEach(item=>{
           let user = {
             name:item.userName,
             userId:item.userId
           }
          list.push(user);
         })
       }
     })
     console.log(list);
     this.noticeData.receiverList =list;
     console.log(this.noticeData.receiverList)
      this.postRequest("/webSocket/send", this.noticeData).then((resp) => {
        if (resp) {
          this.$message({
            message: "通知发送成功!",
            type: "success",
          });
        } else {
          this.$message.error("通知发送失败，请重新发送!");
        }
      });
    },
    // 点击节点，获取节点数据
    handleNodeClick(data) {
      console.log(data);
      if (data.userId) {
        console.log("员工");
        console.log(data)
        var user = {
          name: data.userName,
          userId: data.userId,
        };
        this.receiverLabelList.push(user);
        this.reveiverDepaetmentList.push(data);
      } else {
        console.log("部门");
        console.log(data)
        var user = {
          name: data.departmentName,
          userId: "部门",
        };
        this.reveiverDepaetmentList.push(data);
        this.receiverLabelList.push(user);
      }
      console.log(this.receiverLabelList)
    },
    // 删除接收人
    handelClosed(val) {
      console.log(val);
      this.reveiverDepaetmentList.splice(val,1);
      this.receiverLabelList.splice(val, 1);
    },
    // 搜索
    searchReceiver() {
      this.getRequest("/", this.receiver).then((resp) => {
        if (resp) {
          this.inputFlag = false;
          this.receiver = resp.data;
        }
      });
    },
  },
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
