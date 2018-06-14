<template>
  <div>
    <!--<div style="margin-top: 1px;width: 30%;">-->
      <!--<el-input placeholder="请输入搜索内容" v-model="input5" class="input-with-select">-->
        <!--<el-select v-model="select" slot="prepend" placeholder="请选择">-->
          <!--<el-option label="课程名" value="1"></el-option>-->
          <!--<el-option label="授课教师" value="2"></el-option>-->
        <!--</el-select>-->
        <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
      <!--</el-input>-->
    <!--</div>-->
    <el-table
      :data="courseList"
      style="width: 100%;"
      height="600"
      @sort-change="sortFun"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p class="p2">{{ props.row.description}}</p>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--label="课程编号"-->
        <!--prop="id"-->
        <!--sortable="custom"-->
      <!--&gt;-->
      <!--</el-table-column>-->
      <el-table-column
        label="课程名称"
        prop="title"
      >
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
      <el-table-column
        prop="filter"
        label="课程状态"
        :filters="[{ text: '未开始', value: false }, { text: '已结束', value: true }]"
        :filter-method="filterOver"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.courseOver === true ? 'primary' : 'success'"
            disable-transitions>{{scope.row.courseOver === true ? '已结束' : '未开始'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button v-bind:disabled="scope.row.owner !== user.id"
            size="mini"
            @click="handleMap(scope.row)">模板</el-button>
          <el-button v-bind:disabled="scope.row.owner !== user.id"
            size="mini"
            @click="handleUpdate(scope.row)">修改</el-button>
          <el-button v-bind:disabled="scope.row.owner !== user.id"
            size="mini"
            type="danger"
            @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page ref="page" @turnPage="handleTurnPage"/>
    <course-mapper dialogTitle="绑定模板" ref="courseMapper"/>
    <course-editor dialogTitle="修改实验课程" ref="courseEditor"/>
  </div>

</template>

<script>
  import page from "@/components/page"
  import Service from "@/util/service"
  import Store from "@/util/store"
  import Moment from "moment"
  import courseMapper from "@/components/courseMapper"
  import courseEditor from '@/components/courseEditor'
  Moment.locale('zh-cn')
    export default {
      name: "manageCourseTable",
      components: {
        page,
        courseMapper,
        courseEditor,
      },
      data() {
        return {
          user: {
            id: 0,
            userName: '',
          },
          courseList: [],
          pageNum: 1,
          pageSize: 10,
          order: 'id',
          desc: true,
          select: ''
        }
      },
      mounted() {
        this.user.id = Store.load('user').id
        this.user.userName = Store.load('user').userName
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
          this.desc = (e.order==='descending')
          this.pageNum = 1
          this.getList()
        },
        resetTable() {
          this.pageNum = 1
          this.order = 'id'
          this.desc = true
          this.getList()
        },
        filterOver(value, row) {
          return row.courseOver === value;
        },
        handleMap(row) {

          this.$refs.courseMapper.form.courseId = row.id
          this.$refs.courseMapper.open()
        },
        handleUpdate(row) {
          this.$refs.courseEditor.form.id = row.id
          console.log("id====" + this.$refs.courseEditor.form.id)
          this.$refs.courseEditor.fresh()
          this.$refs.courseEditor.open()
        },
        handleDel(row) { //删除时的二次确认框
          let that = this
          this.$confirm('此操作将删除该课程, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            Service.post('delCourse',{id: row.id}, resp=>{
              that.getList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }) //调用后端服务删除接口
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
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
