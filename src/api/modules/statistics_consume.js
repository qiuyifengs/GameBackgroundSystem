// ===================================消费统计==============================================
export default ({ axios }) => ({
    /**
     * @description 商城道具概况
     */
    SHOP_PROP_OVERVIEW_ALL (parameter) {
        return axios({
            url: '/mall/mallstat',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 商城道具概况-导出
     */
    SHOP_PROP_OVERVIEW_EXPORT (parameter) {
        return axios({
            url: '/mall/mallstatexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 商城道具消费明细
     */
    SHOP_PROP_CONSUME_DETAIL_ALL (parameter) {
        return axios({
            url: '/mall/userconsume',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 商城道具消费明细-导出
     */
    SHOP_PROP_CONSUME_DETAIL_EXPORT (parameter) {
        return axios({
            url: '/mall/UserConsumeExport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 商城道具消费排名
     */
    SHOP_PROP_CONSUME_RANK_ALL (parameter) {
        return axios({
            url: '/mall/mallrank',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 商城道具消费排名-导出
     */
    SHOP_PROP_CONSUME_RANK_EXPORT (parameter) {
        return axios({
            url: '/mall/MallRankExport',
            method: 'get',
            params: parameter
        })
    },
})