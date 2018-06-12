<template>
  <div>
    <el-badge :value="200" :max="99" class="item">
      <el-button size="small">课程关注</el-button>
    </el-badge>
    <el-badge :value="100" :max="10" class="item">
      <el-button size="small">实验报告</el-button>
    </el-badge>
  </div>
</template>

<script>
    export default {
        name: "badge"
    }
</script>

<style scoped>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
