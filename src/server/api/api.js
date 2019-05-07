import axios from 'axios'
import Utils from '../../utils/utils'
import {Notify} from 'vant'

const errorCodeList = {
  100: "xxx",
  201: "xxx",
  202: "xxx",
  401: "xxx",
  404: "xxx",
  500: "xxx"
};

let baseURL = '';
if (process.env.NODE_ENV === 'development') baseURL = '//xxxx';
if (process.env.NODE_ENV === 'production') baseURL = '//xxxx';

const instance = axios.create({
  baseURL: baseURL
});
instance.defaults.withCredentials = true

instance.interceptors.request.use((config) => { // 添加请求拦截器
  return config
}, (error) => {
  return Promise.reject(error)
});

instance.interceptors.response.use((response) => { // 添加响应拦截器
  if (response.data.code && errorCodeList[response.data.code] && response.data.code !== 200) {
    console.log('Error', errorCodeList[response.data.code]);
  }
  if (response.data.code && response.data.code === 100) {
    Utils.toLogin(location.href)
  }
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export default instance
