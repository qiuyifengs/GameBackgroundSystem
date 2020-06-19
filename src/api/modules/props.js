export default ({ axios }) => ({
    /**
     * @description 钻石申请
     */
    APPLY_DIAMOND_CREATE () {
        return axios({
            url: '/gm/diamondsapply',
            method: 'post',
            params: parameter
        })
    },
    /**
     * @description 钻石申请列表
     */
    APPLY_DIAMOND_ALL (parameter) {
        return axios({
            url: '/gm/DiamondsApplyList',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 能量申请
     */
    APPLY_ENERGY_CREATE (parameter) {
        return axios({
            url: '/gm/energyapply',
            method: 'post',
            params: parameter
        })
    },
    /**
     * @description 能量申请列表
     */
    APPLY_ENERGY_ALL (parameter) {
        return axios({
            url: '/gm/EnergyApplyList',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 道具申请
     */
    APPLY_GOLD_CREATE (parameter) {
        return axios({
            url: '/gm/itemapply',
            method: 'post',
            params: parameter
        })
    },
    /**
     * @description 道具申请列表
     */
    APPLY_GOLD_ALL (parameter) {
        return axios({
            url: '/gm/itemapplylist',
            method: 'get',
            params: parameter
        })
    }
})