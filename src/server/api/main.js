import axios from './api'

export default {
    getInfo(params) {
        return axios.get('/api/xxx', { params })
    }
}
