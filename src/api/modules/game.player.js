export default ({ axios }) => ({
    /**
     * @description IP下玩家管理
     */
    IP_USER_ALL (parameter) {
        return axios({
            url: '/user/ipuser',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 账号角色封禁
     */
    PLAYER_ROLE_LOCK_UPDATE(parameter) {
        return axios({
            url: '/gm/addblackuser',
            method: 'post',
            params: parameter
        })
    },
    /**
     * @description 账号角色封禁列表
     */
    PLAYER_ROLE_LOCK_ALL(parameter) {
        return axios({
            url: '/gm/BlackUser',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 账号角色禁言
     */
    PLATER_ROLE_FORBIDDEN_WORDS_UPDATE(parameter) {
        return axios({
            url: '/gm/forbiddenwords',
            method: 'post',
            params: parameter
        })
    },
    /**
     * @description 账号角色禁言列表
     */
    PLAYER_ROLE_FORBIDDEN_WORDS_ALL (parameter) {
        return axios({
            url: '/gm/forbiddenwords',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 踢角色下线
     */
    PLAYER_KICK_ROLE_OFFLINE_UPDATE(parameter) {
        return axios({
            url: '/gm/kickout',
            method: 'post',
            params: parameter
        })
    },
    /**
     * @description 给玩家发送邮件
     */
    PLAYER_SEND_MAIL_CREATE(parameter) {
        return axios({
            url: '/gm/sendemail',
            method: 'post',
            params: parameter
        })
    },
    /**
     * @description 角色信息查询
     */
    ROLE_ALL(parameter) {
        return axios({
            url: '/gm/roleinfo',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 区服钻石查询
     */
    PLAYER_SERVER_DIAMONDS_ALL (parameter) {
        return axios({
            url: '/gm/serverdiamonds',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 玩家排行榜
     */
    PLAYER_RANK_ALL (parameter) {
        return axios({
            url: '/player-rank/playeranklist',
            method: 'get',
            params: parameter
        })
    },
    /**
     * @description 玩家排行榜-导出
     */
    PLAYER_RANK_EXPORT (parameter) {
        return axios({
            url: '/player-rank/playeranklistexport',
            method: 'get',
            params: parameter
        })
    }
})


