<template>
<div class="wellsite">
  <div class="wellsite_left">
    <sapn class="wellsite_left_wellsite">xxxx井场</sapn>
    <div class="wellsite_left_dailyData">
      <p>日产液量: <span style="color:#06c">6543</span> m<sup>3</sup></p>
      <p>日注水量: <span style="color:#06c">1341</span> m<sup>3</sup></p>
      <p>电子巡检次数: <span style="color:#06c">15</span> 次</p>
    </div>
    <span class="wellsite_left_condition">
      <i class="iconfont icon-yujing_gaoliang" style="color:rgb(214, 117, 117)" />
      工况预警
    </span>
    <div class="wellsite_left_condition_details">
      <ul :style="{'marginTop':marginTop+'px'}">
        <li 
        v-for="(item,index) in conditionData" 
        :key='index' 
        style="list-style-type:none;font-size:12px;color:#666;height:22px;margin-left:-10%"
      >{{item.name}}</li>
      </ul>
    </div>
    <span class="wellsite_left_condition">
        <i class="iconfont icon-yujing_gaoliang" style="color:rgb(214, 117, 117)" />
        监控预警
    </span>
    <div class="wellsite_left_condition_details">
      <ul :style="{'marginTop':marginTop+'px'}">
        <li 
        v-for="(item,index) in conditionData" 
        :key='index' 
        style="list-style-type:none;font-size:12px;color:#666;height:22px;margin-left:-10%"
        >{{item.name}}</li>
      </ul>
    </div>
     <div class="wellsite_left_img">
      <img src="../../assets/images/monitor.jpg" style="height:80%;width:100%;margin-top:1%" />
    </div>
    <div class="wellsite_left_video">
      <div class="wellsite_left_video_container" v-for="(item,index) in 1" :key="index">
        <div><i class="iconfont icon-shexiangtou" style="color:green;font-size:30px" />正常</div>
      </div>
      <div class="wellsite_left_video_container" v-for="(item,index) in 1" :key="index">
        <div><i class="iconfont icon-shexiangtou" style="color:red;font-size:30px" />异常</div>
      </div>
    </div>
  </div>
  <div class="unattended-wellsite_well">
    <div class="unattended-wellsite_well_oilWell">
      <div class="unattended-wellsite_well_oilWell_details" v-for="(item,index) in 12" :key="index">
        <div class="unattended-wellsite_well_oilWell_details_title">XX采油井</div>
        <img src="../../assets/images/oilWell.gif" class="unattended-wellsite_well_oilWell_details_img" @click="gotoSingleWell()">
        <div class="unattended-wellsite_well_oilWell_details_dec">
          <span>当日产液: <span style="color:#06c">134</span> m<sup>3</sup></span>
          <span>动液面: <span style="color:#06c">134</span> m<sup>3</sup></span>
          <span>工况诊断: <span style="color:#06c">134</span> m<sup>3</sup></span>
        </div>
        <div class="unattended-wellsite_well_oilWell_details_bottom">异常情况: <span style="color:red">供液不足</span></div>
      </div>
    </div>
    <div class="unattended-wellsite_well_waterWell">
      <div class="unattended-wellsite_well_waterWell_details" v-for="(item,index) in 4" :key="index">
        <div class="unattended-wellsite_well_waterWell_details_title">XX注水井</div>
        <img src="../../assets/images/waterWell.png" class="unattended-wellsite_well_waterWell_details_img">
        <div class="unattended-wellsite_well_waterWell_details_dec">
          <span>当日产液: <span style="color:#06c">134</span> m<sup>3</sup></span>
          <span>动液面: <span style="color:#06c">134</span> m<sup>3</sup></span>
          <span>工况诊断: <span style="color:#06c">134</span> m<sup>3</sup></span>
        </div>
        <div class="unattended-wellsite_well_waterWell_details_bottom">异常情况: <span style="color:red">超注</span></div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      // 工况预警
      conditionData: [{
          name: "XXXX出现XXXX预警情况"
        },
        {
          name: "XXXX出现XXXX预警情况"
        },
        {
          name: "XXXX出现XXXX预警情况"
        },
        {
          name: "XXXX出现XXXX预警情况"
        },
        {
          name: "XXXX出现XXXX预警情况"
        },
      ],
      marginTop: 0,
      timer: '', // 定时器
    }
  },
  created() {
    // this.timer = setInterval(this.showNotice, 200) //100表示间隔时间，数字越大滚得越快
  },
  methods: {
    showNotice() {
      this.marginTop -= 1
      if (this.marginTop < -20) { // 滚上去36px后把前两条数据拉下来
        this.conditionData.push(this.conditionData[0])
        this.conditionData.shift()
        this.marginTop = 0
      }
    },
    // 返回采油站页面
    gotoOilStation() {
      this.$router.replace("/unattended/oilStation");
    },
    // 跳转到单井页面
    gotoSingleWell() {
      this.$router.replace("/unattended/singleWell");
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/unattended/wellsite.css";
</style>

<style>

.wellsite_left_condition_details ul li:before {
    display: inline-block;
    content: "●"; /* '\25CF' */
    padding-right: 10px;
    color: rgb(214, 117, 117);
    font-size: 20px;
}

</style>