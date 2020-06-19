export default {
    path: '/system',
    title: '系统管理',
    icon: 'setting',
    children: (pre => [
        {
            path: `${pre}game`,
            title: '游戏配置',
            icon: 'customer-service',
            children: [
                {
                    path: `${pre}game/businessCodeConfig`,
                    title: '业务代码配置'
                },
                {
                    path: `${pre}game/activityConfig`,
                    title: '活动配置'
                },
                {
                    path: `${pre}game/taskConfig`,
                    title: '任务配置'
                },
                {
                    path: `${pre}game/activityConfigDetail`,
                    title: '活动配置明细'
                },
                {
                    path: `${pre}game/clientEventsConfig`,
                    title: '客户端事件配置'
                },
                {
                    path: `${pre}game/clickLogSwitchConfig`,
                    title: '点击日志开关配置'
                }
            ]
        },
        {
            path: `${pre}backstage`,
            title: '后台配置',
            icon: 'usb',
            children: [
                {
                    path: `${pre}backstage/rechargeSegmentConfig`,
                    title: '充值分段配置'
                }
            ]
        },
        {
            path: `${pre}admin`,
            title: '管理员管理',
            icon: 'user',
            children: [
                {
                    path: `${pre}admin/adminList`,
                    title: '管理员列表'
                }
            ]
        },
        {
            path: `${pre}access`,
            title: '权限管理',
            icon: 'cluster',
            children: [
                {
                    path: `${pre}access/authGroup`,
                    title: '权限分组列表'
                },
                {
                    path: `${pre}access/authList`,
                    title: '已授权列表'
                },
                {
                    path: `${pre}access/ruleList`,
                    title: '权限列表'
                }
            ]
        }
    ])('/system/')
}