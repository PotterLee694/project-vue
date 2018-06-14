<template>
  <div>
    <el-card>
      <div id="areaOutline">
        <comment-editor :report="report"/>
        <el-card shadow="hover">
            <div v-for="comment in comments">
              <comment :comment="comment"></comment>
              <hr/>
            </div>
        </el-card>
      </div>
    </el-card>
  </div>

</template>

<script>
  import comment from '@/components/comment'
  import commentEditor from "@/components/commentEditor"
  import Service from "@/util/service"
    export default {
      name: "commentArea",
      props: {
        report: {},
      },
      components: {
        comment,
        commentEditor,
      },
      data() {
        return {
          comments: [],
        }
      },
      created() {
        this.getComments()
      },
      watch: {
        report() {
          this.getComments()
        },
      },
      methods: {
        getComments() {
          let that = this
          Service.post('listComment', {reportId: this.report.id}, resp=>{
            this.comments = resp.data.records

          })
        },
      },
    }
</script>

<style scoped>
  #areaOutline {
  }

</style>
