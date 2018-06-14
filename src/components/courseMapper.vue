<template>
    <div>
      <el-dialog :title="this.dialogTitle" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="选择模板">
            <!--模板选择下拉框-->
            <el-select v-model="form.templateId" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--确认和取消按钮-->
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="close">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import Store from "@/util/store"
  import Service from "@/util/service"
  import bus from "@/assets/eventBus"
    export default {
      name: "courseMapper",
      props: {
        dialogTitle: '',
      },
      data() {
        return {
          dialogFormVisible: false,
          form: {
            courseId: 0,
            templateId: 0,
          },
          options: [{value: 0, label: '无'}],
        }
      },
      methods: {
        open() { //打开对话框
          let that = this
          Service.post('listTemplate', {userId: Store.load('user').id}, resp=>{
            let records = resp.data.records
            that.options = [{value: 0, label: '无'}]
            records.forEach(function (item, index) {
              that.options.push({value: item.id, label: item.title})
            })
          })
          Service.post('getCourse', {id: that.form.courseId}, resp=>{
            if (resp.data.success) {
              that.form.templateId = resp.data.course.templateId
            }
          })
          this.dialogFormVisible = true
        },
        close() { //关闭对话框
          this.dialogFormVisible = false
        },
        onSubmit() {
          let that = this
          Service.post('mapTemplate', this.form, resp=>{
            if (resp.data.success) {
              that.$message({type: "success", message: '绑定成功'})
              bus.$emit('updateTemplateTable')
              that.close()
            }
          })

        },

      },
    }
</script>

<style scoped>

</style>
