<script>
  const load = function(name) {
    var str = sessionStorage.getItem(name)
    var data = JSON.parse(str)
    return data
  }
  const save = function(name, data) {
    var str = JSON.stringify(data)
    sessionStorage.setItem(name, str)
    return str
  }
  export default {
    load,
    save,
  }
</script>
