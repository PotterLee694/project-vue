<template>
  <div>
    <el-dialog :title="this.dialogTitle" :visible.sync="dialogFormVisible">
      <TemplatePrinter :template="template" ref="printer"/>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Store from "@/util/store"
  import Service from "@/util/service"
  import bus from '@/assets/eventBus'
  import TemplatePrinter from "@/components/templatePrinter"
  export default {
    name: "courseEditor",
    components: {TemplatePrinter},
    props: {
      dialogTitle: '',
    },
    data() {
      return {
        dialogFormVisible: false,
        template: null,
        templateId: 0,
        courseId: 0,
        userId: Store.load('user').id,
      }
    },
    created() {
      this.fresh()
    },
    methods: {
      init() {

      },
      open() {
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
      },
      fresh() {
        let that = this
        Service.post('getTemplate', {id: this.templateId}, resp=>{
          if (resp.data.success) {
            that.template = resp.data.template.template
          }
        })
      },
      onSubmit() {
        let that = this
        var data = {
          userId: this.userId,
          courseId: this.courseId,
          templateId: this.templateId,
          answer: this.$refs.printer.getAnswer(),
        }
        Service.post('addReport', data, resp=>{
          if (resp.data.success) {
            that.$message({type: 'success', message: '提交成功'})
            bus.$emit('updateReportTable')
            bus.$emit('updateNeedReportTable')
            that.close();
          }
        });
      },

    },
  }
</script>

<style scoped>

</style>
