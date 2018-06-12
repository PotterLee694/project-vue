<template>
  <div>
    <el-table
      :data="needReportList"
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
        label="课程时间"
        sortable="custom"
        prop="courseTime"
        :formatter="timeFormatter"
      >
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.row)">填写</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page ref="page" @turnPage="handleTurnPage"/>
  </div>

</template>

<script>
  import page from "@/components/page"
  import Service from "@/util/service"
  import Moment from "moment"
  Moment.locale('zh-cn')
  export default {
    name: "needReportTable",
    components: {
      page,
    },
    data() {
      return {
        needReportList: [
          {title: "课程1", courseTime: '2018-05-21 21:45:40.0'},
          {title: "课程2", courseTime: '2018-05-21 22:45:40.0'},
          {title: "课程8", courseTime: '2018-05-21 23:45:40.0'},
        ],
        pageNum: 1,
        pageSize: 10,
        order: 'id',
        desc: true,
        select: ''
      }
    },
    mounted() {

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
        Service.post("listCourse", data, resp=>{
          var records = resp.data.records
          // this.needReportList = records
          this.$refs.page.setPageInfo(resp.data.page)
        })
      },
      timeFormatter(row) {
        row.courseTime= Moment(row.courseTime,'LLLL').format('LLLL')
        return row.courseTime
      },
      sortFun(e) {
        this.order = e.prop
        this.desc = (e.order==='descending')
        this.pageNum = 1
        this.getList()
      },
      handleLook(row) {
        this.$notify.info({message: row.id})

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
