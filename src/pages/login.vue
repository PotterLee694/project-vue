<template>
  <div class="login">
    <el-container>
      <el-aside width='33%'></el-aside>
      <el-container>
        <el-header ></el-header>
        <el-main width="33%">
          <loginForm/>
        </el-main>
      </el-container>
      <el-aside width='33%'></el-aside>
    </el-container>
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

</style>
