import axios from 'axios';


// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // form 表单方式传输
// axios.defaults.transformRequest = [function (data) {
//   let ret = ''
//   for (let it in data) {
//     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//   }
//   return ret
// }]

const http = axios;

http.interceptors.request.use(req=>{
  // console.log(req,'请求拦截');
  req.url = "http://127.0.0.1:1113" + req.url;
  // req.url = "https://suezp.cn/tableServer" + req.url;  //正式环境
  return req
})

http.interceptors.response.use(res => {
  // 请求成功对响应数据做处理
  // console.log(res,'返回参数拦截')
  // 该返回的数据则是axios.then(res)中接收的数据
  return res
}, err => {
  // 在请求错误时要做的事儿

  // 该返回的数据则是axios.catch(err)中接收的数据
  return Promise.reject(err)
})


export default http