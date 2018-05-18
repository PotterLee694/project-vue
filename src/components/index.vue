<template>
  <div>
    <el-container>
      <el-header>
        <span style="font-size: xx-large;text-align: center;display: block;">实验报告在线提交及互评系统</span>
      </el-header>
      <el-aside>
        <app-frame/>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
    import appFrame from "@/components/appFrame";
    export default {
        name: "index",
      components: {appFrame}
    }
</script>

<style scoped>
  div,span{
    border-width: thin;
  }

</style>
