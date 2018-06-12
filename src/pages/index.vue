<template>
  <div id="outline">
    <el-container>
      <el-container>
          <el-aside>
            <div class="padding20">
              <app-frame ref="appFrame"/>
            </div>
          </el-aside>
          <el-main>
            <!--<keep-alive>-->
              <router-view/>
            <!--</keep-alive>-->
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

<style>
  .padding20 {
    padding: 20px;
  }

  /*#outline {*/
    /*background-color: #f4f5f7;*/
  /*}*/
  html,body{
    background: #f4f5f7;
    height: 100%;
  }
</style>
