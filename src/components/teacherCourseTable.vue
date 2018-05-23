<template>
  <div>
    <el-table
      :data="courseList"
      style="width: 100%"
      max-height="800"
      @sort-change="sortFun"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="课程编号：">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="课程名称：">
              <span>{{ props.row.title}}</span>
            </el-form-item>
            <el-form-item label="课程描述：">
              <span>{{ props.row.description}}</span>
            </el-form-item>
            <el-form-item label="授课教师：">
              <span>{{ props.row.teachers}}</span>
            </el-form-item>
            <el-form-item label="课程时间：">
              <span>{{ props.row.courseTime}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="课程编号"
        prop="id"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        label="课程名称"
        prop="title">
      </el-table-column>
      <el-table-column
        label="授课教师"
        prop="teachers">
      </el-table-column>
      <el-table-column
        label="课程时间"
        sortable="custom"
        prop="courseTime"
        :formatter="timeFormatter"
      >
      </el-table-column>
    </el-table>
    <page ref="page" @turnPage="handleTurnPage"/>
  </div>

</template>

<script>
  import page from "@/components/page"
  import Service from "@/util/service"
  import Store from "@/util/store"
  import Moment from "moment"
  Moment.locale('zh-cn')
    export default {
      name: "teacherCourseTable",
      components: {
        page,
      },
      data() {
        return {
          courseList: [],
          pageNum: 1,
          pageSize: 10,
          order: 'id',
          desc: false,
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
            userID: Store.load('user').id,
            page: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              order: this.order,
              desc:this.desc
            }
          }
          Service.post("listCourse", data, resp=>{
            var records = resp.data.records
            this.courseList = records
            this.$refs.page.setPageInfo(resp.data.page)
          })
        },
        timeFormatter(row) {
          row.courseTime = Moment(row.courseTime,'LLLL').format('LLLL')
          return row.courseTime
        },
        sortFun(e) {
          this.order = e.prop
          this.desc = (e.order==='descending')?true:false
          this.pageNum = 1
          this.getList()
        },

      }

    }
</script>

<style scoped>
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
    width: 50%;
  }
</style>
