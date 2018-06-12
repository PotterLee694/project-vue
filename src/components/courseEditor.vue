<template>
    <div>
      <el-dialog :title="this.dialogTitle" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="实验课程名称">
            <el-input v-model="form.title" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="实验课程时间">
            <el-date-picker
              v-model="form.courseTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOption">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="授课教师">
            <el-input v-model="form.teachers"></el-input>
            <!--<el-autocomplete-->
              <!--class="inline-input"-->
              <!--v-model="form.teachers"-->
              <!--placeholder=""-->
              <!--@select="handleSelect"-->
            <!--&gt;</el-autocomplete>-->
            <!--:fetch-suggestions="querySearch"-->
          </el-form-item>
          <el-form-item label="文字描述">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6}"
              placeholder="请输入内容"
              v-model="form.description">
            </el-input>
          </el-form-item>
          <el-form-item label="详情内容">
            <el-upload
              class="upload-demo"
              drag
              action="http://localhost:8081/upload"
              :on-success="onInfoSuccess"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传pdf文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="预习内容">
            <el-upload
              class="upload-demo"
              drag
              action="http://localhost:8081/upload"
              :on-success="onPreInfoSuccess"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传pdf文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="预习视频">
            <el-upload
              class="upload-demo"
              drag
              action="http://localhost:8081/upload"
              :on-success="onPreVideoSuccess"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传flv/mp4/avi文件</div>
            </el-upload>
          </el-form-item>
        </el-form>


        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit">创建</el-button>
          <el-button @click="close">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import Store from "@/util/store"
  import Service from "@/util/service"
    export default {
      name: "courseEditor",
      props: {
        dialogTitle: '',
      },
      data() {
        return {
          dialogFormVisible: false,
          form: {//绑定表单数据
            id: 0,
            owner: Store.load('user').id,
            title: '',
            courseTime: '',
            description: '',
            teachers: Store.load("user").username,
            infoPdf: '',
            prePdf: '',
            preVideo: '',
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
      mounted() {
        this.fresh()
      },
      methods: {
        open() {
          this.dialogFormVisible = true
        },
        close() {
          this.dialogFormVisible = false
        },
        onInfoSuccess(res, file) {
          if (res.toString().match(".")) {
            this.form.infoPdf = res;
          }
        },
        onPreInfoSuccess(res, file) {
          if (res.toString().match(".")) {
            this.form.prePdf = res;
          }
        },
        onPreVideoSuccess(res, file) {
          if (res.toString().match(".")) {
            this.form.preVideo = res;
          }
        },
        fresh() {
          let that = this
          Service.post('getCourse', {id: this.form.id}, resp=>{
            if (resp.data.success) {
              that.form = resp.data.course
            }
          })
        },
        onSubmit() {
          var to = 'updateCourse'
          let that = this
          Service.post(to, this.form, resp=>{
            if (resp.data.success) {
              that.$message({type: 'success', message: '提交成功'})
              if (resp.data.course != null) {
                that.form = resp.data.course;
              }
              var reset = that.$parent.resetTable
              if (reset == null) {
                reset = that.$parent.$refs.courseTable.resetTable
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
