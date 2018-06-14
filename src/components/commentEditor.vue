<template>
    <div>
      <el-card shadow="hover">
        <span>留下你的评论</span>
        <div class="spaceLine"></div>
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" minlength="2" placeholder="说些什么......不少于两字"  class="commentTextarea" v-model="text"></el-input>
        <div class="spaceLine"></div>
        <el-button size="mini" @click="onSubmit">发送</el-button>
      </el-card>
      <div class="spaceLine"></div>
    </div>
</template>

<script>
  import Service from "@/util/service"
  import Store from "@/util/store"
  import bus from "@/assets/eventBus"
    export default {
        name: "commentEditor",
      props: {
          report: {},
      },
      data() {
          return {
            text: '',
          }
      },
      methods: {
        onSubmit() {
          let that = this
          if (this.text.length < 2) {
            this.text = ''
            return
          }
          Service.post('addComment', {reportId: this.report.id, userId: Store.load('user').id, comment: this.text}, resp=>{
            if (resp.data.success) {
              that.text = ''
              that.$message({type: 'success', message: '已提交评论'})
              bus.$emit('updateReport')
            }
          });

        } ,
      },
    }
</script>

<style scoped>

</style>
