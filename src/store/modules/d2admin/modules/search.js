import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 搜索面板激活状态
    active: false,
    // 快捷键
    hotkey: {
      open: setting.hotkey.search.open,
      close: setting.hotkey.search.close
    },
    // 所有可以搜索的页面
    pool: []
  },
  actions: {
    set ({ state, dispatch, commit }, menu) {
      return new Promise(async resolve => {
        // store 赋值
        commit('set', menu)
        // 持久化
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'search.info',
          value: menu,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    load ({ state, dispatch, commit }) {
      return new Promise(async resolve => {
        // store 赋值
        const menu = await dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'search.info',
          defaultValue: {},
          user: true
        }, { root: true })

        commit('init', menu)
        // end
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @description 切换激活状态
     * @param {Object} state state
     */
    toggle (state) {
      state.active = !state.active
    },
    /**
     * @description 设置激活模式
     * @param {Object} state state
     * @param {Boolean} active active
     */
    set (state, active) {
      state.active = active
    },
    /**
     * @description 初始化
     * @param {Object} state state
     * @param {Array} menu menu
     */
    init (state, menu) {
      const pool = []
      const push = function (menu, titlePrefix = []) {
        menu.forEach(m => {
          if (m.children) {
            push(m.children, [ ...titlePrefix, m.title ])
          } else {
            pool.push({
              ...m,
              fullTitle: [ ...titlePrefix, m.title ].join(' / ')
            })
          }
        })
      }
      push(menu)
      state.pool = pool
    }
  }
}
