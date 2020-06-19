import { Modal, message } from 'ant-design-vue'
import util from '@/libs/util.js'
import router from '@/router'
import api from '@/api'

export default {
  namespaced: true,
  state: {
    // 用户登录状态
    isLogged: !!util.cookies.get('token'),
  },
  actions: {
    /**
     * @description 登录
     * @param {Object} context
     * @param {Object} payload user_name {String} 用户账号
     * @param {Object} payload password {String} 密码
     * @param {Object} payload captcha {String} 验证码
     * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    async login({ commit, dispatch }, params) {
      try {
        // const res = await api.USER_LOGIN(params)
        // if (res.Success) {
          // 设置 cookie 一定要存 uuid 和 token 两个 cookie
          // 整个系统依赖这两个数据进行校验和存储
          // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
          // token 代表用户当前登录状态 建议在网络请求中携带 token
          // 如有必要 token 需要定时更新，默认保存一天
          // util.cookies.set('uuid', params.user_name)
          util.cookies.set('token', "admin")
          // 设置用户已经登陆
          commit('isLoggedSet', true)
          // 设置 vuex 用户信息
          await dispatch('d2admin/user/set', { name: params.user_name }, { root: true })
          // 用户登录后从持久化数据加载一系列的设置
          await dispatch('load', { root: true })
          message.success('登录成功')

          // const menu = await api.MENU_ALL()
          // await dispatch('d2admin/menu/set', menu.Data, { root: true })
          // await dispatch('d2admin/menu/load', null, { root: true })
          // // 初始化菜单搜索功能
          // await dispatch('d2admin/search/set', menu.Data, { root: true })
          // await dispatch('d2admin/search/load', null, { root: true })

          const lastLeaveRoute = util.cookies.get('lastLeaveRoute')
          console.log(lastLeaveRoute)
          if (lastLeaveRoute === undefined) {
            router.replace('/statistics/survey/index')
            return
          }
          if (!lastLeaveRoute.includes('login') && lastLeaveRoute !== undefined) {
            // [ 路由 ] 重新访问
            router.replace(lastLeaveRoute)
          } else {
            router.replace('/statistics/survey/index')
          }
        // } else {
          //
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} context
     * @param {Object} payload confirm {Boolean} 是否需要确认
     */
    logout ({ commit, dispatch }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      async function logout () {
        // 删除cookie
        util.cookies.remove('token')
        util.cookies.remove('uuid')
        // 清空 vuex 用户信息
        await dispatch('d2admin/user/set', {}, { root: true })
        await dispatch('d2admin/page/closeAll', null, { root: true })
        // 跳转路由
        router.push({
          name: 'login'
        })
      }
      // 判断是否需要确认
      if (confirm) {
        commit('d2admin/gray/set', true, { root: true })
        Modal.confirm({
          title: '注销用户',
          content: '确定要注销当前用户吗？',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            commit('d2admin/gray/set', false, { root: true })
              logout()
              util.cookies.set('lastLeaveRoute', '/statistics/survey/index')
          },
          onCancel() {
            commit('d2admin/gray/set', false, { root: true })
            message.success('取消注销操作')
          },
        });
      } else {
        logout()
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} context
     */
    load ({ dispatch }, data) {
      return new Promise(async resolve => {
        // DB -> store 加载用户名
        await dispatch('d2admin/user/load', data, { root: true })
        // DB -> store 加载主题
        // await dispatch('d2admin/theme/load', null, { root: true })
        // DB -> store 加载页面过渡效果设置
        await dispatch('d2admin/transition/load', null, { root: true })
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch('d2admin/page/openedLoad', null, { root: true })
        // DB -> store 持久化数据加载侧边栏折叠状态
        // await dispatch('d2admin/menu/asideCollapseLoad', null, { root: true })
        // DB -> store 持久化数据加载全局尺寸
        await dispatch('d2admin/size/load', null, { root: true })
        // await dispatch('d2admin/api/getChannel', null, { root: true })
        // await dispatch('d2admin/api/getServer', null, { root: true })
        // await dispatch('d2admin/api/getDeviceType', null, { root: true })
        // end
        resolve()
      })
    },
  },
  mutations: {
    /**
     * @description 设置用户登陆状态
     * @param {Object} state state
     * @param {Boolean} value 是否登录
     */
    isLoggedSet (state, value) {
      state.isLogged = value
    },
    setPermissionMenu (state, value) {
      state.permissionMenu = value
    }
  }
}
