<template>
    <div>
      <el-dialog :title="this.dialogTitle" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="选择模板">
            <!--模板选择下拉框-->
            <el-select v-model="form.mapTemplate" clearable placeholder="请选择">
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
          <el-button type="primary" @click="onsubmit">确认</el-button>
          <el-button @click="close">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import Store from "@/util/store"
    export default {
      name: "courseMapper",
      props: {
        dialogTitle: '',
      },
      data() {
        return {
          dialogFormVisible: false,
          form: {
            mapTemplate: '',
          },
          options: [{
            value: '模板1',
            label: '模板1'
          }, {
            value: '模板2',
            label: '模板2'
          }, {
            value: '模板3',
            label: '模板3'
          }, {
            value: '模板4',
            label: '模板4'
          }, {
            value: '模板5',
            label: '模板5'
          }],
        }
      },
      methods: {
        open() { //打开对话框
          this.dialogFormVisible = true
        },
        close() { //关闭对话框
          this.dialogFormVisible = false
        },

      },
    }
</script>

<style scoped>

</style>
