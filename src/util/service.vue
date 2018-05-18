<script>
import axios from 'axios'
import Qs from 'querystring'
const service_url = 'http://localhost:8081/'
const  post = function(url, data, do_fun, catch_fun) {
    var form_data = Qs.stringify(data)
    console.log(form_data)
        axios.post(service_url + url, form_data).then(do_fun).catch(catch_fun)
    }
    export default {
        post
    }
</script>
