<template>
    <div>
      <el-dialog :title="this.dialogTitle" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="实验报告模板名称">
            <el-input v-model="form.title" style="width: 30%"></el-input>
          </el-form-item>
          <!--<el-form-item label="实验报告模板内容">-->
            <img src="http://localhost:8081/res/template_demo.jpg"/>

          <!--</el-form-item>-->

        </el-form>


        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onsubmit">创建</el-button>
          <el-button @click="close">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import Store from "@/util/store"
    export default {
      name: "templateEditor",
      props: {
        dialogTitle: '',
      },
      data() {
        return {
          dialogFormVisible: false,
          form: {
            name: '',
            courseTime: '',
            description: '',
            teachers: Store.load("user").username,



          },
          pickerOption: {
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            }, {
              text: '明天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() + 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            }, {
              text: '一周后',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }]
          },
        }
      },
      methods: {
        open() {
          this.dialogFormVisible = true
        },
        close() {
          this.dialogFormVisible = false
        },

      },
    }
</script>

<style scoped>

</style>
