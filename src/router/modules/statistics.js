import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true, cache: true }

export default {
    path: '/statistics',
    name: 'statistics',
    meta: { ...meta, title: '数据概况' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'survey/index',
            name: `${pre}survey-index`,
            meta: { ...meta, title: '总数据' },
            component: _import('statistics/survey/index')
        },
        {
            path: 'survey/monthlySummary',
            name: `${pre}survey-monthlySummary`,
            component: _import('statistics/survey/monthlySummary'),
            meta: { ...meta, title: '月度数据汇总' },
        },
        {
            path: 'survey/recharge',
            name: `${pre}survey-recharge`,
            component: _import('statistics/survey/recharge'),
            meta: { ...meta, title: '充值概况' },
        },
        {
            path: 'survey/rechargeOrderDetail',
            name: `${pre}survey-rechargeOrderDetail`,
            component: _import('statistics/survey/rechargeOrderDetail'),
            meta: { ...meta, title: '充值订单详情' },
        },
        {
            path: 'survey/rechargeHour',
            name: `${pre}survey-rechargeHour`,
            component: _import('statistics/survey/rechargeHour'),
            meta: { ...meta, title: '每小时充值金额' },
        },
        {
            path: 'survey/stageAmountRatioSingleStroke',
            name: `${pre}survey-stageAmountRatioSingleStroke`,
            component: _import('statistics/survey/stageAmountRatioSingleStroke'),
            meta: { ...meta, title: '各阶段充值金额比' },
        },
        {
            path: 'survey/stageAmountPeopleRatioSinleStroke',
            name: `${pre}survey-stageAmountPeopleRatioSinleStroke`,
            component: _import('statistics/survey/stageAmountPeopleRatioSinleStroke'),
            meta: { ...meta, title: '各阶段充值金额人数所占比' },
        },
        {
            path: 'survey/stageAmountRatioGrandTotal',
            name: `${pre}survey-stageAmountRatioGrandTotal`,
            component: _import('statistics/survey/stageAmountRatioGrandTotal'),
            meta: { ...meta, title: '各阶段充值金额比' },
        },
        {
            path: 'survey/stageAmountPeopleRatioGramdTotal',
            name: `${pre}survey-stageAmountPeopleRatioGramdTotal`,
            component: _import('statistics/survey/stageAmountPeopleRatioGramdTotal'),
            meta: { ...meta, title: '各阶段充值金额人数所占比' },
        },
        {
            path: 'survey/firstChargeRegisterDistribution',
            name: `${pre}survey-firstChargeRegisterDistribution`,
            component: _import('statistics/survey/firstChargeRegisterDistribution'),
            meta: { ...meta, title: '首充等级分布' },
        },
        {
            path: 'survey/LTV_Statistics',
            name: `${pre}survey-LTV_Statistics`,
            component: _import('statistics/survey/LTV_Statistics'),
            meta: { ...meta, title: 'LTV统计' },
        },
        {
            path: 'consume/shopPropsOverview',
            name: `${pre}consume-shopPropsOverview`,
            component: _import('statistics/consume/shopPropsOverview'),
            meta: { ...meta, title: '消费概况' },
        },
        {
            path: 'consume/shopPropsConsumeDetail',
            name: `${pre}consume-shopPropsConsumeDetail`,
            component: _import('statistics/consume/shopPropsConsumeDetail'),
            meta: { ...meta, title: '商城道具消费明细' },
        },
        {
            path: 'consume/shopPropsConsumeRank',
            name: `${pre}consume-shopPropsConsumeRank`,
            component: _import('statistics/consume/shopPropsConsumeRank'),
            meta: { ...meta, title: '商城道具消费排名' },
        },
        
        {
            path: 'online/realtime',
            name: `${pre}online-realtime`,
            component: _import('statistics/online/realtime'),
            meta: { ...meta, title: '实时在线' }
        },
        {
            path: 'online/everyMinutes_5',
            name: `${pre}online-everyMinutes_5`,
            component: _import('statistics/online/everyMinutes_5'),
            meta: { ...meta, title: '每5分钟在线' }
        },
        {
            path: 'activity/registrationSource',
            name: `${pre}activity-registrationSource`,
            component: _import('statistics/activity/registrationSource'),
            meta: { ...meta, title: '注册来源' },
        },
        {
            path: 'activity/loginStageConversionRate',
            name: `${pre}activity-loginStageConversionRate`,
            component: _import('statistics/activity/loginStageConversionRate'),
            meta: { ...meta, title: '登录各阶段转化率' },
        },
        {
            path: 'activity/keepStatistics',
            name: `${pre}activity-keepStatistics`,
            component: _import('statistics/activity/keepStatistics'),
            meta: { ...meta, title: '留存统计' },
        },
        {
            path: 'activity/rankDistribution',
            name: `${pre}activity-rankDistribution`,
            component: _import('statistics/activity/rankDistribution'),
            meta: { ...meta, title: '等级分布' },
        },
        {
            path: 'activity/lostPlayerRankDistribution',
            name: `${pre}activity-lostPlayerRankDistribution`,
            component: _import('statistics/activity/lostPlayerRankDistribution'),
            meta: { ...meta, title: '流失玩家等级分布' },
        },
        {
            path: 'activity/lostPlayerBehaviorRecord',
            name: `${pre}activity-lostPlayerBehaviorRecord`,
            component: _import('statistics/activity/lostPlayerBehaviorRecord'),
            meta: { ...meta, title: '玩家流失前行为记录' }
        },
        {
            path: 'activity/lostPlayerBehaviorStatistics',
            name: `${pre}activity-lostPlayerBehaviorStatistics`,
            component: _import('statistics/activity/lostPlayerBehaviorStatistics'),
            meta: { ...meta, title: '玩家流失前行为统计'}
        },
        {
            path: 'activity/playPartakeStatistics',
            name: `${pre}activity-playPartakeStatistics`,
            component: _import('statistics/activity/playPartakeStatistics'),
            meta: { ...meta, title: '玩法参与统计' }
        },
        {
            path: 'activity/heroStatistics',
            name: `${pre}activity-heroStatistics`,
            component: _import('statistics/activity/heroStatistics'),
            meta: { ...meta, title: '英雄数据统计' }
        },
        {
            path: 'rank/roleRecharge',
            name: `${pre}rank-roleRecharge`,
            component: _import('statistics/rank/roleRecharge'),
            meta: { ...meta, title: '平台角色充值排行榜' },
        },
        {
            path: 'rank/roleConsumption',
            name: `${pre}rank-roleConsumption`,
            component: _import('statistics/rank/roleConsumption'),
            meta: { ...meta, title: '平台角色消费排行榜' },
        },
        {
            path: 'rank/accountRecharge',
            name: `${pre}rank-accountRecharge`,
            component: _import('statistics/rank/accountRecharge'),
            meta: { ...meta, title: '平台账号充值排行榜' },
        }
    ])('statistics-')
}