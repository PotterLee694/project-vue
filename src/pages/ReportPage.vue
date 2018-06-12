<template>
    <div id="outline">
      <div id="reportOutline">
        <el-card>
          <!--实验报告内容-->
          <report-content/>
          <!--打分区域-->
          <score-star/>
        </el-card>
      </div>
      <div class="spaceLine"></div>
      <!--评论区域-->
      <comment-area/>
    </div>
</template>

<script>
  import commentArea from '@/components/commentArea'
  import scoreStar from '@/components/scoreStar'
    export default {
        name: "ReportPage",
      components: {
        commentArea,
        scoreStar,
      },
    }
</script>

<style>
  .spaceLine {
    height: 30px;
  }
</style>
