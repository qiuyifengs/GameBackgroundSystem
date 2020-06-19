// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vuei18n from 'vue-i18n'
import zh_CN from "./locales/zh_CN";
import en_US from "./locales/en_US";

// Vue
import Vue from 'vue'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'
import util from '@/libs/util.js'

// 菜单和路由设置
// import router from './router'

import { menuHeader, menuAside } from '@/menu'
 
// import { frameInRoutes } from '@/router/routes'
import router, { constantRoutes } from '@/router'

import './core/lazy_use'
import './components/global.less'
// import 'ant-design-vue/dist/antd.css';

import './utils/filter'
import bootstrap from './core/bootstrap'

// 核心插件
Vue.use(d2Admin)
Vue.use(Vuei18n)

const messages = {
  'zh_CN': zh_CN,
  'en_US': en_US
}
 
const i18n = new Vuei18n({
  locale: 'zh_CN', // 语言标识
  messages
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  data(){
    return {
      menuHeader: [],
      menuAside: []
    }
  },
  created () {
    bootstrap()
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', constantRoutes)
    const token = util.cookies.get('token')
    if (token && token !== 'undefined') {
      this.$store.dispatch('d2admin/menu/load')
      this.$store.dispatch('d2admin/search/load', null, { root: true })
    }
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  watch: {
    // 检测路由变化切换侧边栏内容
    '$route.matched': {
      handler (matched) {
        if (matched.length > 0) {
          const currentAside = store.state.d2admin.menu.header
          const _side = menuAside.filter(menu => menu.path === matched[0].path)
          this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children : [])
        }
      },
      immediate: true
    }
  },
}).$mount('#app')
