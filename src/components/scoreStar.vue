<template>
    <div>
      <el-row>
        <el-col :span="12">
          <div class="block">
              <span class="demonstration">平均评分</span>
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="block">
              <span class="demonstration">你的评分</span>
              <el-rate
                v-model="newValue"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
              </el-rate>
          </div>
        </el-col>
      </el-row>


    </div>
</template>

<script>
    export default {
        name: "scoreStar",
      data() {
        return {
          value: 3.7,
          newValue: 0,
        }
      }
    }
</script>

<style>
 .block{padding:30px 0;text-align:center;border-right:1px solid #eff2f6;display:inline-block;width:100%;box-sizing:border-box}
 .block:last-child{border-right:none}
 .demonstration{display:block;color:#8492a6;font-size:14px;margin-bottom:20px}
</style>
