<template>
<el-dialog title="查看" :visible.sync="checkOperVisible" width="43%" :before-close="checkOperClose">
  <div class="checkOperDiv">
    <el-steps direction="vertical" :active="3" finish-status="success" class="checkOperDiv_left"> 
      <el-step title="上报" description="**时间，**人"></el-step>
      <el-step title="派工" description="**时间，**人"></el-step>
      <el-step title="现场作业" description="**时间，**人"></el-step>
      <el-step title="效果评价" description="**时间，**人"></el-step>
    </el-steps>
    <div class="checkOperDiv_right">
      <el-table :data="tableData" border class="checkOperDiv_right_table">
        <el-table-column prop="number" label="填报次数" width="80" />
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
export default {
  props: {
    checkOperVisible: {
      type: Boolean
    },
    checkData: {
      type: Object
    }
  },
  data(){
    return{
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
.checkOperDiv_right_table {
  width: 100%;
  height: 86%;
  margin: 4% 2%;
}
.checkOperButton {
  margin: 2% 0 0 40%;
}
</style>

