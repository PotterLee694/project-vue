<template>
  <div class="app-frame">
        <el-row class="tac">
          <el-col>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template slot="title">
                  <!--<span v-show="!teacher">学生用户：</span>-->
                  <!--<span v-show="teacher">教师用户：</span>-->
                  <img v-if="user.iconUrl" :src="user.iconUrl" class="avatar">
                  <span v-show="user.userName != null">{{user.userName}}</span>
                  <span v-show="user.userName == null">{{user.stuNo}}</span>
                </template>
                <el-menu-item index="1-1" jump="wellcome"><i class="el-icon-info"></i>首页</el-menu-item>
                <el-menu-item index="1-2" jump="userSetting"><i class="el-icon-setting"></i>修改资料</el-menu-item>
              </el-submenu>
               <el-menu-item index="2" v-show="!teacher">
                <template slot="title">
                  <div jump="listCourse" > <i class="el-icon-menu"></i> <span>实验课程浏览</span> </div>
                </template>
              </el-menu-item>
              <el-menu-item index="3">
                <template slot="title">
                  <div jump="manageCourse" v-show="teacher"> <i class="el-icon-edit-outline"></i> <span>实验课程管理</span> </div>
                  <div jump="likedCourse" v-show="!teacher"> <i class="el-icon-star-on"></i> <span>已关注课程</span> </div>
                </template>
              </el-menu-item>
              <el-menu-item index="4" v-show="teacher">
                <template slot="title">
                  <div jump="listTemplate"> <i class="el-icon-printer"></i> <span slot="title">实验报告模板</span> </div>
                </template>
              </el-menu-item>
              <el-submenu index="4" v-show="!teacher">
                <template slot="title">
                  <div jump="listReport">
                    <i class="el-icon-edit"></i>
                    <span>实验报告</span>
                  </div>
                </template>
                <el-menu-item index="4-1">
                  <template slot="title">
                    <div jump="needReport" v-show="!teacher"> <i class="el-icon-edit-outline"></i> <span slot="title">待提交实验报告</span> </div>
                  </template>
                </el-menu-item>
              </el-submenu>
              <el-menu-item index="5" v-show="teacher">
                <template slot="title">
                  <div jump="listReport"> <i class="el-icon-news"></i> <span>实验报告管理</span> </div>
                </template>
              </el-menu-item>
              <el-menu-item  index="-1" @click="loginOut"><i class="el-icon-back"></i>退出登录</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
  </div>
</template>

<script>
  import Store from '@/util/store'
  import bus from '@/assets/eventBus'
  export default {
    components: {
    },
    name: 'appFrame',
    data() {
      return {
        curPage: '/',


        user: {
          id: 0,
          stuNo: '',
          userName: null,
          userType: 0,
          iconUrl: '',
        }
      }
    },
    mounted() {
      this.addListener()
      this.loadUser()
      this.wellcome()
      let that = this
      bus.$on('updateUser', function (user) {
        console.log(user)
        that.user = user
      })

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
      },
      user() {
        this.iconUrl = this.user.iconUrl
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
        var user = Store.load('user')
        if (user != null) {
          this.user.id = user.id
          this.user.stuNo = user.stuNo;
          this.user.userName = user.userName
          this.user.userType = user.userType
          this.user.iconUrl = user.iconUrl
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
<style scoped>
  .avatar {
    width: 40px;
    height: 40px;
    display: inline-block;
  }

</style>
