<template>
    <div>
      <el-card>
        <el-form style="width: 25%">
          <el-form-item label="学号">
            <el-input v-model="form.stuNo" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.userName" placeholder="不能为空"></el-input>
          </el-form-item>
          <el-form-item label="用户头像">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8081/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.iconUrl" :src="form.iconUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-button type="primary" @click="submit">修改</el-button>
        </el-form>
      </el-card>
    </div>
</template>

<script>
  import Store from '@/util/store'
  import Service from '@/util/service'
  import bus from '@/assets/eventBus'
    export default {
        name: "UserSettingPage",
      mounted() {
        this.form.id = Store.load('user').id
        this.form.stuNo = Store.load('user').stuNo
        this.form.userName = Store.load('user').userName
        this.form.iconUrl = Store.load('user').iconUrl
      },
      data() {
          return {
            form: {
              id: 0,
              stuNo: 0,
              userName: '',
              iconUrl: '',
            },
          }
      },
      methods: {
        handleAvatarSuccess(res, file) {
          // this.form.iconUrl = URL.createObjectURL(file.raw);
          if (res.toString().match(".")) {
            this.form.iconUrl = res;
          }
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type.toString().match("image");
          const isLt2M = file.size / 1024 / 1024 < 5;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是图片格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 5MB!');
          }
          return isJPG && isLt2M;
        },
        submit() {
          let that = this
          Service.post('updateUserInfo', this.form, resp=>{
            var user = resp.data.user
            console.log(user)
            if (resp.data.success) {
              Store.save('user', user)
              console.log(user)
              bus.$emit('updateUser', user)

              that.$message({type: 'success', message: '修改成功！'});
            } else {
              that.$message({type: 'failed', massage: resp.data.message})
            }
          })
        },
      },
    }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
