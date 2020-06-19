// ===================================在线==============================================

export default ({ axios }) => ({
    /**
     * @description 实时在线
     */
    ONLINE_REALTIME_ALL (parameter) {
        return axios({
            url: '/user/useronline',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 全服在线
     */
    ONLINE_FULL_SERVICE_ALL () {
        return axios({
            url: '/user/totaluseronline',
            method: 'get'
        })
    },
    /**
     * @description 每5分钟在线
     */
    ONLINE_EVERY_MINUTES_5_ALL (parameter) {
        return axios({
            url: '/user/statonline',
            method: 'get',
            params: parameter
        })
    }
})