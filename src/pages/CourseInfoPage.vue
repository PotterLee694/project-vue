<template>
  <div>
    <el-row>
      <el-button size="mini" icon="el-icon-back" @click="back"></el-button>
    </el-row>
    <p style="text-align: center;font-size: xx-large">{{course.title}}</p>
    <el-form label-position="left" inline class="demo-table-expand">
      <el-form-item label="课程编号：">
        <span>{{course.id}}</span>
      </el-form-item>
      <el-form-item label="授课教师：">
        <span>{{course.teachers}}</span>
      </el-form-item>
      <el-form-item label="课程时间：">
        <i class="el-icon-time"></i>
        <span>{{course.courseTime}}</span>
      </el-form-item>
      <el-form-item label="课程详情：">
        <p class="p2">{{course.description}}</p>
      </el-form-item>
    </el-form>
    <pdf :src="course.infoPdf"></pdf>
  </div>
</template>

<script>
  import Service from '@/util/service'
  import Moment from 'moment'
  import pdf from 'vue-pdf'
  Moment.locale('zh-cn')

  export default {
    name: "CourseInfoPage",
    components: {
      pdf,
    },
    data() {
      return {
        course: {
          id: 0,
          title: '',
          teachers: '',
          description: '',
          courseTime: '',
          infoPdf: '',
          prePdf: '',
          preVideo: '',
        },
      }
    },
    computed: {
      courseId() {
        return this.$route.params.courseId
      },
    },
    watch: {
      courseId() {
        this.getCourseInfo()
      },
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        console.log(this.courseId)
        this.getCourseInfo()
      },
      back() {
        this.$router.back() //返回到上一个界面
      },
      getCourseInfo() {
        let that = this
        Service.post('getCourse', {id: this.courseId}, resp=>{
          if (resp.data.success) {
            that.course = resp.data.course
            that.course.courseTime = Moment(that.course.courseTime).format('LLLL')
          }
        })
      },
    }

  }
</script>

<style scoped>
    .p2 {
    text-indent:2em;
    }
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
</style>
