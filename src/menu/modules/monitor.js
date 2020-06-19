export default {
    path: '/monitor',
    title: '监控系统',
    icon: 'cluster',
    children: (pre => [
        {
            path: `${pre}chat`,
            title: '聊天监控',
            icon: 'share-alt',
            children: [
                {
                    path: `${pre}chat/page1`,
                    title: '实时聊天监控列表'
                }
            ]
        },
        {
            path: `${pre}currency`,
            title: '货币监控',
            icon: 'pay-circle',
            children: [
                {
                    path: `${pre}currency/currencyMonitorList`,
                    title: '货币监控列表'
                }
            ]
        },
    ])('/monitor/')
}