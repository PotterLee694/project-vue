<template>
  <div>
    <div v-show="teacher">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span v-show="newLikeCount > 0">新关注</span>
          <el-badge :value="newLikeCount" :max="99" class="item" v-show="newLikeCount > 0">
          </el-badge>
          <span v-show="newLikeCount <= 0">暂无新关注</span>
        </div>
        <EasyScrollbar :barOption={autohidemode:true,}>
          <div style="height: 300px;">
            <!--循环展示新关注内容-->
              <div v-for="o in newLikeList" :key="o.id" class="text item">
                <el-row>
                  <el-col :span="20">
                    <div style="text-align: left">
                      <span>{{o.content}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div style="text-align: right">
                      <span style="color: #9F9F9F;display: inline-block">{{o.createStamp}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
          </div>
        </EasyScrollbar>
      </el-card>
      <div class="spaceLine"></div>
    </div>
    <div v-show="teacher">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-show="newReportCount > 0">新提交</span>
          <el-badge :value="newReportCount" :max="99" class="item" v-show="newReportCount > 0">
          </el-badge>
          <span v-show="newReportCount <= 0">暂无新提交</span>
        </div>
        <EasyScrollbar>
            <div style="height: 300px;">
            <div v-for="o in newReportList" :key="o.id" class="text item">
              <!--循环展示新报告内容-->
              <el-row>
                <el-col :span="20">
                  <div style="text-align: left">
                    <span>{{o.content}}</span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div style="text-align: right">
                    <span style="color: #9F9F9F;display: inline-block">{{o.createStamp}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
        </div>
        </EasyScrollbar>
      </el-card>
      <div class="spaceLine"></div>
    </div>
    <div v-show="!teacher">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span v-show="needReportCount > 0">待提交报告</span>
            <el-badge :value="needReportCount" :max="99" class="item" v-show="needReportCount > 0">
            </el-badge>
            <span v-show="needReportCount <= 0">暂无待提交报告</span>
          </div>
          <EasyScrollbar :barOption={autohidemode:true,}>
            <div style="height: 300px;">
              <div v-for="o in needReportList" :key="o.id" class="text item">
                <!--循环展示新的待提交通知内容-->
                <el-row>
                  <el-col :span="20">
                    <div style="text-align: left">
                      <span>{{o.content}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div style="text-align: right">
                      <span style="color: #9F9F9F;display: inline-block">{{o.createStamp}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </EasyScrollbar>
        </el-card>
      <div class="spaceLine"></div>
    </div>
    <div v-show="!teacher">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span v-show="newCommentCount > 0">新评论</span>
            <el-badge :value="newCommentCount" :max="99" class="item" v-show="newCommentCount > 0">
            </el-badge>
            <span v-show="newCommentCount <= 0">暂无新评论</span>
          </div>
          <EasyScrollbar>
            <div style="height: 300px;">
              <div v-for="o in newCommentList" :key="o.id" class="text item">
                <!--循环展示新评论通知内容-->
                <el-row>
                  <el-col :span="20">
                    <div style="text-align: left">
                      <span>{{o.content}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div style="text-align: right">
                      <span style="color: #9F9F9F;display: inline-block">{{o.createStamp}}</span>
                    </div>
                  </el-col>
                </el-row>
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

  import Service from "@/util/service"
  import Store from "@/util/store"
  import Moment from "moment"
  Moment.locale("zh-cn")
    export default {
      components: {
      },
      props: {
        teacher : false,
      },
      name: "tabs",
      created() {
        this.getList()
      },
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
          newLikeCount: 0,
          newReportCount: 0,
          needReportCount: 0,
          newCommentCount: 0,
          newLikeList: [],
          newReportList: [],
          needReportList: [],
          newCommentList: [],
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
        getList() {
          let that = this
          Service.post('listNotice', {userId: Store.load('user').id}, resp=>{
            let records = resp.data.records
            that.newLikeCount = 0
            that.newReportCount = 0
            that.needReportCount = 0
            that.newCommentCount = 0
            records.forEach(function (item, index) {
              item.createStamp = Moment(item.createStamp).format('YYYY年M月d日 hh:mm:ss')
              if (item.type === 'like') {
                that.newLikeList.push(item)
              }
              if (item.type === 'newReport') {
                that.newReportList.push(item)
              }
              if (item.type === 'needReport') {
                that.needReportList.push(item)
              }
              if (item.type === 'comment') {
                that.newCommentList.push(item)
              }
            })
            Service.post('checkNotice', {userId: Store.load('user').id})
            that.notify()
          })

        },
        notify() {
          let that = this
          that.newLikeList.forEach(function(item, index) {
            that.doNotify(item, '新关注')
          });
          that.newReportList.forEach(function(item, index) {
            that.doNotify(item, '新提交')
          });
          that.needReportList.forEach(function(item, index) {
            that.doNotify(item, '待提交报告')
          });
          that.newCommentList.forEach(function(item, index) {
            that.doNotify(item, '新评论')
          });


        },
        doNotify(i, ti) {
          let that = this
          let item = i
          let title = ti
          let t = setTimeout(function (){
              if (item.checkTime === null) {
                if (title === '新关注') {
                  that.newLikeCount += 1
                }
                if (title === '新提交') {
                  that.newReportCount += 1
                }
                if (title === '待提交报告') {
                  that.needReportCount += 1
                }
                if (title === '新评论') {
                  that.newCommentCount += 1
                }
                  that.$notify({
                    type: "info",
                    title: title,
                    message: item.content,
                  });
              }
              clearTimeout(t)
          }, 200);

        },
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
