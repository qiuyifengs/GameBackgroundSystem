// ===================================数据概况==============================================

export default ({ axios }) => ({
    /**
     * @description 总数据
     */
    OVERVIEW_ALL (parameter) {
        return axios({
            url: '/overview-stat/overview',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 月度数据汇总
     */
    OVERVIEW_MONTHLY_SUMMARY_ALL (parameter) {
        return axios({
            url: '/overview-stat/monthlydata',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 月度数据汇总-导出
     */
    OVERVIEW_MONTHLY_SUMMARY_EXPORT (parameter) {
        return axios({
            url: '/overview-stat/MonthlyDataexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 充值概况
     */
    OVERVIEW_RECHARGE_ALL (parameter) {
        return axios({
            url: '/recharge/statrechargeoverview',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 首充等级分布
     */
    OVERVIEW_FIRST_RANK_ALL (parameter) {
        return axios({
            url: '/recharge/firstpay',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 充值订单详情
     */
    OVERVIEW_RECHARGE_ORDER_DETAIL_ALL (parameter) {
        return axios({
            url: '/recharge/userrechargeorder',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 充值订单详情-数据导出
     */
    OVERVIEW_RECHARGE_ORDER_DETAIL_EXPORT (parameter) {
        return axios({
            url: '/recharge/userrechargeorderexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 每小时充值统计
     */
    OVERVIEW_RECHARGE_HOUR_ALL (parameter) {
        return axios({
            url: '/recharge/stathourlyrecharge',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 各段充值金额比(单笔)-1
     */
    OVERVIEW_STAGE_AMOUNT_RATIO_SINGLE_STROKE_ALL (parameter) {
        return axios({
            url: '/recharge/statsinglerecharge',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 各段充值金额比(单笔)-导出
     */
    OVERVIEW_STAGE_AMOUNT_RATIO_SINGLE_STROKE_EXPORT (parameter) {
        return axios({
            url: '/recharge/statsinglerechargeexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 各段充值金额人数所占比(单笔)-2
     */
    OVERVIEW_STAGE_AMOUNT_PEOPLE_RATIO_SINGLE_STROKE_ALL (parameter) {
        return axios({
            url: '/recharge/singlerechargecount',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 各段充值金额人数所占比(单笔)-导出
     */
    OVERVIEW_STAGE_AMOUNT_PEOPLE_RATIO_SINGLE_STROKE_EXPORT (parameter) {
        return axios({
            url: '/recharge/singlerechargecountexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 各段充值金额比(账号累计)-3
     */
    OVERVIEW_STAGE_AMOUNT_RATIO_GRAND_TOTAL_ALL (parameter) {
        return axios({
            url: '/recharge/statrechargesum',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 各段充值金额比(账号累计)-导出
     */
    OVERVIEW_STAGE_AMOUNT_RATIO_GRAND_TOTAL_EXPORT (parameter) {
        return axios({
            url: '/recharge/statrechargesumexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 各段充值金额人数所占比(账号累计)-4
     */
    OVERVIEW_STAGE_AMOUNT_PEOPLE_RATIO_GRAMD_TOTAL_ALL (parameter) {
        return axios({
            url: '/recharge/statrechargesumcount',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 各段充值金额人数所占比(账号累计)-导出
     */
    OVERVIEW_STAGE_AMOUNT_PEOPLE_RATIO_GRAMD_TOTAL_ALL_EXPORT (parameter) {
        return axios({
            url: '/recharge/statrechargesumcountexport',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description LTV统计
     */
    LTV_ALL (parameter) {
        return axios({
            url: '/recharge/ltv',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description LTV统计-导出
     */
    LTV_EXPORT (parameter) {
        return axios({
            url: '/recharge/ltvexport',
            method: 'get',
            params: parameter
        })
    }
})