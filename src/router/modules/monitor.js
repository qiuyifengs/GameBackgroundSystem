import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true, cache: true }

export default {
    path: '/monitor',
    name: 'monitor',
    meta,
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'chat/page1',
            name: `${pre}chat-page1`,
            component: _import('monitor/chat/page1'),
            meta: { ...meta, title: '聊天监控' },
        },
        {
            path: 'currency/currencyMonitorList',
            name: `${pre}currency-currencyMonitorList`,
            component: _import('monitor/currency/currencyMonitorList'),
            meta: { ...meta, title: '货币监控' },
        }
    ])('monitor-')
}