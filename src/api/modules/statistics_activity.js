// ===================================活跃与流失统计==============================================

export default ({ axios }) => ({
    /**
     * @description 留存统计
     */
    ACTIVITY_LIUCUN_ALL (parameter) {
        return axios({
            url: '/user/liucun',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 留存统计-数据导出
     */
    ACTIVITY_LIUCUN_EXPORT (parameter) {
        return axios({
            url: '/user/liucunexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 注册来源
     */
    ACTIVITY_REG_SOURCE_ALL (parameter) {
        return axios({
            url: '/user/regsourcestat',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 等级分布
     */
    ACTIVITY_RANK_DISTRIBUTION_ALL (parameter) {
        return axios({
            url: '/user/statrolelevel',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 等级分布-导出
     */
    ACTIVITY_RANK_DISTRIBUTION_EXPORT (parameter) {
        return axios({
            url: '/user/statrolelevelexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 流失玩家等级分布
     */
    ACTIVITY_LOST_PLAYER_RANK_DISTRIBUTION_ALL (parameter) {
        return axios({
            url: '/user/statlostrolelevel',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 流失玩家等级分布-导出
     */
    ACTIVITY_LOST_PLAYER_RANK_DISTRIBUTION_EXPORT (parameter) {
        return axios({
            url: '/user/statlostrolelevelexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 玩家流失前行为记录
     */
    ACTIVITY_LOST_PLAYER_BEHAVIOR_RECORD_ALL (parameter) {
        return axios({
            url: '/user/statlostuser',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 玩家流失前行为记录-导出
     */
    ACTIVITY_LOST_PLAYER_BEHAVIOR_RECORD_EXPORT (parameter) {
        return axios({
            url: '/user/statlostuserexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 玩家流失前行为统计
     */
    ACTIVITY_LOST_PLAYER_BEHAVIOR_STATISTICS_ALL (parameter) {
        return axios({
            url: '/user/statlostuser2',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 玩家流失前行为统计-导出
     */
    ACTIVITY_LOST_PLAYER_BEHAVIOR_STATISTICS_EXPORT (parameter) {
        return axios({
            url: '/user/statlostuser2export',
            method: 'get',
            params: parameter
        })
    }
})