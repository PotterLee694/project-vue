<template>
  <div class="page">
    <el-pagination
      @size-change="handlePageSizeChange"
      @current-change="handleCurPageChange"
      :current-page="pageNum"
      :page-sizes="[5, 10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "page",
      data() {
          return {
            pageNum: 1,
            pageSize: 10,
            pageCount: 0,
            totalCount: 0,
          }
      },
      mounted() {
          this.callTurnPage(this.pageNum, this.pageSize)
      },
      methods: {
          setPageInfo(page) {
            this.pageNum = page.pageNum
            this.pageSize = page.pageSize
            this.pageCount = page.pageCount
            this.totalCount = page.totalCount
          },
          handlePageSizeChange(pageSize) {
            this.callTurnPage(this.pageNum, pageSize)
          },
          handleCurPageChange(curPage) {
            this.callTurnPage(curPage, this.pageSize)
          },
           callTurnPage(curPage, pageSize) {
            console.log("calTurnPage")
             this.$emit('turnPage', curPage, pageSize)
           },
      }
    }
</script>

<style scoped>

</style>
