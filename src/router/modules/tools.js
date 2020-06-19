import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true, cache: true }

export default {
    path: '/tools',
    name: 'tools',
    meta,
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'gift/giftList',
            name: `${pre}gift-giftList`,
            component: _import('tools/gift/giftList'),
            meta: { ...meta, title: '礼包列表' }
        },
        {
            path: 'gift/giftCodeApplyList',
            name: `${pre}gift-giftCodeApplyList`,
            component: _import('tools/gift/giftCodeApplyList'),
            meta: { ...meta, title: '礼包码申请列表' },
        },
        {
            path: 'gift/giftCodeUse',
            name: `${pre}gift-giftCodeUse`,
            component: _import('tools/gift/giftCodeUse'),
            meta: { ...meta, title: '礼包码使用查询'}
        },
        {
            path: 'notice/notificationList',
            name: `${pre}notice-notificationList`,
            component: _import('tools/notice/notificationList'),
            meta: { ...meta, title: '游戏公告管理' },
        }
    ])('tools-')
}