<template>
  <div>
    <course-content :courseId="courseId" ref="courseContent"/>
  </div>
</template>

<script>
  import courseContent from '@/components/courseContent'
  export default {
    name: "CourseInfoPage",
    components: {
      courseContent,
    },
    data() {
      return {
        courseId: 0,
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        console.log(this.$route.params)
        this.courseId = this.$route.params.courseId
      },
    }

  }
</script>

<style>

</style>
