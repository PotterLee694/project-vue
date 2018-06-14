<template>
  <div ref="templateRoot"></div>
</template>

<script>
  import Translater from "@/util/translater"
    export default {
      name: "templatePrinter",
      props: {
        template: '',
      },
      data() {
        return {
          all: [],
        }
      },
      created() {
      },
      mounted() {
        if (this.template !== null) {
          this.compile();
        }
      },
      watch: {
        template() {
          this.compile()
        },
      },
      methods: {
        compile() {
          let that = this
          that.all = []
          that.removeChildren()

          const bases = Translater.toBases(this.template)

          bases.forEach(function (base, index) {
            let com = Translater.builder(base)
            that.all.push(com)
            that.$refs.templateRoot.append(com.$el)
          })
          console.log(that.$refs.templateRoot)
        },
        getAnswer() {
          let answer = Translater.toAnswer(this.all)
          return answer
        },
        removeChildren() {
          let first = this.$refs.templateRoot.firstChild
          while (first !== null) {
            this.$refs.templateRoot.removeChild(first);
            first = this.$refs.templateRoot.firstChild
          }
        },
      },
    }
</script>

<style scoped>

</style>
