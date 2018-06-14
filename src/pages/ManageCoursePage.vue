<template>
  <div>
    <el-button icon="el-icon-plus" type="primary" @click="addCourseHandle">创建课程</el-button>
    <div class="spaceLine"></div>
    <manage-course-table ref="courseTable"/>
    <course-editor dialogTitle="创建实验课程" ref="dialog"/>
  </div>
</template>

<script>
  import manageCourseTable from '@/components/manageCourseTable'
  import courseEditor from '@/components/courseEditor'
    export default {
        name: "ManageCoursePage",
      components: {
        manageCourseTable,
        courseEditor,
      },
      methods: {
        addCourseHandle() {
          this.$refs.dialog.open()
          this.$refs.dialog.init()
        },
      },
    }
</script>

<style scoped>

</style>
