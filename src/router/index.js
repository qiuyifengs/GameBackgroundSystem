import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less' // progress bar custom style

import store from '@/store/index'
import util from '@/libs/util.js'

import layoutHeaderAside from '@/layout/header-aside'

import statistics from './modules/statistics'
import game from './modules/game'
import monitor from './modules/monitor'
import props from './modules/props'
import tools from './modules/tools'
import system from './modules/system'
import account from './modules/account'

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 路由数据

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

export function createRoutesInLayout (routes = []) {
  return [
    {
      path: '/',
      redirect: { name: 'statistics-survey-index' },
      component: layoutHeaderAside,
      children: [
        // { path: 'statistics-survey-index', name: 'statistics-survey-index', meta: { title: '总数据', auth: true }, component: _import('statistics/survey/index') },
        { path: 'log', name: 'log', meta: { title: '前端日志', auth: true }, component: _import('system/log') },
      ]
    },
    statistics,
    game,
    monitor,
    props,
    tools,
    system,
    account,
  ]
}

// 在 layout 之外显示的路由
export const routesOutLayout = [
  { path: 'refresh', name: 'refresh', hidden: true, component: _import('system/function/refresh') },
  { path: 'redirect/:route*', name: 'redirect', hidden: true, component: _import('system/function/redirect') },
  { path: '/login', name: 'login', hidden: true, component: _import('system/login') },
  { path: '*', name: '404', hideen: true, component: _import('system/error/404') },
  { path: '/500', name: '500', hidden: true, component: _import('system/error/500') }
]

// 默认的路由
export const constantRoutes = createRoutesInLayout().concat(routesOutLayout)

const createRouter = (routes = []) => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

// 导出路由 在 main.js 里使用
const router = createRouter(constantRoutes)

export function resetRouter (routes = []) {
  router.matcher = createRouter(routes).matcher
}

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 确认已经加载多标签页数据
  await store.dispatch('d2admin/page/isLoaded')
  // 确认已经加载组件尺寸设置
  await store.dispatch('d2admin/size/isLoaded')
  // 进度条
  NProgress.start()
  // 关闭搜索面板
  store.commit('d2admin/search/set', false)
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some(r => r.meta.auth)) {
    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
    // 请根据自身业务需要修改
    const token = util.cookies.get('token')
    if (token && token !== 'undefined') {
      next()
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
    }
  } else {
    // 不需要身份校验 直接通过
    next()
  }
})

router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 多页控制 打开新的页面
  store.dispatch('d2admin/page/open', to)
  // 更改标题
  util.title(to.meta.title)
})

export default router
