<template>
  <div class="login">
    <!--<el-container>-->
      <!--<el-aside width='33%'></el-aside>-->
      <!--<el-container>-->
        <!--<el-header ></el-header>-->
        <!--<el-main width="33%">-->
          <!--<loginForm/>-->
        <!--</el-main>-->
      <!--</el-container>-->
      <!--<el-aside width='33%'></el-aside>-->
    <!--</el-container>-->
    <div style="text-align: center;display: inline-block;height: 100%;width: 100%;">
      <div style="display: inline-block;height: 100%;width: 100%">
        <login-form/>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/loginForm'
export default {
  components: {
    LoginForm
  },
  name: 'login',
  data () {
    return {
      err_msg: ''
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    text-align: center;
    border-radius: 20px;
    width: 600px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  html,body {

  }

</style>
