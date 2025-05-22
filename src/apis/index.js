import axios from '@/utils/axios.js'


// 创建文档数据库
export const createDatabase = (params => {
    return axios.request({
        url: '/api/v1/datasets',
        method: 'post',
        data: params
    })
})

// 获取文档数据库数据
export const getDatabase = (params => {
    return axios.request({
        url: '/api/v1/datasets',
        method: 'get',
        params
    })
})
