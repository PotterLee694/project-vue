<template>
  <div class="loginForm">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span id="card-title">实验报告在线提交及互评系统</span>
            <el-button style="float: right; padding: 3px 0" type="text"></el-button>
        </div>
            <el-form :model="Form" :rules="rules" ref="Form" label-width="100px">
                <el-form-item label="学号" prop="stuNo">
                  <el-input v-model="Form.stuNo" placeholder="请输入学号" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="Form.password"
                        type="password"
                        placeholder="请输入密码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="验证" prop="yzm">
                    <yz-slider ref="yzSlider" @dragOk="yzOk"/>
                </el-form-item>
           </el-form>
    </el-card>
  </div>
</template>

<script>
import Service from '@/util/service'
import Store from '@/util/store'
import YzSlider from '@/components/yz-slider'
export default {
  name: 'loginForm',
  components: {
    YzSlider
  },
  data () {
    return {
          Form: {
            stuNo: '',
            password: '',
          },
          rules: {
            stuNo: [
              { required: true, message: '学号不能为空', trigger: 'blur' },
              // {type: 'number', message: '学号必须为数字', true: 'blur'}
            ],
            password: [
              { required: true, message: '密码不能为空', trigger: 'blur' }
            ]
          }
    }
  },
  watch: {

  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
             if (valid) {
                    Service.post('login',this.Form, resp=> {
                        if (resp.data.success) {
                          let userName = resp.data.user.userName
                          if (userName === null) {
                            userName = ""
                          }
                          this.$message.success('欢迎你：' + userName + '(' + resp.data.user.stuNo + ')');
                          this.loginOn(resp.data)
                        }else{
                            this.$message.error(resp.data.message)
                            this.resetYzSlider()
                        }
                    }, resp=> {
                        this.$message.error('服务器无响应')
                        this.resetYzSlider()
                    })
              } else {
                this.resetYzSlider()
                return false;
              }
        });
    },
    yzOk() {
        this.submitForm('Form')
    },
    resetYzSlider() {
        let that = this
        that.yzSliderInterval = setInterval(function(){
            that.$refs.yzSlider.reset()
            clearInterval(that.yzSliderInterval)
        }, 1500)
    },
    loginOn(data) {
      let that = this
      that.loginInterval = setInterval(function () {
        var saveStr = Store.save("user", data.user)
        console.log(saveStr)
        that.$router.push("/")
        clearInterval(that.loginInterval)
      }, 1000)
    }
  }
}
</script>

<style scoped>
  #card-title{
  }
  .clearfix {
    display: inline-block;
    width: 100%;
    height: 20%;
  }
  .box-card {
    text-align: center;
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .loginForm {
    display: inline-block;
    height: 284px;
    width: 500px;
    text-align: center;
  }
</style>
