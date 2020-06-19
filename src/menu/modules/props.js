export default {
    path: '/props',
    title: '道具申请',
    icon: 'api',
    children: (pre => [
        {
            path: `${pre}applyProps`,
            title: '游戏币申请',
            icon: 'api',
            children: [
                {
                    path: `${pre}applyProps/propApplyList`,
                    title: '能量申请列表'
                },
                {
                    path: `${pre}applyProps/propGrantApprovalList`,
                    title: '能量审批列表'
                }
            ]
        },
        {
            path: `${pre}gameCurrency`,
            title: '道具申请',
            icon: 'api',
            children: [
                {
                    path: `${pre}gameCurrency/goldApplyList`,
                    title: '道具申请列表'
                },
                {
                    path: `${pre}gameCurrency/goldApprovalList`,
                    title: '道具审批列表'
                }
            ]
        },
        {
            path: `${pre}applyDiamond`,
            title: '钻石申请',
            icon: 'api',
            children: [
                {
                    path: `${pre}applyDiamond/applyDiamondList`,
                    title: '钻石申请列表'
                },
                {
                    path: `${pre}applyDiamond/diamondApprovalList`,
                    title: '钻石审批列表'
                }
            ]
        }
    ])('/props/')
}