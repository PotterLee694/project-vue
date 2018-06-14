<template>
    <div id="outline">
      <el-row>
        <el-button size="mini" icon="el-icon-back" @click="back"></el-button>
      </el-row>
      <div class="spaceLine"></div>
      <div id="reportOutline">
        <el-card>
          <!--实验报告内容-->
          <report-content :report="report" ref="content"/>
        </el-card>
        <div class="spaceLine"></div>
        <el-card>
          <!--打分区域-->
          <score-star :report="report" ref="star"/>
        </el-card>
      </div>
      <div class="spaceLine"></div>
      <!--评论区域-->
      <comment-area :report="report" ref="area"/>
    </div>
</template>

<script>
  import commentArea from '@/components/commentArea'
  import scoreStar from '@/components/scoreStar'
  import reportContent from '@/components/reportContent'
  import Service from "@/util/service"
  import bus from "@/assets/eventBus"
  import Store from "@/util/store"
    export default {
        name: "ReportPage",
      components: {
        commentArea,
        scoreStar,
        reportContent,
      },
      data() {
        return {
          report: {}
        }
      },
      computed: {
        reportId() {
          return this.$route.params.reportId
        },
      },
      watch: {
        reportId() {
          this.fresh()
        },
      },
      created() {
        bus.$on('updateReport', this.fresh)
        this.fresh()
      },
      methods: {
        back() {
          this.$router.back() //返回到上一个界面
        },
        fresh() {
          if (this.reportId !== null && this.reportId > 0){
            let that = this
            Service.post('getReport', {id: this.reportId}, resp=>{
              if (resp.data.success) {
                that.report = resp.data.report
                if (resp.data.avgScore === null) {
                  that.report.avgScore = 0;
                } else {
                  that.report.avgScore = resp.data.avgScore;
                }
              }
            })
          }

        },
      },
    }
</script>

<style>
  .spaceLine {
    height: 30px;
  }
</style>
