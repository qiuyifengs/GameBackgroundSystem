import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true, cache: true }

export default {
    path: '/game',
    name: 'game',
    meta,
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'player/roles',
            name: `${pre}player-roles`,
            component: _import('game/player/roles'),
            meta: { ...meta, title: '角色信息查询' },
        },
        // {
        //     path: 'player/roleConsume',
        //     name: `${pre}player-roleConsume`,
        //     component: _import('game/player/roleConsume'),
        //     meta: { ...meta, title: '角色消费查询' },
        // },
        {
            path: 'player/roleProps',
            name: `${pre}player-roleProps`,
            component: _import('game/player/roleProps'),
            meta: { ...meta, title: '角色道具查询' },
        },
        {
            path: 'player/sendMail',
            name: `${pre}player-sendMail`,
            component: _import('game/player/sendMail'),
            meta: { ...meta, title: '给玩家发送邮件' },
        },
        {
            path: 'player/IpPlayer',
            name: `${pre}player-IpPlayer`,
            component: _import('game/player/IpPlayer'),
            meta: { ...meta, title: 'IP下玩家管理' },
        },
        {
            path: 'player/districtServiceDiamond',
            name: `${pre}player-districtServiceDiamond`,
            component: _import('game/player/districtServiceDiamond'),
            meta: { ...meta, title: '区服钻石查询' },
        },
        {
            path: 'player/playerRank',
            name: `${pre}player-playerRank`,
            component: _import('game/player/playerRank'),
            meta: { ...meta, title: '玩家排行榜' },
        },
        // {
        //     path: 'player/accountRoleBlocked',
        //     name: `${pre}player-accountRoleBlocked`,
        //     component: _import('game/player/accountRoleBlocked'),
        //     meta: { ...meta, title: '账号角色封禁' },
        // },
        {
            path: 'player/accountRoleBlockedList',
            name: `${pre}player-accountRoleBlockedList`,
            component: _import('game/player/accountRoleBlockedList'),
            meta: { ...meta, title: '账号角色封禁列表' },
        },
        {
            path: 'player/accountRoleUnsealList',
            name: `${pre}player-accountRoleUnsealList`,
            component: _import('game/player/accountRoleUnsealList'),
            meta: { ...meta, title: '账号角色解封列表' },
        },
        {
            path: 'player/accountRoleUnsealApproval',
            name: `${pre}player-accountRoleUnsealApproval`,
            component: _import('game/player/accountRoleUnsealApproval'),
            meta: { ...meta, title: '账号角色解封审批' },
        },

        // {
        //     path: 'player/accountRoleForbiddenWords',
        //     name: `${pre}player-accountRoleForbiddenWords`,
        //     component: _import('game/player/accountRoleForbiddenWords'),
        //     meta: { ...meta, title: '账号角色禁言' },
        // },
        {
            path: 'player/accountRoleForbiddenWordsList',
            name: `${pre}player-accountRoleForbiddenWordsList`,
            component: _import('game/player/accountRoleForbiddenWordsList'),
            meta: { ...meta, title: '账号角色禁言列表' },
        },
        {
            path: 'player/playRoleOffline',
            name: `${pre}player-playRoleOffline`,
            component: _import('game/player/playRoleOffline'),
            meta: { ...meta, title: '踢角色下线' },
        },
        {
            path: 'log/roleEconomicLog',
            name: `${pre}log-roleEconomicLog`,
            component: _import('game/log/roleEconomicLog'),
            meta: { ...meta, title: '角色经济日志查询' },
        },
        {
            path: 'log/roleGoodsLog',
            name: `${pre}log-roleGoodsLog`,
            component: _import('game/log/roleGoodsLog'),
            meta: { ...meta, title: '角色物品日志查询' },
        },
        {
            path: 'log/playerLoginLog',
            name: `${pre}log-playerLoginLog`,
            component: _import('game/log/playerLoginLog'),
            meta: { ...meta, title: '玩家登录日志查询' },
        }
    ])('game-')
}