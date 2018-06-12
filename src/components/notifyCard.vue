<template>
  <div>
    <div v-show="teacher">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <el-badge :value="newLikeList.length" :max="99" class="item">
            <span>新关注</span>
          </el-badge>
        </div>
        <EasyScrollbar :barOption={autohidemode:true,}>
          <div style="height: 300px;">
            <!--循环展示新关注内容-->
              <div v-for="o in newLikeList" :key="o" class="text item">
                 {{'新关注: ' + o }}
              </div>
          </div>
        </EasyScrollbar>
      </el-card>
      <div class="spaceLine"></div>
    </div>
    <div v-show="teacher">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-badge :value="newReportList.length" :max="99" class="item">
            <span>新提交</span>
          </el-badge>
        </div>
        <EasyScrollbar>
            <div style="height: 300px;">
            <div v-for="o in newReportList" :key="o" class="text item">
              <!--循环展示新报告内容-->
              {{'新报告: ' + o }}
            </div>
        </div>
        </EasyScrollbar>
      </el-card>
      <div class="spaceLine"></div>
    </div>
    <div v-show="!teacher">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-badge :value="needReportList.length" :max="99" class="item">
              <span>待提交</span>
            </el-badge>
          </div>
          <EasyScrollbar :barOption={autohidemode:true,}>
            <div style="height: 300px;">
              <div v-for="o in needReportList" :key="o" class="text item">
                <!--循环展示新的待提交通知内容-->
                {{'待提交: ' + o }}
              </div>
            </div>
          </EasyScrollbar>
        </el-card>
      <div class="spaceLine"></div>
    </div>
    <div v-show="!teacher">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-badge :value="newCommentList.length" :max="99" class="item">
              <span>新评论</span>
            </el-badge>
          </div>
          <EasyScrollbar>
            <div style="height: 300px;">
              <div v-for="o in newCommentList" :key="o" class="text item">
                <!--循环展示新评论通知内容-->
                {{'新评论: ' + o }}
              </div>
            </div>
          </EasyScrollbar>
        </el-card>
      <div class="spaceLine"></div>
    </div>
  </div>
</template>

<script>
  // 引入css

    export default {
      components: {
      },
      props: {
        teacher : false,
      },
      name: "tabs",
      data() {
        return {
          opt:{
              barColor:"#959595",   //滚动条颜色
              barWidth:6,           //滚动条宽度
              railColor:"#eee",     //导轨颜色
              barMarginRight:0,     //垂直滚动条距离整个容器右侧距离单位（px）
              barMaginBottom:0,     //水平滚动条距离底部距离单位（px)
              barOpacityMin:0.3,      //滚动条非激活状态下的透明度
              zIndex:"auto",        //滚动条z-Index
              autohidemode:true,     //自动隐藏模式
              horizrailenabled:false,//是否显示水平滚动条
          },

            newLikeList: [
                "学生1关注了实验课程《大气压实验一》",
                "学生2关注了实验课程《大气压实验一》",
                "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",
              "学生3关注了实验课程《大气压实验一》",


              ],
          newReportList: [
            "学生1提交了实验课程《大气压实验一》的实验报告",
            "学生2提交了实验课程《大气压实验一》的实验报告",
            "学生3提交了实验课程《大气压实验一》的实验报告",
            "学生4提交了实验课程《大气压实验一》的实验报告",
            "学生5提交了实验课程《大气压实验一》的实验报告",
            "学生5提交了实验课程《大气压实验一》的实验报告",
            "学生5提交了实验课程《大气压实验一》的实验报告",
            "学生5提交了实验课程《大气压实验一》的实验报告",
            "学生5提交了实验课程《大气压实验一》的实验报告",
            "学生5提交了实验课程《大气压实验一》的实验报告",
            "学生5提交了实验课程《大气压实验一》的实验报告",
            "学生5提交了实验课程《大气压实验一》的实验报告",
            "学生5提交了实验课程《大气压实验一》的实验报告",
            "学生5提交了实验课程《大气压实验一》的实验报告",
            "学生6提交了实验课程《大气压实验一》的实验报告",
          ],
          needReportList: [
            "实验课程《大气压实验一》已结束，请注意提交实验报告",
            "实验课程《大气压实验二》已结束，请注意提交实验报告",
            "实验课程《电路实验》已结束，请注意提交实验报告",
          ],
          newCommentList: [
            "学生2评论了您在《大气压实验一》提交的实验报告：评论内容",
            "学生3评论了您在《大气压实验一》提交的实验报告：评论内容",
            "学生4评论了您在《大气压实验一》提交的实验报告：评论内容",
            "学生2评论了您在《电路实验》提交的实验报告：评论内容",
          ],
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      }
    }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
  }
  .spaceLine {
    height: 20px;
  }
</style>
