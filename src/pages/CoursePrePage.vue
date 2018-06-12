<template>
    <div>
      <el-row>
        <el-button size="mini" icon="el-icon-back" @click="back"></el-button>
      </el-row>
      <el-row>
      <p style="text-align: center;font-size: xx-large">{{course.title}}</p>
      </el-row>
      <el-row v-show="course.preVideo !== ''">
        <div style="display: inline-block;text-align: center;width: 100%">
          <!--限制播放器大小-->
          <div style="height: 400px;width: 500px;display: inline-block">
            <!--引入视频播放器-->
              <video-player  class="video-player vjs-custom-skin"
                             ref="videoPlayer"
                             :playsinline="true"
                             :options="playerOptions"

              ></video-player>
          </div>
        </div>
      </el-row>
      <el-row>
        <pdf :src="course.prePdf"></pdf>
      </el-row>
    </div>
</template>

<script>
  import Service from '@/util/service'
  import pdf from 'vue-pdf'
    export default {
        name: "CoursePrePage",
      components: {
        pdf,
      },
      computed: {
        courseId() {
          return this.$route.params.courseId
        },
      },
      watch: {
        courseId() {
          this.getCourseInfo()
        },
        course() {
          this.playerOptions.sources = [{type : "", src: this.course.preVideo}]
        },
      },
      created() {
        this.init()
      },
      methods: {
        init() {
          console.log(this.courseId)
          this.getCourseInfo()
        },
          back() {
            this.$router.back()
          },
        getCourseInfo(){
          let that = this
          Service.post('getCourse', {id: this.courseId}, resp=>{
            if (resp.data.success) {
              that.course = resp.data.course
              that.course.courseTime = Moment(that.course.courseTime).format('LLLL')
            }
          })
        },
      },
      data() {
          return {
            course: {
              id: 0,
              title: '',
              teachers: '',
              description: '',
              courseTime: '',
              infoPdf: '',
              prePdf: '',
              preVideo: '',
            },
            playerOptions : {
              playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
              autoplay: false, //如果true,浏览器准备好时开始回放。
              muted: false, // 默认情况下将会消除任何音频。
              loop: false, // 导致视频一结束就重新开始。
              preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
              language: 'zh-CN',
              aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
              fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
              sources: [{
                type: "",
                src: "" //url地址
              }],
              poster: "", //你的封面地址
              notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
              }
            }
          }
      }
    }
</script>

<style scoped>

</style>
