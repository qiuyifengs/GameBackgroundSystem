export default ({ axios }) => ({
    /**
     * @description 查询客户端事件配置列表
     */
    CONFIG_EVENT_ALL (parameter) {
        return axios({
            url: '/game-config/eventconfig',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 新增客户端事件配置列表
     */
    CONFIG_EVENT_CREATE (parameter) {
        return axios({
            url: '/game-config/eventconfig',
            method: 'post',
            params: parameter
        })
    },
    /**
     * @description 查询客户端-点击日志开关
     */
    CONFIG_CLICK_LOG_ALL (parameter) {
        return axios({
            url: '/game-config/configclicklog',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 更新或新增客户端-丢按季日志开关 getConfigTransaction
     */
    CONFIG_CLICK_LOG_UPDATE (parameter) {
        return axios({
            url: '/game-config/configclicklog',
            method: 'post',
            params: parameter
        })
    },
    /**
     * @description 查询业务代码
     */
    CONFIG_TRANSACTION_ALL () {
        return axios({
            url: `/game-config/ConfigTransaction`,
            method: 'get',
        })
    }
})