<script>
import axios from 'axios'
import Qs from 'querystring'
const service_url = 'http://localhost:8081/'
const  post = function(url, data, do_fun, catch_fun) {
        var form_data = Qs.stringify(data)
        var jsondata = JSON.stringify(data)
        console.log("reqData:" + jsondata)
        axios.post(service_url + url, data).then(resp=>{
          if(do_fun != null){
            do_fun(resp)
          }
          console.log(resp)
        }).catch(resp=>{
          if (catch_fun != null) {
            catch_fun(resp);
          }
          console.log('请求失败：' + resp.status + ',' + resp.statusText)
        })
    }
    export default {
        post
    }
</script>
