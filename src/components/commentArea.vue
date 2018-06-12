<template>
  <div>
    <el-card>
      <div id="areaOutline">
        <div v-for="comment in comments">
          <comment :comment="comment"></comment>
          <hr/>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
  import comment from '@/components/comment'
    export default {
        name: "commentArea",
      components: {
          comment,
      },
      data() {
        return {
          comments: [
            {
              user: {
                icon_url: "",
                username: "学生2",
              },
              score: 3,
              createStamp: '2018-06-02 10:32:24',
              zan: 29,
              content: "这个实验报告和我的结果一致，但是结论不太同意",
            }, {
              user: {
                icon_url: "",
                username: "学生2",
              },
              score: 3,
              createStamp: '2018-06-03 20:12:44',
              zan: 10,
              content: "这个实验报告错误数据有点多，和我的不一样",
            },
            {
              user: {
                icon_url: "",
                username: "学生3",
              },
              score: 5,
              createStamp: '2018-06-03 20:13:24',
              zan: 4,
              content: "这个实验报告非常好！",
            },
            {
              user: {
                icon_url: "",
                username: "学生4",
              },
              score: 4,
              createStamp: '2018-06-04 13:22:15',
              zan: 1,
              content: "这个实验报告还不错！",
            },


          ],

        }
      },
    }
</script>

<style scoped>
  #areaOutline {
  }

</style>
