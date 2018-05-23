<template>
  <div>
    <el-container>
      <el-header>
        <span style="font-size: xx-large;text-align: center;display: block;">实验报告在线提交及互评系统</span>
      </el-header>
      <el-container>
          <el-aside>
            <app-frame ref="appFrame"/>
          </el-aside>
          <el-main>
            <router-view/>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    import appFrame from "@/components/appFrame";
    export default {
      name: "index",
      components: {appFrame},
      mounted() {
        this.checkLogin()
      },
      computed: {
        isLogined () {
          return (sessionStorage.getItem("user") != null)
        }

      },
      methods: {
        checkLogin() {
          if (this.isLogined) {

          } else {
            this.$router.push("/login")
          }

        }
      }
    }
</script>

<style scoped>
  div,span{
    border-width: thin;
  }

</style>
