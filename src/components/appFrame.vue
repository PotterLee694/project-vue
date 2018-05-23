<template>
  <div class="app-frame">
        <el-row class="tac">
          <el-col>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-info"></i>
                  <span v-show="!teacher">学生用户：</span>
                  <span v-show="teacher">教师用户：</span>
                  <span v-show="user.userName != null">{{user.userName}}</span>
                  <span v-show="user.userName == null">{{user.stuNo}}</span>
                </template>
                <el-menu-item index="1-1" jump="userSetting"><i class="el-icon-setting"></i>修改资料</el-menu-item>
                <el-menu-item index="1-2" jump="uniqueSetting"><i class="el-icon-setting"></i>个性设置</el-menu-item>
              </el-submenu>
              <el-submenu index="2" v-show="teacher">
                <template slot="title">
                  <div jump="listCourse">
                    <i class="el-icon-menu"></i>
                    <span>实验课程管理</span>
                  </div>
                </template>
                <el-menu-item index="2-1" jump="addCourse"><i class="el-icon-plus"></i>添加课程</el-menu-item>
              </el-submenu>
              <el-submenu index="3" v-show="teacher">
                <template slot="title">
                  <div jump="listTemplate">
                    <i class="el-icon-printer"></i>
                    <span slot="title">实验报告模板</span>
                  </div>
                </template>
                <el-menu-item index="3-1" jump="addTemplate"><i class="el-icon-plus"></i>添加模板</el-menu-item>
              </el-submenu>
              <el-menu-item  index="-1" @click="loginOut"><i class="el-icon-back"></i>退出登录</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
  </div>
</template>

<script>
  export default {
    name: 'appFrame',
    data() {
      return {
        curPage: '/',


        user: {
          userID: 0,
          stuNo: '',
          password: '',
          userName: null,
          userType: 0,
        }
      }
    },
    mounted() {
      this.addListener()
      this.loadUser()
      this.wellcome()
    },
    computed: {
      teacher() {
        return this.user.userType === 1
      }
    },
    watch: {
      curPage() {
        if (this.curPage != "/") {
          this.$router.push(this.curPage)
        }
      }

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      wellcome() {
        this.$router.push('/wellcome')
      },
      loadUser() {
        var user_str = sessionStorage.getItem("user")
        var user = JSON.parse(user_str)
        if (user != null) {
          this.user.userID = user.id
          this.user.stuNo = user.stuNo;
          this.user.userName = user.userName
          this.user.userType = user.userType
        }
      },
      addListener() {
        document.addEventListener('click', (e) => {
          // if(e.target.className === 'el-menu-item') {
          let jump = e.srcElement.attributes.jump
          // console.log(e)
          if (jump != null) {
            this.curPage = jump.value
          }
        })
      },
      loginOut() {
        sessionStorage.clear()
        this.$router.push("/login")
      }
    }
  }
</script>
