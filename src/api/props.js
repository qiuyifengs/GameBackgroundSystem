import axios from '@/plugin/axios'

// ===================================道具申请==============================================
/**
 * @description 钻石申请
 */
export function updateApplyDiamond (parameter) {
  return axios({
      url: '/gm/diamondsapply',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 钻石申请列表
 */
export function getApplyDiamondList (parameter) {
  return axios({
      url: '/gm/DiamondsApplyList',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 能量申请
 */
export function updateApplyEnergy (parameter) {
  return axios({
      url: '/gm/energyapply',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 能量申请列表
 */
export function getApplyEnergy (parameter) {
  return axios({
      url: '/gm/itemapplylist',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 道具申请
 */
export function updateGoldApply (parameter) {
  return axios({
      url: '/gm/itemapply',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 道具申请列表
 */
export function getGoldApplyList (parameter) {
  return axios({
      url: '/gm/itemapplylist',
      method: 'get',
      params: parameter
  })
}

