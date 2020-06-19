import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true, cache: true }

export default {
    path: '/system',
    name: 'system',
    meta,
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'game/businessCodeConfig',
            name: `${pre}game-businessCodeConfig`,
            component: _import('system/game/businessCodeConfig'),
            meta: { ...meta, title: '业务代码配置' },
        },
        {
            path: 'game/activityConfig',
            name: `${pre}game-activityConfig`,
            component: _import('system/game/activityConfig'),
            meta: { ...meta, title: '活动配置'}
        },
        {
            path: 'game/taskConfig',
            name: `${pre}game-taskConfig`,
            component: _import('system/game/taskConfig'),
            meta: { ...meta, title: '任务配置'}
        },
        {
            path: 'game/activityConfigDetail',
            name: `${pre}game-activityConfigDetail`,
            component: _import('system/game/activityConfigDetail'),
            meta: { ...meta, title: '活动配置明细'}
        },
        {
            path: 'game/clientEventsConfig',
            name: `${pre}game-clientEventsConfig`,
            component: _import('system/game/clientEventsConfig'),
            meta: { ...meta, title: '客户端事件配置'}
        },
        {
            path: 'game/clickLogSwitchConfig',
            name: `${pre}game-clickLogSwitchConfig`,
            component: _import('system/game/clickLogSwitchConfig'),
            meta: { ...meta, title: '点击日志开关配置'}
        },
        {
            path: 'backstage/rechargeSegmentConfig',
            name: `${pre}backstage-rechargeSegmentConfig`,
            component: _import('system/backstage/rechargeSegmentConfig'),
            meta: { ...meta, title: '活动配置'}
        },
        {
            path: 'admin/adminList',
            name: `${pre}admin-adminList`,
            component: _import('system/admin/adminList'),
            meta: { ...meta, title: '管理员列表'}
        },
        {
            path: 'access/authList',
            name: `${pre}access-authList`,
            component: _import('system/access/authList'),
            meta: { ...meta, title: '已授权列表'}
        },
        {
            path: 'access/authGroup',
            name: `${pre}access-authGroup`,
            component: _import('system/access/authGroup'),
            meta: { ...meta, title: '权限分组'}
        },
        {
            path: 'access/ruleList',
            name: `${pre}access-ruleList`,
            component: _import('system/access/ruleList'),
            meta: { ...meta, title: '权限列表'}
        }
    ])('system-')
}