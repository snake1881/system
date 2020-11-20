<template>
<el-dialog title="查看" :visible.sync="checkOperVisible" width="43%" :before-close="checkOperClose">
  <div class="checkOperDiv" :data="checkData">
    <el-steps direction="vertical" :active="checkData.nodeSequence" finish-status="success" class="checkOperDiv_left"> 
      <el-step title="上报" @click.native="submit()" description="aaa"></el-step>
      <el-step title="派工" @click.native="send()" description="**时间，**人"></el-step>
      <el-step title="现场作业" @click.native="scene()" description="**时间，**人"></el-step>
      <el-step title="效果评价" @click.native="effect()" description="**时间，**人"></el-step>
    </el-steps>
    <div class="checkOperDiv_right">
      <div v-if="nodalPoint===0" class="checkOperDiv_submit_table">
        <el-row>
          <el-col :span="6"><div class="grid-content">作业名称:</div></el-col>
          <el-col :span="6"><div class="grid-content">{{checkData.operationName}}</div></el-col>
          <el-col :span="6"><div class="grid-content">作业类型:</div></el-col>
          <el-col :span="6"><div class="grid-content">{{checkData.operationType==0? "常规检泵" : "技改井"}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content">上报人:</div></el-col>
          <el-col :span="6"><div class="grid-content">{{checkData.dealUserName}}</div></el-col>
          <el-col :span="6"><div class="grid-content">上报时间:</div></el-col>
          <el-col :span="6"><div class="grid-content">{{checkData.dealDate}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content">备注:</div></el-col>
          <el-col :span="6"><div class="grid-content">{{checkData.remark}}</div></el-col>
          <el-col :span="6"><div class="grid-content">附件:</div></el-col>
          <el-col :span="6"><div class="grid-content"></div></el-col>
        </el-row>
      </div>
      <el-table v-if="nodalPoint===1" :data="tableData" border class="checkOperDiv_send_table">
        <el-table-column prop="number" label="派工" width="80" />
        <el-table-column prop="name" label="填报人" width="100" />
        <el-table-column prop="time" label="时间" width="100" />
        <el-table-column label="详情" width="78">
          <el-button type="text" size="small" @click="check()" class="el-icon-view" />
        </el-table-column>
      </el-table>
      <el-table v-if="nodalPoint===2" :data="tableData" border class="checkOperDiv_scene_table">
        <el-table-column prop="number" label="现场作业" width="80" />
        <el-table-column prop="name" label="填报人" width="100" />
        <el-table-column prop="time" label="时间" width="100" />
        <el-table-column label="详情" width="78">
          <el-button type="text" size="small" @click="check()" class="el-icon-view" />
        </el-table-column>
      </el-table>
      <el-table v-if="nodalPoint===3" :data="tableData" border class="checkOperDiv_scene_table">
        <el-table-column prop="number" label="效果评价" width="80" />
        <el-table-column prop="name" label="填报人" width="100" />
        <el-table-column prop="time" label="时间" width="100" />
        <el-table-column label="详情" width="78">
          <el-button type="text" size="small" @click="check()" class="el-icon-view" />
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-button type="info" @click="checkOperClose()" class="checkOperButton">关闭</el-button>
  <el-dialog :visible.sync="dialogVisible" width="30%" append-to-body >
    <span>每次修改的详细信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关 闭</el-button>
    </span>
  </el-dialog>
</el-dialog>
</template>

<script>
import template from '../../views/assessment/template.vue';
export default {
  components: { template },
  props: {
    checkOperVisible: {
      type: Boolean
    },
    checkData: {
      type: Object
    },
    nodalPoint: {
      type: Number
    }
  },
  data(){
    return{
      checkNode: this.checkData.nodeSequence,
      tableData:[
        {
          number:5,
          name:'张三',
          time:'2020-09-14'
        },
        {
          number:1,
          name:'李四',
          time:'2020-10-18'
        },
        {
          number:2,
          name:'lisa',
          time:'2020-11-01'
        },
        {
          number:4,
          name:'nini',
          time:'2020-11-23'
        }
      ],
      dialogVisible:false
    }
  },
  methods: {
    // 对话框父子组件传值
    checkOperClose() {
      this.$emit("checkRowClose");
    },
    // 详情
    check(){
      this.dialogVisible = true;
    },
    // 查看上报节点
    submit(){
      //如果当前节点处于上报节点或已完成上报，可以查看历史信息
      if(this.checkData.nodeSequence>=0){
        this.nodalPoint=0;
      }else{
        this.$message({
            message: "抱歉,不可以查看未执行任务!",
            type: "success"
          });
      }
    },
    // 查看派工节点
    send(){
      if(this.checkData.nodeSequence>=0){
        this.nodalPoint=1;
      }else{
        this.$message({
            message: "抱歉,不可以查看未执行任务!",
            type: "success"
          });
      }
    },
    // 查看现场作业节点
    scene(){
      if(this.checkData.nodeSequence>=2){
        this.nodalPoint=2;
      }else{
        this.$message({
            message: "抱歉,不可以查看未执行任务!",
            type: "success"
          });
      }
    },
    // 查看效果评价节点
    effect(){
      if(this.checkData.nodeSequence>=3){
        this.nodalPoint=3;
      }else{
        this.$message({
            message: "抱歉,不可以查看未执行任务!",
            type: "success"
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.checkOperDiv {
  height: 320px;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
  border: 1px solid rgb(136, 132, 127);
}
.checkOperDiv_left {
  width: 30%;
  height: 100%;
  border-right: 1px solid rgb(136, 132, 127);
  padding: 0 5%;
}
.checkOperDiv_right {
  width: 58%;
  height: 100%;
}
.checkOperDiv_submit_table {
  width: 100%;
  height: 86%;
  margin: 4% 2%;
}
.checkOperButton {
  margin: 2% 0 0 40%;
}
.checkOperDiv_submit_table .el-row {
    margin-bottom: 20px;
    &:last-child {
    margin-bottom: 0;
    }
  }
.checkOperDiv_submit_table .el-col {
    border-radius: 4px;
  }
.checkOperDiv_submit_table .bg-purple-dark {
    background: #99a9bf;
  }
.checkOperDiv_submit_table .bg-purple {
    background: #d3dce6;
  }
.checkOperDiv_submit_table .bg-purple-light {
    background: #e5e9f2;
  }
.checkOperDiv_submit_table .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
.checkOperDiv_submit_table .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

