<template>
  <div>
    <notify-card :teacher="teacher"/>
  </div>

</template>

<script>
  import notifyCard from '@/components/notifyCard'
  import Store from '@/util/store'
    export default {
      name: "WellcomePage",
      data() {
        return {
          teacher: false,
        }
      },
      components: {
          notifyCard
      },
      mounted() {
        this.teacher = (Store.load("user").userType === 1)
      },
    }
</script>

<style scoped>

</style>
