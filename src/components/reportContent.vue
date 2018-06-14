<template>
  <div>
    <template-printer :template="report.answer" ref="printer"/>
  </div>

</template>

<script>
  import Store from "@/util/store"
  import Service from "@/util/service"
  import bus from '@/assets/eventBus'
  import TemplatePrinter from "@/components/templatePrinter"
    export default {
      name: "reportContent",
      components: {
        TemplatePrinter,
      },
      props: {
        report: {},
      },
      data() {
        return {
        }
      },
      watch: {
      },
      created() {
      },
      methods: {
      },
    }
</script>

<style scoped>

</style>
