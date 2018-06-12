<template>
  <div>
    <div style="margin-top: 1px;width: 30%;">
      <el-input placeholder="请输入搜索内容" v-model="searchContent" class="input-with-select" clearable>
        <el-select v-model="searchType" slot="prepend" placeholder="请选择">
          <el-option label="课程名" value="title"></el-option>
          <el-option label="授课教师" value="teachers"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
      </el-input>
    </div>
    <el-table :data="courseList" style="width: 100%;" height="600" @sort-change="sortFun" >
      <el-table-column type="expand">
        <template slot-scope="props">
            <p class="p2">{{ props.row.description}}</p>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" prop="title" >
      </el-table-column>
      <el-table-column label="授课教师" prop="teachers"> </el-table-column>
      <el-table-column label="课程时间" sortable="custom" prop="courseTime" :formatter="timeFormatter" >
      </el-table-column>
      <el-table-column prop="filter" label="课程状态" :filters="[{ text: '未开始', value: false }, { text: '已结束', value: true }]"
        :filter-method="filterOver"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.courseOver === true ? 'primary' : 'success'"
            disable-transitions>{{scope.row.courseOver === true ? '已结束' : '未开始'}}</el-tag>
          <!--筛选课程状态功能-->
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <!--详情按钮-->
          <el-button size="mini" @click="handleInfo(scope.row)">详情</el-button>
          <!--关注按钮-->
          <el-button size="mini" type="primary" v-show="!scope.row.liked" plain @click="handleLike(scope.row)">关注</el-button>
          <el-button size="mini" type="warning" v-show="scope.row.liked" plain @click="handleDeLike(scope.row)">取消关注</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page ref="page" @turnPage="handleTurnPage"/>
  </div>

</template>

<script>
  import page from "@/components/page" //导入page组件
  import Service from "@/util/service" //导入Service组件
  import Store from "@/util/store"
  import bus from '@/assets/eventBus'
  import Moment from "moment" //导入Monent组件
  Moment.locale('zh-cn') //设置Monent组件地区
    export default {
      name: "courseTable",
      components: {
        page,
      },
      data() {
        return {
          courseList: [],
          pageNum: 1,
          pageSize: 10,
          order: 'id',
          desc: true,
          searchType: '',
          searchContent: '',
        }
      },
      mounted() {
        let that = this
        bus.$on('updateCourseList', function () {
          that.getList()
        })
      },
      watch: {
        // pageNum() {this.getList()},
        // pageSize() {this.getList()},
        // order() {this.getList()},
        // desc() {this.getList()},
      },
      methods: {
        handleTurnPage(pageNum, pageSize) {
          console.log("handle") //记录日志
          this.pageNum = pageNum //传递页码
          this.pageSize = pageSize //传递页大小
          this.getList() //获取列表数据
        },
        getList() {
          var data = {
            userID: Store.load('user').id,
            page: { pageNum: this.pageNum, pageSize: this.pageSize,
              order: this.order, desc:this.desc ,searchType: this.searchType, searchContent:this.searchContent}
          } //设置请求数据
          Service.post("listCourse", data, resp=>{ //调用Service组件的post方法
            var records = resp.data.records
            this.courseList = records
            this.$refs.page.setPageInfo(resp.data.page) //设置分页信息
          })
        },
        timeFormatter(row) { //格式化后端传来的时间数据
          row.courseTime = Moment(row.courseTime,'LLLL').format('LLLL')
          return row.courseTime
        },
        sortFun(e) {
          this.order = e.prop
          this.desc = (e.order==='descending')
          this.pageNum = 1
          this.getList()
        },
        filterOver(value, row) {
          return row.courseOver === value;
        },
        handleInfo(row) {
          console.log(row)
          this.$router.push({name: 'courseInfo', params: {courseId: row.id}})
        },
        handleLike(row) {
          let that = this
          Service.post('likeCourse', {userId: Store.load('user').id, courseId: row.id}, resp=>{
            bus.$emit('updateCourseList')
            that.$message({type: 'success', message: '关注成功，请到已关注课程查看'})
          })
        },
        handleDeLike(row) {
          let that = this
          Service.post('deLikeCourse', {userId: Store.load('user').id, courseId: row.id}, resp=>{
            bus.$emit('updateCourseList')
            that.$message({type: 'success', message: '已取消关注'})
          })

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
