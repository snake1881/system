<template>
  <div class="work_collect">
    <div v-if="isShow == 1" class="work_collect_item">
      <!-- 条件查询 -->
      <el-form class="work_collect_form" :model="abnormalForm" :inline="true">
        <el-form-item>
          <el-select
            v-model="abnormalForm.orgName"
            placeholder="采油站"
            clearable
            filterable
            size="medium"
          >
            <el-option
              v-for="item in orgNames"
              :key="item.oilStationId"
              :label="item.oilStationName"
              :value="item.oilStationId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="abnormalForm.formDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            size="medium"
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="abnormalForm.diagnosisLevel"
            placeholder="报警级别"
            clearable
            filterable
            size="medium"
          >
            <el-option
              v-for="item in diagnosisLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="searchWorkingCollect()"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 表格数据 -->
      <el-table
        class="work_collect_table"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="workingCollect"
        height="87%"
        border
        style="width: 100%"
        @expand-change="rowCollectInit"
        :expand-row-keys="expands"
        :row-key="getRowKeys"
        :row-style="{ height: '2px' }"
        :cell-style="{ padding: '0px' }"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column width="35" type="expand">
          <template slot-scope="scope">
            <div
              class="work_collect_item_detail"
              :key="scope.row.inddsId"
              v-loading="loadCollectLoad"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
            >
              <div v-for="(item, index) in loadCollect" :key="index">
                <span
                  style="
                    width: 200px;
                    text-align: center;
                    display: inline-block;
                  "
                  >{{ item.acquisitionTime }}</span
                >
                <span
                  style="
                    width: 200px;
                    text-align: center;
                    display: inline-block;
                    margin-left: 20px;
                  "
                  >{{ item.diagnosisResult }}</span
                >
                <el-button
                  type="text"
                  @click="details(item)"
                  style="margin-left: 20px"
                  >详情</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center"
          :index="
            (index) => {
              return index + 1 + (this.currentPage - 1) * this.pageSize;
            }
          "
        />
        <el-table-column
          prop="wellName"
          label="井号"
          width="120"
          align="center"
        />
        <el-table-column
          prop="acquisitionTime"
          label="量液时间"
          width="160"
          align="center"
        />
        <el-table-column
          prop="oilStationName"
          label="采油站"
          width="160"
          align="center"
        />
        <el-table-column prop="stroke" label="冲程" width="60" align="center" />
        <el-table-column
          prop="frequency"
          label="冲次"
          max-width="60"
          align="center"
        />
        <el-table-column
          prop="maxLoad"
          label="最大载荷"
          width="100"
          align="center"
        />
        <el-table-column
          prop="minLoad"
          label="最小载荷"
          width="100"
          align="center"
        />
        <el-table-column
          prop="diagnosisResult"
          label="诊断结果"
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="diagnosisLevel"
          label="报警级别"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.diagnosisLevel == '0'">一级</p>
            <p v-if="scope.row.diagnosisLevel == '1'">二级</p>
            <p v-if="scope.row.diagnosisLevel == '2'">三级</p>
          </template></el-table-column
        >
        <el-table-column
          prop="normalWaterCut"
          label="人工工况"
          max-width="110"
          align="center"
          ><template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="confirmResult(scope.row)"
              >人工工况</el-button>
          </template>
          ></el-table-column>
        <el-table-column
          prop="normalWaterCut"
          label="人工确认"
          max-width="110"
          align="center"
          ><template slot-scope="scope">
            <el-button
              v-if="scope.row.isConfirm == '0'"
              type="primary"
              size="small"
              @click="confirm(scope.row)"
              >请确认</el-button
            >
            <p v-if="scope.row.isConfirm == '1'">已确认</p>
          </template>
          ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="work_collect_page">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="total, prev, pager, next, jumper, sizes"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 详情 -->
    <div class="work_collect_item" v-if="isShow == 2">
      <div v-if="isShow == 2" style="margin-top: 20px"></div>
      <div class="details">
        <el-button icon="el-icon-arrow-left" type="text" @click="back()"
          >返回</el-button
        >
        <el-radio-group
          v-model="radio"
          size="small"
          style="margin-left: 25%"
          @change="radioChange"
        >
          <el-radio-button label="详情"></el-radio-button>
          <el-radio-button label="液量曲线"></el-radio-button>
          <el-radio-button label="载荷曲线"></el-radio-button>
          <el-radio-button label="功图平铺"></el-radio-button>
          <el-radio-button label="重新诊断"></el-radio-button>
        </el-radio-group>
      </div>
      <table cellspacing="0" class="work_collect_item_detail_table">
        <tr>
          <th>当前数据</th>
          <th>冲程</th>
          <th>冲次</th>
          <th>最大载荷</th>
          <th>最小载荷</th>
          <th>泵径</th>
          <th>泵深</th>
          <th>量液</th>
        </tr>
        <tr>
          <td>{{ this.detailsCollect.wellName }}</td>
          <td>{{ this.detailsCollect.stroke }}</td>
          <td>{{ this.detailsCollect.frequency }}</td>
          <td>{{ this.detailsCollect.maxLoad }}</td>
          <td>{{ this.detailsCollect.minLoad }}</td>
          <td>0</td>
          <td>0</td>
          <td>{{ this.detailsCollect.liquidProd }}</td>
        </tr>
      </table>

      <div class="work_collect_item_gt">
        <div class="work_collect_item_gt_g" id="gt1" ref="dom1" />
        <div class="work_collect_item_gt_g" id="gt2" ref="dom2" />
        <div class="work_collect_item_gt_g" id="gt3" ref="dom3" />
        <div class="work_collect_item_gt_g" id="gt4" ref="dom4" />
      </div>
      <table
        cellspacing="0"
        class="work_collect_item_detail_table"
        style="margin-top: -1%"
      >
        <tr>
          <th>诊断结论(系统)</th>
          <th>{{ this.detailsCollect.diagnosisResult }}</th>
          <th>AI诊断结论(参考)</th>
          <th>{{ this.detailsCollect.aiResult }}</th>
        </tr>
        <tr>
          <td>措施处置</td>
          <td>暂无</td>
          <td>作业设计模板</td>
          <td></td>
        </tr>
      </table>

      <div class="work_collect_item_measure">
        <div class="work_collect_item_measure_left">历史措施</div>
        <el-table
          :header-cell-style="{ background: '#E4E7ED', color: '#606266' }"
          :data="measure"
          height="100%"
          border
          style="width: 85%"
        >
          <el-table-column
            label="序号"
            type="index"
            width="180"
            align="center"
          />
          <el-table-column
            prop="finishDate"
            label="日期"
            width="360"
            align="center"
          />
          <el-table-column
            prop="operationName"
            label="措施"
            width="558"
            align="center"
          />
        </el-table>
      </div>
    </div>
    <div class="work_collect_item" v-if="isShow == 3">
      <div v-if="isShow == 3" style="margin-top: 20px"></div>
      <div v-if="isShow == 3" class="gtTile">
        <el-button icon="el-icon-arrow-left" type="text" @click="back()"
          >返回</el-button
        >
        <el-radio-group
          v-model="radio"
          size="small"
          style="margin-left: 25%"
          @change="radioChange"
        >
          <el-radio-button label="详情"></el-radio-button>
          <el-radio-button label="液量曲线"></el-radio-button>
          <el-radio-button label="载荷曲线"></el-radio-button>
          <el-radio-button label="功图平铺"></el-radio-button>
          <el-radio-button label="重新诊断"></el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="isShow == 3" class="tile_echarts">
        <div
          v-if="this.tableData.length > 0"
          class="chart"
          id="myChart0"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.tableData.length > 1"
          class="chart"
          id="myChart1"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.tableData.length > 2"
          class="chart"
          id="myChart2"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.tableData.length > 3"
          class="chart"
          id="myChart3"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <br />
        <div
          v-if="this.tableData.length > 4"
          class="chart"
          id="myChart4"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.tableData.length > 5"
          class="chart"
          id="myChart5"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.tableData.length > 6"
          class="chart"
          id="myChart6"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.tableData.length > 7"
          class="chart"
          id="myChart7"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.logForm.pageSize === 16 && this.tableData.length > 8"
          class="chart"
          id="myChart8"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.logForm.pageSize === 16 && this.tableData.length > 9"
          class="chart"
          id="myChart9"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.logForm.pageSize === 16 && this.tableData.length > 10"
          class="chart"
          id="myChart10"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.logForm.pageSize === 16 && this.tableData.length > 11"
          class="chart"
          id="myChart11"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.logForm.pageSize === 16 && this.tableData.length > 12"
          class="chart"
          id="myChart12"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.logForm.pageSize === 16 && this.tableData.length > 13"
          class="chart"
          id="myChart13"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.logForm.pageSize === 16 && this.tableData.length > 14"
          class="chart"
          id="myChart14"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
        <div
          v-if="this.logForm.pageSize === 16 && this.tableData.length > 15"
          class="chart"
          id="myChart15"
          :style="{ width: '24.5%', height: '250px' }"
        ></div>
      </div>
      <!-- 分页 -->
      <div class="tile_page">
        <el-pagination
          :current-page.sync="logForm.currentPage"
          :page-size="logForm.pageSize"
          :total="logForm.total"
          :page-sizes="[8, 16]"
          layout="total, prev, pager, next, jumper, sizes"
          @size-change="handleSizeChangeGt"
          @current-change="handleCurrentChangeGt"
        />
      </div>
    </div>
    <div class="work_collect_item" v-if="isShow == 4">
      <div v-if="isShow == 4" style="margin-top: 20px"></div>
      <div v-if="isShow == 4" class="amountLiquid">
        <el-button icon="el-icon-arrow-left" type="text" @click="back()"
          >返回</el-button
        >
        <el-radio-group
          v-model="radio"
          size="small"
          style="margin-left: 25%"
          @change="radioChange"
        >
          <el-radio-button label="详情"></el-radio-button>
          <el-radio-button label="液量曲线"></el-radio-button>
          <el-radio-button label="载荷曲线"></el-radio-button>
          <el-radio-button label="功图平铺"></el-radio-button>
          <el-radio-button label="重新诊断"></el-radio-button>
        </el-radio-group>
      </div>
      <div :style="{ height: '100px' }"></div>
      <div>
        <div
          v-if="isShow == 4"
          class="amountLiquidChart"
          id="amountLiquidChart"
          :style="{ width: '100%', height: '400px' }"
        ></div>
      </div>
    </div>
    <div class="work_collect_item" v-if="isShow == 5">
      <div v-if="isShow == 5" style="margin-top: 20px"></div>
      <div v-if="isShow == 5" class="loadLine">
        <el-button icon="el-icon-arrow-left" type="text" @click="back()"
          >返回</el-button
        >
        <el-radio-group
          margin:center
          v-model="radio"
          size="small"
          style="margin-left: 25%"
          @change="radioChange"
        >
          <el-radio-button label="详情"></el-radio-button>
          <el-radio-button label="液量曲线"></el-radio-button>
          <el-radio-button label="载荷曲线"></el-radio-button>
          <el-radio-button label="功图平铺"></el-radio-button>
          <el-radio-button label="重新诊断"></el-radio-button>
        </el-radio-group>
      </div>
      <div :style="{ height: '100px' }"></div>
      <div>
        <div
          v-if="isShow == 5"
          class="loadChart"
          id="loadChart"
          :style="{ width: '100%', height: '400px' }"
        ></div>
      </div>
    </div>
    <el-dialog
      title="人工确认"
      :visible.sync="confirmVisible"
      width="36%"
      :before-close="confirmClose"
    >
      <div class="confirmDiv">
        <el-form :model="confirmDate" label-width="80px">
          <el-form-item label="井号">
            <el-input v-model="confirmDate.wellName" />
          </el-form-item>
          <el-form-item label="诊断结果">
            <el-input v-model="confirmDate.diagnosisResult" />
          </el-form-item>
          <el-form-item label="措施">
            <el-select v-model="confirmDate.measureContent">
              <el-option
                  v-for="item in confirmOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-button
        type="primary"
        @click="saveConfirm(confirmDate), confirmClose()"
        class="confirmButton"
        >提交</el-button
      >
      <el-button type="info" @click="confirmClose()">取消</el-button>
    </el-dialog>
    <!--人工工况-->
    <el-dialog
      title="人工工况"
      :visible.sync="confirmResultVisible"
      width="36%"
      :before-close="confirmResultClose"
    >
      <div class="confirmResultDiv">
        <el-form :model="confirmResultDate" label-width="80px">
          <el-form-item label="井号">
            <el-input v-model="confirmResultDate.wellName" />
          </el-form-item>
          <el-form-item label="诊断结果">
            <el-input v-model="confirmResultDate.diagnosisResult" />
          </el-form-item>
          <el-form-item label="人工诊断">
            <el-input v-model="confirmResultDate.confirmResult" />
          </el-form-item>
        </el-form>
      </div>
      <el-button
        type="primary"
        @click="saveConfirmResult(confirmResultDate), confirmResultClose()"
        class="confirmButton"
        >提交</el-button
      >
      <el-button type="info" @click="confirmResultClose()">取消</el-button>
    </el-dialog>
  </div>
</template>
<script>
import template from "../../assessment/template.vue";
let echarts = require("echarts/lib/echarts");
export default {
  components: { template },
  data() {
    return {
      //选择框
      radio: "详情",
      // 工况汇总数据
      workingCollect: [],
      // 当前展开行数据
      loadCollect: [],
      // 历史措施
      measure: [],
      // 表单数据
      abnormalForm: {
        // 采油站
        orgName: "",
        // 日期选择
        formDate: "",
        // 报警级别
        diagnosisLevel: "",
      },
      //
      diagnosisLevelOptions: [
        {
          value: "0",
          label: "一级",
        },
        {
          value: "1",
          label: "二级",
        },
        {
          value: "2",
          label: "三级",
        },
      ],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
      // 展开行加载动画
      loadCollectLoad: true,
      // 采油站数据
      orgNames: [],
      // 默认展示内容
      isShow: 1,
      // 工况详情数据
      detailsCollect: [],
      // 设置row-key只展示一行
      expands: [],
      // 功图叠加对话框标记
      dialogTableVisible: false,
      // 功图叠加加载动画
      dialogLoading: false,
      // 功图叠加默认显示内容
      dialogGt: "暂无数据",
      // 功图叠加对话框搜索框
      dialogForm: {
        // 日期段
        startDate: "",
      },
      //
      tableData: [],
      //液量曲线页面初始化数据
      amountLiquidData: [],
      //液量曲线页面处理后数据
      amountArray1: [[]],
      amountArray2: [[]],
      amountArray3: [[]],
      //载荷曲线页面初始化数据
      loadData: [],
      loadArray1: [[]],
      loadArray2: [[]],
      loadArray3: [[]],
      // tableData1: [],
      coordinates: [[]],
      previewGtmjVisible: false,
      previewGtmjData: {},
      logForm: {
        currentPage: 1,
        pageSize: 8,
        total: 0,
      },
      //人工确认
      confirmVisible: false,
      confirmDate: {},
      confirmOptions: [
        {
          value: "井筒反洗;检泵",
          label: "井筒反洗;检泵",
        },
        {
          value: "周期检泵",
          label: "周期检泵",
        },
        {
          value: "调小防冲距",
          label: "调小防冲距",
        },
        {
          value: "检泵;更换新油管",
          label: "检泵;更换新油管",
        },
      ],
      //人工工况
      confirmResultVisible: false,
      confirmResultDate: {},
    };
  },
  created() {
    this.workingCollectInit();
    this.selectOrgName();
  },
  methods: {
    // 数据初始化
    workingCollectInit() {
      // this.loading = true;
      if (this.abnormalForm.orgName == null) {
        this.abnormalForm.orgName = "";
      }
      if (this.abnormalForm.formDate == null) {
        this.abnormalForm.formDate = "";
      }
      this.getRequest(
        "/OilDaily/amountLiquid?acquisitionTime=" +
          this.abnormalForm.formDate +
          "&current=" +
          this.currentPage +
          "&diagnosisLevel=" +
          this.abnormalForm.diagnosisLevel +
          "&oilStationId=" +
          this.abnormalForm.orgName +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        if (resp) {
          this.workingCollect = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.loading = false;
          console.log(this.workingCollect);
          // this.getIndex();
        }
      });
    },
    // 只展开一行放入当前行id
    getRowKeys(row) {
      return row.inddsId;
    },
    // 控制展开与关闭行
    rowCollectInit(row, expandedRows) {
      //只展开一行
      if (expandedRows.length) {
        //说明展开了
        this.expands = [];
        if (row) {
          //只展开当前行wellCommonName
          this.expands.push(row.inddsId);
          this.loadCollect = [];
          this.loadCollectLoad = true;
          this.getRequest(
            "/mountLiquid/liquidList?endTime=" +
              row.acquisitionTime +
              "&wellId=" +
              row.wellId
          ).then((resp) => {
            this.loadCollectLoad = false;
            if (resp) {
              this.loadCollect = resp.data;
            }
          });
        }
      } else {
        //说明收起了
        this.expands = [];
      }
    },
    // 表单条件查询
    searchWorkingCollect() {
      if (this.abnormalForm.orgName == null) {
        this.abnormalForm.orgName = "";
      }
      if (this.abnormalForm.formDate == null) {
        this.abnormalForm.formDate = "";
      }
      console.log("begin!");
      this.getRequest(
        "/OilDaily/amountLiquid?acquisitionTime=" +
          this.abnormalForm.formDate +
          "&current=" +
          this.currentPage +
          "&diagnosisLevel=" +
          this.abnormalForm.diagnosisLevel +
          "&oilStationId=" +
          this.abnormalForm.orgName +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        if (resp) {
          this.workingCollect = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          // this.getIndex();
        }
      });
    },
    // 跳转至详情页面
    details(val) {
      this.isShow = 2;
      if (val == 1) {
        this.detailsCollect = this.detailsCollect;
      } else {
        this.detailsCollect = val;
      }
      setTimeout(() => {
        this.showGT();
      }, 10);
      // 查询该井的历史措施
      this.getRequest(
        "/operation/operationInfo/listOperation?state=1&wellId=" +
          this.detailsCollect.wellId
      ).then((resp) => {
        if (resp) {
          console.log(resp);
          this.measure = resp.data;
        }
      });
    },
    // 查询该井的历史措施
    // measureInit() {
    //   this.getRequest(
    //     "/operation/operationInfo/listOperation?state=1&wellId=" +
    //       detailsCollect.wellId
    //   ).then((resp) => {
    //     if (resp) {
    //       console.log(resp);
    //       this.measure = resp.data;
    //     }
    //   });
    // },
    //功图平铺页面数据初始化
    gtDataInit() {
      this.getRequest(
        "/diagnosis/knowledge/gttile/selectByTerm?current=" +
          this.logForm.currentPage +
          "&pageSize=" +
          this.logForm.pageSize +
          "&wellId=" +
          this.detailsCollect.wellId
      ).then((resp) => {
        // this.loading = false;
        if (resp) {
          this.tableData = [];
          this.tableData = resp.data.records;
          this.logForm.total = resp.data.total;
          this.logForm.currentPage = resp.data.current;
          this.logForm.pageSize = resp.data.size;
          for (var i = 0; i < this.tableData.length; i++) {
            this.coordinates = [[]];
            var displacementArray = this.tableData[i].displacementSet.split(
              ";"
            );
            var disploadArray = this.tableData[i].loadSet.split(";");
            for (var j = 0; j < displacementArray.length; j++) {
              this.coordinates[j] = [];
              this.coordinates[j][0] = parseFloat(displacementArray[j]);
              this.coordinates[j][1] = parseFloat(disploadArray[j]);
            }
            this.drawLine2(i);
          }
        }
      });
    },
    //功图平铺页面绘制一个图像
    drawLine2(val) {
      // 基于准备好的dom，初始化echarts实例
      let dom = document.getElementById("myChart" + val);
      let myChart = this.$echarts.init(dom);
      // 绘制图表
      myChart.setOption(
        {
          title: [
            {
              x: "center",
              text: this.tableData[val].acquisitionTime,
              top: "7%",
              textStyle: {
                fontSize: 13,
                fontStyle: "normal",
                fontWeight: "bolder",
              },
            },
          ],

          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "line", // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
              return (
                "<div><p>位移：" +
                params[0].value[0] +
                "M</p>" +
                "<p>载荷：" +
                params[0].value[1] +
                "KN</p>" +
                "</div>"
              );
            },
          },
          grid: {
            left: "6%",
            right: "3%",
            bottom: "15%",
            top: "20%",
            containLabel: true,
          },
          xAxis: {
            name: "位移(M)",
            nameLocation: "middle",
            min: 0,
            max: 4,
            type: "value",
            axisLine: { onZero: false },
            nameTextStyle: {
              padding: [8, 0, 0, 0],
              fontSize: 10,
            },
          },
          yAxis: {
            name: "载荷(KN)",
            nameLocation: "middle",
            // min: 0,
            // max: 100,
            type: "value",
            axisLine: { onZero: false },
            nameTextStyle: {
              padding: [0, 0, 8, 0],
              fontSize: 10,
            },
          },
          series: [
            {
              symbol: "none",
              data: this.coordinates,
              type: "line",
              smooth: true,
              lineStyle: {
                width: 1.5,
              },
            },
          ],
        },
        true
      );
    },
    //详情页面将坐标数据串处理为坐标点
    coordinate1(val) {
      this.coordinates = [[]];
      var displacementArray = this.tableData[val].displacementSet.split(";");
      var disploadArray = this.tableData[val].loadSet.split(";");
      for (var i = 0; i < displacementArray.length; i++) {
        this.coordinates[i] = [];
        this.coordinates[i][0] = parseFloat(displacementArray[i]);
        this.coordinates[i][1] = parseFloat(disploadArray[i]);
      }
      return this.coordinates;
    },
    //功图平铺绘制多个图
    step() {
      for (var i = 0; i < this.tableData.length; i++) {
        this.coordinates = [[]];
        var displacementArray = this.tableData[i].displacementSet.split(";");
        var disploadArray = this.tableData[i].loadSet.split(";");
        for (var j = 0; j < displacementArray.length; j++) {
          this.coordinates[j] = [];
          this.coordinates[j][0] = parseFloat(displacementArray[j]);
          this.coordinates[j][1] = parseFloat(disploadArray[j]);
        }
        this.drawLine2(i);
      }
    },
    // 详情页面绘制一个图像
    showGT() {
      // 获取三个功图的坐标数据
      //
      this.getRequest(
        "/mountLiquid/liquidList?endTime=" +
          this.detailsCollect.acquisitionTime +
          "&wellId=" +
          this.detailsCollect.wellId
      ).then((resp) => {
        if (resp) {
          this.tableData = resp.data;
          this.coordinate(this.tableData[0]);
          this.drawLine(0);
          this.coordinate(this.tableData[1]);
          this.drawLine(1);
          this.coordinate(this.tableData[2]);
          this.drawLine(2);
          this.coordinate(this.tableData[3]);
          this.drawLine(3);
        }
      });
      this.getRequest(
        "/operation/operationInfo/listOperation?state=1&wellId=" +
          this.detailsCollect.wellId
      ).then((resp) => {
        if (resp) {
          // this.measure = resp.data;
          console.log(resp);
        }
      });
    },
    //详情页面绘制四个图像
    drawLine(val) {
      // 基于准备好的dom，初始化echarts实例
      let dom = "";
      if (val === 0) {
        dom = document.getElementById(this.$refs.dom1.id);
      } else if (val === 1) {
        dom = document.getElementById(this.$refs.dom2.id);
      } else if (val === 2) {
        dom = document.getElementById(this.$refs.dom3.id);
      } else if (val === 3) {
        dom = document.getElementById(this.$refs.dom4.id);
      }
      let myChart = echarts.init(dom);
      // 绘制图表
      myChart.setOption({
        title: {
          x: "center",
          text:
            "井号：" +
            this.tableData[val].wellName +
            "  时间：" +
            this.tableData[val].acquisitionTime,
          top: "7%",
          textStyle: {
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: "bolder",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            return (
              "<div><p>位移：" +
              params[0].value[0] +
              "M</p>" +
              "<p>载荷：" +
              params[0].value[1] +
              "KN</p>" +
              "</div>"
            );
          },
        },
        grid: {
          left: "6%",
          right: "3%",
          bottom: "15%",
          top: "20%",
          containLabel: true,
        },
        xAxis: {
          name: "位移(M)",
          nameLocation: "middle",
          min: 0,
          max: 4,
          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [10, 0, 0, 0],
            fontSize: 10,
          },
        },
        yAxis: {
          name: "载荷(KN)",
          nameLocation: "middle",
          // min: 0,
          // max: 100,
          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [0, 0, 8, 0],
            fontSize: 10,
          },
        },
        series: [
          {
            symbol: "none",
            data: this.coordinates,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
    },
    //详情页面将坐标数据串处理为坐标点
    coordinate(val) {
      //每次处理之前保证坐标数组集合为空
      this.coordinates = [[]];
      var displacementArray = val.displacementSet.split(";");
      var disploadArray = val.loadSet.split(";");
      for (var i = 0; i < displacementArray.length; i++) {
        this.coordinates[i] = [];
        this.coordinates[i][0] = parseFloat(displacementArray[i]);
        this.coordinates[i][1] = parseFloat(disploadArray[i]);
      }
      return this.coordinates;
    },
    // 返回工况汇总
    back() {
      this.isShow = 1;
    },
    //单选框改变方法
    radioChange() {
      if (this.radio === "详情") {
        this.details(1);
      } else if (this.radio === "功图平铺") {
        this.previewGtmj();
      } else if (this.radio === "液量曲线") {
        console.log("进入液量曲线页面");
        this.amountLiquid();
      } else if (this.radio === "载荷曲线") {
        this.intoLoad();
      }
    },
    //跳转液量曲线页面调用方法
    amountLiquid() {
      this.isShow = 4;
      console.log("进入液量曲线页面");
      this.amountLiquidInit();
    },
    //液量曲线数据初始化
    amountLiquidInit() {
      this.getRequest(
        "/OilDaily/getDailyList?endTime=" +
          this.detailsCollect.acquisitionTime +
          "&startTime=" +
          "&wellId=" +
          this.detailsCollect.wellId
      ).then((resp) => {
        // this.loading = false;
        if (resp) {
          this.amountLiquidData = [];
          this.amountLiquidData = resp.data;
          this.amountLiquidDraw();
        }
      });
    },
    //液量曲线页面处理数据
    amountLiquidCoordinatiate() {
      // console.log("开始处理数据");
      // console.log(this.amountLiquidData);
      // var array1=[[]];
      // var array2=[[]];
      // var array3=[[]];
      // this.amountArray1 = [[]];
      // this.amountArray2 = [[]];
      // this.amountArray3 = [[]];
      // for (var i = 0; i < this.amountLiquidData.length; i++) {
      //   this.amountArray1[i] = [];
      //   this.amountArray2[i] = [];
      //   this.amountArray3[i] = [];
      //   this.amountArray1[i][0] = this.amountLiquidData[i].oilProdDate;
      //   this.amountArray2[i][0] = this.amountLiquidData[i].oilProdDate;
      //   this.amountArray3[i][0] = this.amountLiquidData[i].oilProdDate;
      //   this.amountArray1[i][1] = this.amountLiquidData[i].drLiquidProd;
      //   this.amountArray2[i][1] = this.amountLiquidData[i].drWaterCut;
      //   this.amountArray3[i][1] = this.amountLiquidData[i].drOilProd;
      //   console.log(this.amountArray1);
      //   console.log(this.amountArray2);
      //   console.log(this.amountArray3);
      // }
      // console.log(this.amountArray1);
      // console.log(this.amountArray2);
      // console.log(this.amountArray3);
      // console.log("液量曲线数据处理完成");
    },
    //液量曲线页面绘制图像
    amountLiquidDraw() {
      // 基于准备好的dom，初始化echarts实例
      var array1 = [[]];
      var array2 = [[]];
      var array3 = [[]];
      this.amountArray1 = [[]];
      this.amountArray2 = [[]];
      this.amountArray3 = [[]];
      for (var i = 0; i < this.amountLiquidData.length; i++) {
        this.amountArray1[i] = [];
        this.amountArray2[i] = [];
        this.amountArray3[i] = [];
        this.amountArray1[i][0] = this.amountLiquidData[i].oilProdDate;
        this.amountArray2[i][0] = this.amountLiquidData[i].oilProdDate;
        this.amountArray3[i][0] = this.amountLiquidData[i].oilProdDate;
        this.amountArray1[i][1] = this.amountLiquidData[i].drLiquidProd;
        this.amountArray2[i][1] = this.amountLiquidData[i].drWaterCut / 100;
        this.amountArray3[i][1] = this.amountLiquidData[i].drOilProd;
      }
      console.log("液量曲线数据处理完成");
      let myChart = this.$echarts.init(
        document.getElementById("amountLiquidChart")
      );
      // 绘制图表
      myChart.setOption({
        title: {
          x: "center",
          text: this.detailsCollect.wellName + "号井  " + "液量曲线",
          top: "7%",
          textStyle: {
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: "bolder",
          },
          subtext: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            return (
              "<div><p>时间：" +
              params[0].value[0] +
              "</p>" +
              "<p>产液量：" +
              params[0].value[1] +
              "M<sup>3</sup><p>含水率：" +
              params[1].value[1] * 100 +
              "%<p>产油：" +
              params[2].value[1] +
              "M<sup>3</sup></p>" +
              "</div>"
            );
          },
        },
        // toolbox: {
        //   left: "right",
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: "none",
        //     },
        //     restore: {},
        //     saveAsImage: {},
        //   },
        // },
        // dataZoom: [
        //   {
        //     startValue: "2014-06-01",
        //   },
        //   {
        //     type: "inside",
        //   },
        // ],
        legend: {
          data: ["产液量", "含水率", "产油"],
          orient: "vertical",
          left: "80%",
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "20%",
          containLabel: true,
        },
        xAxis: {
          nameLocation: "middle",
          type: "time",
        },
        yAxis: {
          name: "动液面(M)",
          nameLocation: "middle",
          nameGap: 30,
          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [0, 0, 6, 0],
            fontSize: 10,
          },
        },
        series: [
          {
            name: "产液量",
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#ed6741",
              width: 2,
            },
            data: this.amountArray1,
          },
          {
            name: "含水率",
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#57c5d9",
              width: 2,
            },
            data: this.amountArray2,
          },
          {
            name: "产油",
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#2670f7",
              width: 2,
            },
            data: this.amountArray3,
          },
        ],
      });
    },
    //跳转至载荷曲线页面
    intoLoad() {
      this.isShow = 5;
      this.loadInit();
    },
    //载荷曲线数据初始化
    loadInit() {
      this.getRequest(
        "/diagnosis/knowledge/gttile/loadList?endTime=" +
          this.detailsCollect.acquisitionTime +
          "&startTime=" +
          "&wellId=" +
          this.detailsCollect.wellId
      ).then((resp) => {
        // this.loading = false;
        if (resp) {
          this.loadData = [];
          console.log(resp.data);
          this.loadData = resp.data;
          console.log(this.loadData);
          this.loadDraw();
        }
      });
    },
    // laodCoordinates() {
    //   this.amountArray = [[[]]];
    //   this.amountArray[0] = [[]];
    //   this.amountArray[1] = [[]];
    //   this.amountArray[2] = [[]];
    //   for (var i = 0; i < this.amountLiquidData.length; i++) {
    //     this.amountArray[0][i] = [];
    //     this.amountArray[1][i] = [];
    //     this.amountArray[2][i] = [];
    //     this.data[0][i][0] = this.amountLiquidData[i].prodDate;
    //     this.data[1][i][0] = this.amountLiquidData[i].prodDate;
    //     this.data[2][i][0] = this.amountLiquidData[i].prodDate;
    //     this.data[0][i][1] = this.amountLiquidData[i].dym;
    //     this.data[1][i][1] = this.amountLiquidData[i].dym;
    //     this.data[2][i][1] = this.amountLiquidData[i].dym;
    //   }
    //   return this.amountArray;
    // },
    //载荷曲线数据处理并绘图
    loadDraw() {
      this.loadArray1 = [[]];
      this.loadArray2 = [[]];
      this.loadArray3 = [[]];
      for (var i = 0; i < this.loadData.length; i++) {
        this.loadArray1[i] = [];
        this.loadArray2[i] = [];
        this.loadArray3[i] = [];
        this.loadArray1[i][0] = this.loadData[i].time;
        this.loadArray2[i][0] = this.loadData[i].time;
        this.loadArray3[i][0] = this.loadData[i].time;
        this.loadArray1[i][1] = this.loadData[i].avgMaxLoad;
        this.loadArray2[i][1] = this.loadData[i].avgMinLoad;
        this.loadArray3[i][1] = this.loadData[i].loadDiffer;
        // console.log(this.loadArray1);
        // console.log(this.loadArray1);
        // console.log(this.loadArray1);
        let myChart = this.$echarts.init(document.getElementById("loadChart"));
        // 绘制图表
        myChart.setOption({
          title: {
            x: "center",
            text: this.detailsCollect.wellName + "号井  " + "载荷曲线",
            top: "7%",
            textStyle: {
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: "bolder",
            },
            subtext: "",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "line", // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
              return (
                "<div><p>时间：" +
                params[0].value[0] +
                "</p>" +
                "<p>最大载荷：" +
                params[0].value[1] +
                "KN<p>最小载荷：" +
                params[1].value[1] +
                "KN<p>载荷差载荷：" +
                params[2].value[1] +
                "KN</p>" +
                "</div>"
              );
            },
          },
          // toolbox: {
          //   left: "right",
          //   feature: {
          //     dataZoom: {
          //       yAxisIndex: "none",
          //     },
          //     restore: {},
          //     saveAsImage: {},
          //   },
          // },
          // dataZoom: [
          //   {
          //     startValue: "2014-06-01",
          //   },
          //   {
          //     type: "inside",
          //   },
          // ],
          legend: {
            data: ["最大载荷", "最小载荷", "载荷差"],
            orient: "vertical",
            left: "80%",
          },
          grid: {
            left: "3%",
            right: "3%",
            bottom: "15%",
            top: "20%",
            containLabel: true,
          },
          xAxis: {
            nameLocation: "middle",
            type: "time",
          },
          yAxis: {
            name: "载荷(KN)",
            nameLocation: "middle",
            nameGap: 30,
            type: "value",
            axisLine: { onZero: false },
            nameTextStyle: {
              padding: [0, 0, 6, 0],
              fontSize: 10,
            },
          },
          series: [
            {
              name: "最大载荷",
              type: "line",
              smooth: true,
              lineStyle: {
                color: "#2670f7",
                width: 2,
              },
              data: this.loadArray1,
            },
            {
              name: "最小载荷",
              type: "line",
              smooth: true,
              lineStyle: {
                color: "#ed6741",
                width: 2,
              },
              data: this.loadArray2,
            },
            {
              name: "载荷差",
              type: "line",
              smooth: true,
              lineStyle: {
                color: "#fbe268",
                width: 2,
              },
              data: this.loadArray3,
            },
          ],
        });
      }
    },
    //跳转载荷曲线调用方法
    // loadLine() {
    //   this.isShow = 5;
    // },
    //跳转功图平铺页面调用方法
    previewGtmj() {
      this.isShow = 3;
      this.gtDataInit();
      // setTimeout(() => {
      //   this.step();
      // }, 10);
      // this.previewGtmjData = this.detailsCollect;
      // // this.previewGtmjVisible = true;
    },
    // 关闭功图
    previewGtmjClose() {
      this.previewGtmjVisible = false;
    },
    // 查询所有采油站信息
    selectOrgName() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        if (resp) {
          this.orgNames = resp.data;
        }
      });
    },
    //人工确认弹出页面
    confirm(val) {
      this.confirmVisible = true;
      this.confirmDate = val;
      console.log(val);
    },
    confirmClose() {
      this.confirmVisible = false;
    },
    //人工确认
    saveConfirm(val) {
      this.putRequest(
        "/diagnosis/knowledge/gttile/updateConfirmById",
        val
      ).then((resp) => {
        if (resp) {
          this.$message({
            message: "确认成功!",
            type: "success",
          });
          this.workingCollectInit();
        } else {
          this.$message.error("确认失败，请重新确认!");
        }
      });
    },

    //人工工况弹出页面
    confirmResult(val) {
      this.confirmResultVisible = true;
      this.confirmResultDate = val;
    },
    confirmResultClose() {
      this.confirmResultVisible = false;
    },
    //人工工况确认 
    saveConfirmResult(val) {
      console.log(this.confirmResultDate);
      this.postRequest(
        "/OilDaily/confirmResult?confirmResult="+
        this.confirmResultDate.confirmResult + 
        "&inddsId="+
        this.confirmResultDate.inddsId
      ).then((resp) => {
        if (resp) {
          this.$message({
            message: "人工工况确认成功!",
            type: "success",
          });
          this.workingCollectInit();
        } else {
          this.$message.error("人工工况确认失败，请重新确认!");
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.workingCollectInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.workingCollectInit();
    },
    // 功图平铺分页，页码大小改变
    handleSizeChangeGt(val) {
      this.logForm.pageSize = val;
      this.gtDataInit();
      setTimeout(() => {
        this.step();
      }, 10);
      this.gtDataInit();
    },
    // 功图平铺分页，当前页改变
    handleCurrentChangeGt(val) {
      this.logForm.currentPage = val;
      this.gtDataInit();
      setTimeout(() => {
        this.step();
      }, 10);
      this.gtDataInit();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/workingCollect.css";
.confirmDiv {
  height: 320px;
  overflow: auto;
}
.confirmDiv .el-input {
  width: 400px;
  height: 2px;
}
.confirmButton {
  margin: 0 0 10px 160px;
}
.confirmResultDiv {
  height: 320px;
  overflow: auto;
}
.confirmResultDiv .el-input {
  width: 400px;
  height: 2px;
}
</style>
