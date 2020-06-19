export default ({ axios }) => ({
    /**
     * @description 渠道角色充值排行 getRoleRechargeRank
     */
    RANK_ROLE_RECHARGE_ALL (parameter) {
        return axios({
            url: '/recharge/statrolerechargeranklist',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 渠道角色充值排行-导出
     */
    RANK_ROLE_RECHARGE_EXPORT (parameter) {
        return axios({
            url: '/recharge/statrolerechargeranklistexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 渠道账号充值排行
     */
    RANK_ACCOUNT_RECHARGE_ALL (parameter) {
        return axios({
            url: '/recharge/statrechargeranklist',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 渠道账号充值排行-导出
     */
    RANK_ACCOUNT_RECHARGE_EXPORT (parameter) {
        return axios({
            url: '/recharge/statrechargeranklistexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 渠道角色消费排行
     */
    RANK_ROLE_CONSUME_ALL (parameter) {
        return axios({
            url: '/mall/malldiamondsconsumerank',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 渠道角色消费排行-导出
     */
    RANK_ROLE_CONSUME_EXPORT (parameter) {
        return axios({
            url: '/mall/MallDiamondsConsumeRankExport ',
            method: 'get',
            params: parameter
        })
    },
})