<script>
  import Vue from "vue"

  import TemplateBase from "@/templateBase/templateBase"

  const toBases = function(template) {
    let strs = template.split("*|*")
    let out = []
    strs.forEach(function (str, index) {
      let arr = str.split("!$")
      let type = arr[0]
      let dataStr = arr[1]
      console.log(type)
      console.log(dataStr)
      let data = JSON.parse(dataStr)
      out.push({type: type, data: data})
    })
    return out
  }
  const toAnswer = function(all) {
    var answer = ''
    all.forEach(function (item, index) {
      if (item.tag === "blank") {
        answer += "blank!$"
      }
      if (item.tag === "label") {
        answer += "label!$"
      }
      answer += JSON.stringify(item.$data.data)
      if (all.length > (index + 1)) {
        answer += "*|*";
      }
    })

    return answer
  }
  const builder = function (base) {
    let out;
    if (base.type === "blank") {
      out = new TemplateBase.blank()
    }
    if (base.type === "label") {
      out = new TemplateBase.label()
    }
    out.tag = base.type
    console.log(out);
    console.log(base.data)
    console.log(out.$data.data)
    out.$data.data = base.data
    console.log(out.$data.data)
    out.$mount()
    return out
  }
  export default {
    toBases,
    builder,
    toAnswer,
  }
</script>
