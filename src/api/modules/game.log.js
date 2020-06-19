// ===================================日志查询==============================================

export default ({ axios }) => ({
    /**
     * @description 玩家登陆日志查询
     */
    LOG_LOGIN_ALL (parameter) {
        return axios({
            url: '/user/userlogin',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 角色经济日志查询
     */
    LOG_ROLE_ECONOMIC_ALL (parameter) {
        return axios({
            url: '/role/roleeconomylog',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 角色经济日志查询-导出
     */
    LOG_ROLE_ECONOMIC_EXPORT (parameter) {
        return axios({
            url: '/role/roleeconomylogexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 角色物品日志查询
     */
    LOG_GOODS_ALL (parameter) {
        return axios({
            url: '/role/roleitemlog',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 角色物品日志查询-导出
     */
    LOG_GOODS_EXPORT (parameter) {
        return axios({
            url: '/role/roleitemlogexport',
            method: 'get',
            params: parameter
        })
    },
})