<template>
  <div>
    <!--<div style="margin-top: 1px;width: 30%;">-->
      <!--<el-input placeholder="请输入搜索内容" v-model="input5" class="input-with-select">-->
        <!--&lt;!&ndash;搜过下拉框&ndash;&gt;-->
        <!--<el-select v-model="select" slot="prepend" placeholder="请选择">-->
          <!--&lt;!&ndash;根据课程名或学生搜索&ndash;&gt;-->
          <!--<el-option label="课程名" value="1"></el-option>-->
          <!--<el-option label="学生" value="2"></el-option>-->
        <!--</el-select>-->
        <!--<el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>-->
      <!--</el-input>-->
    <!--</div>-->
    <el-table
      :data="reportList"
      style="width: 100%;"
      height="600"
      @sort-change="sortFun"
    >
      <el-table-column
        label="课程名称"
        prop="title"
      >
      </el-table-column>
      <el-table-column
        label="学生"
        prop="stuName">
      </el-table-column>
      <el-table-column
        label="提交时间"
        sortable="custom"
        prop="createStamp"
        :formatter="timeFormatter"
      >
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleLook(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page ref="page" @turnPage="handleTurnPage"/>
  </div>

</template>

<script>
  import page from "@/components/page"
  import Service from "@/util/service"
  import bus from "@/assets/eventBus"
  import Moment from "moment"
  Moment.locale('zh-cn')
  export default {
    name: "reportTable",
    components: {
      page,
    },
    data() {
      return {
        reportList: [],
        pageNum: 1,
        pageSize: 10,
        order: 'id',
        desc: true,
        select: ''
      }
    },
    mounted() {
      bus.$on('updateReportTable', this.getList)
      this.getList()
    },
    watch: {
      // pageNum() {this.getList()},
      // pageSize() {this.getList()},
      // order() {this.getList()},
      // desc() {this.getList()},
    },
    methods: {
      handleTurnPage(pageNum, pageSize) {
        console.log("handle")
        this.pageNum = pageNum
        this.pageSize = pageSize
        this.getList()
      },
      getList() {
        var data = {
          // userID: Store.load('user').id,
          page: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            order: this.order,
            desc:this.desc
          }
        }
        Service.post("listReport", data, resp=>{ //从后端服务获取实验报告列表数据
          var records = resp.data.records
          this.reportList = records
          this.$refs.page.setPageInfo(resp.data.page)
        })
      },
      timeFormatter(row) {
        row.createStamp = Moment(row.createStamp,'LLLL').format('LLLL')
        return row.createStamp
      },
      sortFun(e) { //列表的排序功能实现
        this.order = e.prop
        this.desc = (e.order==='descending') //正序或倒序
        this.pageNum = 1
        this.getList() //重新获取列表
      },
      handleLook(row) { //响应查看报告按钮
        this.$router.push({name: 'report', params: {reportId: row.id}}) //跳转到实验报告界面
      },

    }

  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .p2 {
    text-indent:2em;
  }
  .el-select .el-input {
    width: 110px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
