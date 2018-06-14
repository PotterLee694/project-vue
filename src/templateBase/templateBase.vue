<script>
  import Vue from "vue"
  const blank = Vue.extend({
    template: `<div class="base-blank"><el-input :maxlength="data.des.maxlength" v-model="data.value" ></el-input></div>`,
    data: function () {
      return {
        data: {
          des: {maxlength: 5},
          value: '',
        }
      }
    },
  })
  const label = Vue.extend({
    template: `<div class="base-label"><span>{{data.des.text}}</span></div>`,
    data: function () {
      return {
        data: {
          des: {text: ''},
        }
      }
    }
  })
  const table = Vue.extend({
    template: `<div><table></table></div>`,
    data: function () {
      return {
        data: {
          des: {row: 2, col: 3, head:['表头1', '表头2', '表头3']},
        }
      }
    }
  })
  export default {
    blank,
    label,
    table,
  }
</script>
<style>
  .base-blank {
    display: inline-block;
    width: 300px;

  }

</style>
