<template>
  <div>
  <el-table
    :data="templateList"
    style="width: 100%;"
    height="600"
    @sort-change="sortFun"
  >
    <el-table-column
      label="id"
      prop="id">
    </el-table-column>
    <el-table-column
      label="模板名称"
      prop="title"
    >
    </el-table-column>
    <el-table-column
      label="创建时间"
      sortable="custom"
      prop="createStamp"
      :formatter="timeFormatter"
    >
    </el-table-column>
    <el-table-column
      prop="filter"
      label="绑定状态"
      :filters="[{ text: '未绑定', value: false }, { text: '已绑定', value: true }]"
      :filter-method="filterMapped"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.courseMapped=== true ? 'primary' : 'success'"
          disable-transitions>{{scope.row.courseMapped !== null ? '已绑定' : '未绑定'}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleUpdate(scope.row)">修改</el-button>
        <!--根据模板是否被使用决定是否禁用删除按钮-->
        <el-button
          v-show="scope.row.courseMapped === null"
              size="mini"
              type="danger"
              @click="handleDel(scope.row)">删除</el-button>
        <el-tooltip :content="scope.row.courseMapped" placement="top" effect="light" v-show="scope.row.courseMapped !== null">
          <div>
            <el-button v-show="scope.row.courseMapped === null"></el-button>
            <el-button
              disabled
              size="mini"
              type="danger"
              @click="handleDel(scope.row)">删除</el-button>
          </div>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <page ref="page" @turnPage="handleTurnPage"/>
    <template-editor dialogTitle="修改实验报告模板" ref="templateEditor"/>
  </div>
</template>

<script>
  import Moment from "moment"
  import Page from "@/components/page"
  import templateEditor from "@/components/templateEditor"
  import Store from "@/util/store"
  import Service from "@/util/service"
  import bus from "@/assets/eventBus"
    export default {
        name: "templateTable",
      components: {
        Page,
        templateEditor,
      },
      data(){
          return {
            templateList: [],
            pageNum: 1,
            pageSize: 10,
            order: 'id',
            desc: true,
          }
      },
      mounted() {
        this.fresh()
      },
      created() {
        bus.$on('updateTemplateTable', this.getList)
      },
      methods: {
        fresh() {
          let that = this
          Service.post('getTemplate', {id: this.form.id}, resp=>{
            if (resp.data.success) {
              that.form = resp.data.template
            }
          })
        },
        timeFormatter(row) {
          row.createStamp = Moment(row.createStamp,'LLLL').format('LLLL')
          return row.createStamp
        },
        filterMapped(value, row) {
          return (row.courseMapped !== null) === value;
        },
        sortFun(e) {
          this.order = e.prop
          this.desc = (e.order==='descending')
          this.pageNum = 1
          this.getList()
        },
        handleTurnPage(pageNum, pageSize) {
          console.log("handle")
          this.pageNum = pageNum
          this.pageSize = pageSize
          this.getList()
        },
        handleDel(row) {
          let that = this
          this.$confirm('此操作将删除该模板, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            Service.post('delTemplate',{id: row.id}, resp=>{
              that.getList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }) //调用后端服务删除接口
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        handleUpdate(row) {
          this.$refs.templateEditor.form.id = row.id
          console.log("id====" + this.$refs.templateEditor.form.id)
          this.$refs.templateEditor.fresh()
          this.$refs.templateEditor.open()
        },
        resetTable() {
          this.pageNum = 1
          this.order = 'id'
          this.desc = true
          this.getList()
        },
        getList() {
          var data = {
            userId: Store.load('user').id,
            page: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              order: this.order,
              desc:this.desc
            }
          }
          Service.post("listTemplate", data, resp=>{
            var records = resp.data.records
            this.templateList = records
            this.$refs.page.setPageInfo(resp.data.page)
          })
        },
      }
    }
</script>

<style>
  .el-tooltip {
    display: inline-block;
  }

</style>
