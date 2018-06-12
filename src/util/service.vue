<script>
import axios from 'axios'
const service_url = 'http://localhost:8081/'
const  post = function(url, data, do_fun, catch_fun) {
        console.log("reqData:" + JSON.stringify(data))
        axios.post(service_url + url, data).then(resp=>{
          console.log(resp)
          if(do_fun != null){ do_fun(resp) }
        }).catch(err=>{
          if (catch_fun != null) { catch_fun(err.response) }
          console.log('请求失败：')
          console.log(err)
        })
    }
    export default { post }
</script>
