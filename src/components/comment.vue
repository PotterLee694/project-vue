<template>
    <div>
      <el-row>
        <el-col :span="12">
          <img :src="comment.iconUrl" style="height: 40px;width: 40px"/>
          <span>{{comment.userName}}</span>
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
        <p>{{comment.comment}}</p>
      </el-row>
      <el-row>
        <a class="tap" @click="handelZan(comment)">赞</a> ({{comment.zan}})  <a class="tap" @click="handelCai(comment)">踩</a>

      </el-row>

    </div>
</template>

<script>
  import Service from "@/util/service"
  import Store from "@/util/store"
  import bus from "@/assets/eventBus"
    export default {
        name: "comment",
      props: {
        comment: {
          iconUrl: '', //头像路径
          userName: '', //用户名
          score: 0, //分数
          createStamp: '', //评论时间
          zan: 0, //赞数量
          comment: '', //评论内容
        }
      },
      methods: {
        handelZan(comment) {
          Service.post('zanComment', {id: comment.id, userId: Store.load('user').id}, resp=>{
            if (resp.data.success) {
              bus.$emit('updateReport')
            }
          })
        },
        handelCai(comment) {

        },

      },
    }
</script>

<style scoped>
  .zan:before {
    content: "\E90D";
    color: #99a2aa;
  }
  .tap:hover {
    color: #1E9FFF;
    cursor: pointer;
  }


</style>
