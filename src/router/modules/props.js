import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true, cache: true }

export default {
    path: '/props',
    name: 'props',
    meta,
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'applyProps/propApplyList',
            name: `${pre}applyProps-propApplyList`,
            component: _import('props/applyProps/propApplyList'),
            meta: { ...meta, title: '能量申请列表' },
        },
        {
            path: 'applyProps/propGrantApprovalList',
            name: `${pre}applyProps-propGrantApprovalList`,
            component: _import('props/applyProps/propGrantApprovalList'),
            meta: { ...meta, title: '能量发放审批列表' },
        },
        {
            path: 'gameCurrency/goldApplyList',
            name: `${pre}gameCurrency-goldApplyList`,
            component: _import('props/gameCurrency/goldApplyList'),
            meta: { ...meta, title: '道具申请列表' },
        },
        {
            path: 'gameCurrency/goldApprovalList',
            name: `${pre}gameCurrency-goldApprovalList`,
            component: _import('props/gameCurrency/goldApprovalList'),
            meta: { ...meta, title: '道具审批列表' },
        },
        {
            path: 'applyDiamond/applyDiamondList',
            name: `${pre}applyDiamond-applyDiamondList`,
            component: _import('props/applyDiamond/applyDiamondList'),
            meta: { ...meta, title: '钻石申请列表' }
        },
        {
            path: 'applyDiamond/diamondApprovalList',
            name: `${pre}applyDiamond-diamondApprovalList`,
            component: _import('props/applyDiamond/diamondApprovalList'),
            meta: { ...meta, title: '钻石审批列表' }
        }
    ])('props-')
}