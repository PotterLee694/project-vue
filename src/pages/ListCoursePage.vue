<template>
  <div>
    <component v-bind:is="curTable"/>

  </div>
</template>

<script>
  import teacherCourseTable from '@/components/teacherCourseTable'
  import Store from "@/util/store"
    export default {
      name: "ListCoursePage",
      data() {
        return {
          userType: 0,
          curTable: '',
        }
      },
      components: {
        teacherCourseTable,
      },
      mounted() {
        this.userType = Store.load('user').userType
        if (this.userType === 1) {
          this.curTable = 'teacherCourseTable';
        } else {
          this.curTable = 'studentCourseTable';
        }
      },
    }
</script>

<style scoped>


</style>
