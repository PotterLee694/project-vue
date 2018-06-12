<template>
    <div>
      <el-row>
        <el-col :span="12">
          <icon :url="comment.user.icon_url"/>
          <span>{{comment.user.username}}</span>
          <div style="display: inline-block;margin-left: 10px">
            <el-rate disabled="" v-model="comment.score"></el-rate>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="text-align: right">
            <span style="display: inline-block;color: #9F9F9F">{{comment.createStamp}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <p>{{comment.content}}</p>
      </el-row>
      <el-row>
        赞 ({{comment.zan}})  踩

      </el-row>

    </div>
</template>

<script>
    export default {
        name: "comment",
      props: {
        comment: {
          user: {
            icon_url: '', //头像路径
            username: '', //用户名
          },
          score: 0, //分数
          createStamp: '', //评论时间
          zan: 0, //赞数量
          content: '', //评论内容
        }
      },
    }
</script>

<style scoped>
  .zan:before {
    content: "\E90D";
    color: #99a2aa;
  }

</style>
