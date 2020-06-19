export default {
    path: '/tools',
    title: '运营工具',
    icon: 'tool',
    children: (pre => [
        {
            path: `${pre}gift`,
            title: '礼包码管理',
            icon: 'gift',
            children: [
                {
                    path: `${pre}gift/giftList`,
                    title: '礼包列表'
                },
                {
                    path: `${pre}gift/giftCodeApplyList`,
                    title: '礼包码申请列表'
                },
                {
                    path: `${pre}gift/giftCodeUse`,
                    title: '礼包码使用查询'
                }
            ]
        },
        {
            path: `${pre}notice`,
            title: '游戏公告管理',
            icon: 'notification',
            children: [
                {
                    path: `${pre}notice/notificationList`,
                    title: '游戏公告列表'
                }
            ]
        },
    ])('/tools/')
}