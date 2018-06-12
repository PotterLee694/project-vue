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
      prop="createTime"
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
          disable-transitions>{{scope.row.courseMapped === true ? '已绑定' : '未绑定'}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleUpdate(scope.row)">修改</el-button>
        <!--根据模板是否被使用决定是否禁用删除按钮-->
        <el-button
          v-bind:disabled="scope.row.courseMapped"
          size="mini"
          type="danger"
          @click="handleDel(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <page ref="page" @turnPage="handleTurnPage"/>
  </div>
</template>

<script>
  import Moment from "moment"
  import Page from "@/components/page"
    export default {
        name: "templateTable",
      components: {
        Page,
      },
      data(){
          return {
            templateList: [
              {id: 1, title: '实验模板测试名称1', createTime: '2018-05-21 21:45:40.0', courseMapped: true},
              {id: 2, title: '实验模板测试名称2', createTime: '2018-05-21 21:45:40.0', courseMapped: false},
              {id: 3, title: '实验模板测试名称3', createTime: '2018-05-21 21:45:40.0', courseMapped: false},
              {id: 4, title: '实验模板测试名称4', createTime: '2018-05-21 21:45:40.0', courseMapped: true},
              {id: 5, title: '实验模板测试名称5', createTime: '2018-05-21 21:45:40.0', courseMapped: true},
              {id: 5, title: '实验模板测试名称6', createTime: '2018-05-21 21:45:40.0', courseMapped: true},
              {id: 7, title: '实验模板测试名称7', createTime: '2018-05-21 21:45:40.0', courseMapped: true},
            ],
          }
      },
      methods: {
        timeFormatter(row) {
          row.createTime = Moment(row.createTime,'LLLL').format('LLLL')
          return row.createTime
        },
        filterMapped() {

        },
        sortFun() {

        },
        handleTurnPage() {

        },
        handleDel() {

        },
        handleUpdate() {

        },
      }
    }
</script>

<style scoped>

</style>
