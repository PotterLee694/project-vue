<template>
    <div>
      <el-row>
        <el-col :span="12">
          <div class="block">
              <span class="demonstration">平均评分</span>
              <el-rate
                v-model="report.avgScore"
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
                @change="onChange"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
              </el-rate>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import Service from "@/util/service"
  import Store from "@/util/store"
  import bus from "@/assets/eventBus"

    export default {
        name: "scoreStar",
      props: {
        report: {},
      },
      data() {
        return {
          newValue: 0,
        }
      },
      mounted() {
        this.fresh()
      },
      watch: {

        report() {
          this.fresh()
        },
      },
      methods: {
        fresh() {
          let that = this
          Service.post('getScore', {userId: Store.load('user').id, reportId: this.report.id}, resp => {
            if (resp.data.success) {
              if (resp.data.score === null) {
                that.newValue = 0;
              } else {
                that.newValue = resp.data.score;
              }
            }
          })
        },
        onChange(value) {
          let that = this
          if (value > 0) {
            Service.post('updateScore', {
              userId: Store.load('user').id,
              reportId: this.report.id,
              score: value
            }, resp => {
              if (resp.data.success) {
                that.$message({type: 'success', message: '评分成功'})
                bus.$emit('updateReport')
              }
            })
          }
        },

      },

    }
</script>

<style>
 .block{padding:30px 0;text-align:center;border-right:1px solid #eff2f6;display:inline-block;width:100%;box-sizing:border-box}
 .block:last-child{border-right:none}
 .demonstration{display:block;color:#8492a6;font-size:14px;margin-bottom:20px}
</style>
