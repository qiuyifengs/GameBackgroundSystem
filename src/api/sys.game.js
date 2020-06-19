import axios from '@/plugin/axios'
import qs from 'qs'

/**
 * @description 查询客户端事件配置列表
 * @param {*} params 
 */
export function getClientEventsConfig (params) {
    return axios({
        url: `/game-config/eventconfig?${qs.stringify(params)}`,
        method: 'get'
    })
}
/**
 * @description 新增客户端事件配置列表
 * @param {*} params 
 */
export function addClientEventsConfig (params) {
    return axios({
        url: `/game-config/eventconfig?${qs.stringify(params)}`,
        method: 'post'
    })
}
/**
 * @description 查询客户端-点击日志开关
 * @param {*} params 
 */
export function getClickLogSwitchConfig (params) {
    return axios({
        url: `/game-config/configclicklog?${qs.stringify(params)}`,
        method: 'get'
    })
}
/**
 * @description 更新或新增客户端-丢按季日志开关
 * @param {*} params 
 */
export function updateClickLogSwitchConfig (params) {
    return axios({
        url: `/game-config/configclicklog?${qs.stringify(params)}`,
        method: 'post'
    })
}
/**
 * @description 查询业务代码
 */
export function getConfigTransaction () {
    return axios({
        url: `/game-config/ConfigTransaction`,
        method: 'get'
    })
}