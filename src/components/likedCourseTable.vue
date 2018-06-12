<template>
  <div>
    <div style="margin-top: 1px;width: 30%;">
      <el-input placeholder="请输入搜索内容" v-model="input5" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="课程名" value="1"></el-option>
          <el-option label="授课教师" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table
      :data="likedCourseList"
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
          <el-button
            size="mini"
            @click="handlePre(scope.row)">预习</el-button>
          <el-button
            size="mini"
            type="warning"
            plain
            @click="handleDeLike(scope.row)">取消关注</el-button>
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
      name: "likedCourseTable",
      components: {
        page,
      },
      data() {
        return {
          likedCourseList: [],
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
          Service.post("listCourse", data, resp=>{ //请求已关注课程列表数据
            var records = resp.data.records
            this.likedCourseList = records
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
        filterOver(value, row) { //实现筛选功能
          return row.courseOver === value;
        },
        handlePre(row) {
          this.$router.push('coursePre')

        },
        handleDeLike(row) {
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
