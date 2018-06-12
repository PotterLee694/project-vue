<template>
  <div>
    <course-table/>
  </div>
</template>

<script>
  import courseTable from '@/components/courseTable'
  import Store from "@/util/store"
    export default {
      name: "ListCoursePage",
      data() {
        return {
        }
      },
      components: {
        courseTable,
      },
      mounted() {
      },
    }
</script>

<style scoped>


</style>
