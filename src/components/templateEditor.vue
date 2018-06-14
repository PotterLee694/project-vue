<template>
    <div>
      <el-dialog :title="this.dialogTitle" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="实验报告模板名称">
            <el-input v-model="form.title" style="width: 30%"></el-input>
          </el-form-item>
          <el-form-item label="实验报告模板内容">
            <el-popover
              placement="top"
              width="200"
              trigger="hover">
              <el-input v-model="labelText" placeholder="输入说明文字"></el-input>
              <div class="spaceLine"></div>
              <el-button  @click="addLabel">确定</el-button>

              <el-button size="mini" icon="el-icon-plus" slot="reference">说明文字</el-button>
            </el-popover>
            <el-popover
              placement="top"
              width="200"
              trigger="hover">
              <el-input-number v-model="blankMaxLength"></el-input-number>
              <div class="spaceLine"></div>
              <el-button @click="addBlank">确定</el-button>

              <el-button size="mini" icon="el-icon-plus" slot="reference">填空</el-button>
            </el-popover>
          </el-form-item>
          <TemplatePrinter :template="form.template"/>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit">创建</el-button>
          <el-button @click="close">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import Service from "@/util/service"
  import Store from "@/util/store"
  import TemplatePrinter from "@/components/templatePrinter"
    export default {
      name: "templateEditor",
      components: {
        TemplatePrinter,
      },
      props: {
        dialogTitle: '',
      },
      data() {
        return {
          dialogFormVisible: false,
          labelText: '',
          blankMaxLength: 0,
          form: {
            id: 0,
            title: '',
            template: '',
            owner: Store.load("user").id,
          },

        }
      },
      mounted() {
      },
      methods: {
        addLabel() {
          if (this.form.template.length > 0) {
            this.form.template += "*|*"
          }
          let str = "label!$"
          let j = {des: {text: this.labelText}}
          str += JSON.stringify(j)
          this.form.template += str
        },
        addBlank() {
          if (this.form.template.length > 0) {
            this.form.template += "*|*"
          }
          let str = "blank!$"
          let j = {des: {maxlength: this.blankMaxLength}, value: ''}
          str += JSON.stringify(j)
          this.form.template += str

        },
        init() {
          this.form.id = 0
          this.form.title = ''
          this.form.template = ''
        },
        open() {
          this.dialogFormVisible = true
        },
        close() {
          this.dialogFormVisible = false
        },
        fresh() {
          let that = this
          Service.post('getTemplate', {id: this.form.id}, resp=>{
            if (resp.data.success) {
              that.form = resp.data.template
            }
          })
        },
        onSubmit() {
          var to = 'updateTemplate'
          let that = this
          Service.post(to, this.form, resp=>{
            if (resp.data.success) {
              that.$message({type: 'success', message: '提交成功'})
              if (resp.data.template != null) {
                that.form = resp.data.template;
              }
              var reset = that.$parent.resetTable
              if (reset == null) {
                reset = that.$parent.$refs.templateTable.resetTable
              }
              reset()
              that.close();
            }
          });
        },

      },
    }
</script>

<style scoped>

</style>
