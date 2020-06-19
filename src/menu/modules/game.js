export default {
    path: '/game',
    title: '游戏管理查询',
    icon: 'deployment-unit',
    children: (pre => [
        {
            path: `${pre}player`,
            title: '玩家信息管理',
            icon: 'idcard',
            children: [
                {
                    path: `${pre}player/roles`,
                    title: '角色信息查询'
                },
                // {
                //     path: `${pre}player/roleConsume`,
                //     title: '角色消费查询'
                // },
                {
                    path: `${pre}player/roleProps`,
                    title: '角色道具查询'
                },
                {
                    path: `${pre}player/sendMail`,
                    title: '给玩家发送邮件'
                },
                {
                    path: `${pre}player/IpPlayer`,
                    title: 'IP下玩家管理'
                },
                {
                    path: `${pre}player/districtServiceDiamond`,
                    title: '区服钻石查询'
                },
                {
                    path: `${pre}player/playerRank`,
                    title: '玩家排行榜'
                },
                // {
                //     path: `${pre}player/accountRoleBlocked`,
                //     title: '账号角色封禁'
                // },
                {
                    path: `${pre}player/accountRoleBlockedList`,
                    title: '账号角色封禁列表'
                },
                {
                    path: `${pre}player/accountRoleUnsealList`,
                    title: '账号角色解封列表'
                },
                {
                    path: `${pre}player/accountRoleUnsealApproval`,
                    title: '账号角色解封审批'
                },
                // {
                //     path: `${pre}player/accountRoleForbiddenWords`,
                //     title: '账号角色禁言'
                // },
                {
                    path: `${pre}player/accountRoleForbiddenWordsList`,
                    title: '账号角色禁言列表'
                },
                {
                    path: `${pre}player/playRoleOffline`,
                    title: '踢角色下线'
                },
            ]
        },
        {
            path: `${pre}log`,
            title: '日志查询',
            icon: 'security-scan',
            children: [
                {
                    path: `${pre}log/roleEconomicLog`,
                    title: '角色经济日志查询'
                },
                {
                    path: `${pre}log/roleGoodsLog`,
                    title: '角色物品日志查询'
                },
                {
                    path: `${pre}log/playerLoginLog`,
                    title: '玩家登录日志查询'
                }
            ]
        },
    ])('/game/')
}