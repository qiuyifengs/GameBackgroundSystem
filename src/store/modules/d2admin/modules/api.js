import api from '@/api'

export default {
  namespaced: true,
  state: {
    channelList: [],
    serverList: [],
    deviceTypeList: []
  },
  actions: {
    async getChannel ({ commit }) {
      const res = await api.CHANNEL_ALL()
      commit('SET_CHANNEL', res.Data.list)
    },
    async getServer ({ commit }) {
      const res = await api.SERVER_ALL()
      commit('SET_SERVER', res.Data.list)
    },
    async getDeviceType ({ commit }) {
      const res = await api.DEVICE_TYPE_ALL()
      commit('set_DEVICE_TYPE', res.Data.list)
    }
  },
  mutations: {
    SET_CHANNEL (state, value) {
      state.channelList = value
    },
    SET_SERVER (state, value) {
      state.serverList = value
    },
    set_DEVICE_TYPE (state, value) {
      state.deviceTypeList = value
    }
  }
}
