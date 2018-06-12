<template>
  <div>
    <el-button icon="el-icon-plus" type="primary" @click="addTemplateHandle">创建模板</el-button>
    <template-table/>
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
          this.$refs.dialog.open()
        },
      },
    }
</script>

<style scoped>

</style>
