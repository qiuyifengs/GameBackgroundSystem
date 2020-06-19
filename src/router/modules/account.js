import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true, cache: true }

export default {
    path: '/account',
    name: 'account',
    meta,
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'base/user',
            name: `${pre}base-user`,
            component: _import('account/base/user'),
            meta: { ...meta, title: '账户重要信息查询' },
        }
    ])('account-')
}