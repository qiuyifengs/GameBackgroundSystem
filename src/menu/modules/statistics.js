export default {
    path: '/statistics',
    title: '数据统计',
    icon: 'dashboard',
    children: (pre => [
        {
            path: `${pre}survey`,
            title: '数据概况',
            icon: 'line-chart',
            children: [
                {
                    path: `${pre}survey/index`,
                    title: '总数据',
                },
                {
                    path: `${pre}survey/monthlySummary`,
                    title: '月度数据汇总'
                },
                {
                    path: `${pre}survey/recharge`,
                    title: '充值概况'
                },
                {
                    path: `${pre}survey/rechargeOrderDetail`,
                    title: '充值订单详情'
                },
                {
                    path: `${pre}survey/rechargeHour`,
                    title: '每小时充值金额'
                },
                {
                    path: `${pre}survey/stageAmountRatioSingleStroke`,
                    title: '各段充值金额比(单笔)'
                },
                {
                    path: `${pre}survey/stageAmountPeopleRatioSinleStroke`,
                    title: '各段充值金额人数所占比(单笔)'
                },
                {
                    path: `${pre}survey/stageAmountRatioGrandTotal`,
                    title: '各段充值金额比(账号累计)'
                },
                {
                    path: `${pre}survey/stageAmountPeopleRatioGramdTotal`,
                    title: '各段充值金额人数所占比(账号累计)'
                },
                {
                    path: `${pre}survey/firstChargeRegisterDistribution`,
                    title: '首充等级分布'
                },
                {
                    path: `${pre}survey/LTV_Statistics`,
                    title: 'LTV统计'
                },
            ]
        },
        {
            path: `${pre}consume`,
            title: '消费统计',
            icon: 'pie-chart',
            children: [
                {
                    path: `${pre}consume/shopPropsOverview`,
                    title: '商城道具概况'
                },
                {
                    path: `${pre}consume/shopPropsConsumeDetail`,
                    title: '商城道具消费明细'
                },
                {
                    path: `${pre}consume/shopPropsConsumeRank`,
                    title: '商城道具消费排名'
                }
            ]
        },
        {
            path: `${pre}online`,
            title: '在线',
            icon: 'customer-service',
            children: [
                {
                    path: `${pre}online/realtime`,
                    title: '实时在线'
                },
                {
                    path: `${pre}online/everyMinutes_5`,
                    title: '每5分钟在线'
                }
            ]
        },
        {
            path: `${pre}activity`,
            title: '活跃与流失统计',
            icon: 'solution',
            children: [
                {
                    path: `${pre}activity/registrationSource`,
                    title: '注册来源'
                },
                {
                    path: `${pre}activity/loginStageConversionRate`,
                    title: '登录各阶段转化率'
                },
                {
                    path: `${pre}activity/keepStatistics`,
                    title: '留存统计'
                },
                {
                    path: `${pre}activity/rankDistribution`,
                    title: '等级分布'
                },
                {
                    path: `${pre}activity/lostPlayerRankDistribution`,
                    title: '流失玩家等级分布'
                },
                {
                    path: `${pre}activity/lostPlayerBehaviorRecord`,
                    title: '玩家流失前行为记录'
                },
                {
                    path: `${pre}activity/lostPlayerBehaviorStatistics`,
                    title: '玩家流失前行为统计'
                },
                {
                    path: `${pre}activity/playPartakeStatistics`,
                    title: '玩法参与统计'
                },
                {
                    path: `${pre}activity/heroStatistics`,
                    title: '英雄数据统计'
                }
            ]
        },
        {
            path: `${pre}rank`,
            title: '排行榜',
            icon: 'fund',
            children: [
                {
                    path: `${pre}rank/roleRecharge`,
                    title: '平台角色充值排行榜'
                },
                {
                    path: `${pre}rank/roleConsumption`,
                    title: '平台角色消费排行榜'
                },
                {
                    path: `${pre}rank/accountRecharge`,
                    title: '平台账号充值排行榜'
                }
            ]
        },
    ])('/statistics/')
}