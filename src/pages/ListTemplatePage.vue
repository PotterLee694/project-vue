<template>
  <div>
    <el-button icon="el-icon-plus" type="primary" @click="addTemplateHandle">创建模板</el-button>
    <div class="spaceLine"></div>
    <template-table ref="templateTable"/>
    <template-editor dialogTitle="创建实验模板" ref="dialog"/>
  </div>
</template>

<script>
  import templateTable from '@/components/templateTable'
  import templateEditor from '@/components/templateEditor'
    export default {
      name: "ListTemplatePage",
      components: {
        templateTable,
        templateEditor,
      },
      methods: {
        addTemplateHandle() {
          this.$refs.dialog.init()
          this.$refs.dialog.open()
        },
      },
    }
</script>

<style scoped>

</style>
