import axios from 'axios';

const http = axios;

http.interceptors.response.use(res => {
  // 请求成功对响应数据做处理
  console.log('axios','请求拦截处理')
  // 该返回的数据则是axios.then(res)中接收的数据
  return res
}, err => {
  // 在请求错误时要做的事儿

  // 该返回的数据则是axios.catch(err)中接收的数据
  return Promise.reject(err)
})


export default http