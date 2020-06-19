import axios from '@/plugin/axios'

export function AccountLogin () {
  return axios({
    url: '/login',
    method: 'get'
  })
}


// ===================================数据概况==============================================
/**
 * @description 首充等级分布
 */
export function getfirstChargeRegisterDistribution (parameter) {
  return axios({
      url: '/recharge/firstpay',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 充值订单详情
 */
export function getRechargeOrderDetail (parameter) {
  return axios({
      url: '/recharge/userrechargeorder',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 充值订单详情-数据导出
 */
export function getRechargeOrderDetailExport (parameter) {
  return axios({
      url: '/recharge/userrechargeorderexport',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 每小时充值统计
 */
export function getRechargeHour (parameter) {
  return axios({
      url: '/recharge/stathourlyrecharge',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 各段充值金额比(单笔)-1
 */
export function getStageAmountRatioSingleStroke (parameter) {
  return axios({
      url: '/recharge/statsinglerecharge',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 各段充值金额比(单笔)-导出
 */
export function getStageAmountRatioSingleStrokeExport (parameter) {
  return axios({
      url: '/recharge/statsinglerechargeexport',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 各段充值金额人数所占比(单笔)-2
 */
export function getStageAmountPeopleRatioSinleStroke (parameter) {
  return axios({
      url: '/recharge/singlerechargecount',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 各段充值金额人数所占比(单笔)-导出
 */
export function getStageAmountPeopleRatioSinleStrokeExport (parameter) {
  return axios({
      url: '/recharge/singlerechargecountexport',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 各段充值金额比(账号累计)-3
 */
export function getStageAmountRatioGrandTotal (parameter) {
  return axios({
      url: '/recharge/statrechargesum',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 各段充值金额比(账号累计)-导出
 */
export function getStageAmountRatioGrandTotalExport (parameter) {
  return axios({
      url: '/recharge/statrechargesumexport',
      method: 'get',
      params: parameter
  })
}

/**
 * @description 各段充值金额人数所占比(账号累计)-4
 */
export function getStageAmountPeopleRatioGramdTotal (parameter) {
  return axios({
      url: '/recharge/statrechargesumcount',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 各段充值金额人数所占比(账号累计)-导出
 */
export function getStageAmountPeopleRatioGramdTotalExport (parameter) {
  return axios({
      url: '/recharge/statrechargesumcountexport',
      method: 'get',
      params: parameter
  })
}
/**
 * @description LTV统计
 */
export function getLtvStatistics (parameter) {
  return axios({
      url: '/recharge/ltv',
      method: 'get',
      params: parameter
  })
}
/**
 * @description LTV统计-导出
 */
export function getLtvStatisticsExport (parameter) {
  return axios({
      url: '/recharge/ltvexport',
      method: 'get',
      params: parameter
  })
}
// ===================================活跃与流失统计==============================================
/**
 * @description 留存统计
 */
export function getLiucun (parameter) {
    return axios({
        url: '/user/liucun',
        method: 'get',
        params: parameter
    })
}
/**
 * @description 留存统计-数据导出
 */
export function getLiucunExport (parameter) {
  return axios({
      url: '/user/liucunexport',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 注册来源
 */
export function getRegsourcestat (parameter) {
  return axios({
      url: '/user/regsourcestat',
      method: 'get',
      params: parameter
  })
}
// ===================================消费统计==============================================
/**
 * @description 商城道具概况
 */
export function geShopPropsOverview (parameter) {
  return axios({
      url: '/mall/mallstat',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 商城道具概况-导出
 */
export function geShopPropsOverviewExport (parameter) {
  return axios({
      url: '/mall/mallstatexport',
      method: 'get',
      params: parameter
  })
}

// ===================================排行榜==============================================
/**
 * @description 渠道角色充值排行
 */
export function getRoleRechargeRank (parameter) {
  return axios({
      url: '/recharge/statrolerechargeranklist',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 渠道角色充值排行-导出
 */
export function getRoleRechargeRankExport (parameter) {
  return axios({
      url: '/recharge/statrolerechargeranklistexport',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 渠道账号充值排行
 */
export function getAccountRechargeRank (parameter) {
  return axios({
      url: '/recharge/statrechargeranklist',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 渠道账号充值排行-导出
 */
export function getAccountRechargeRankExport (parameter) {
  return axios({
      url: '/recharge/statrechargeranklistexport',
      method: 'get',
      params: parameter
  })
}

// ===================================在线==============================================
/**
 * @description 实时在线
 */
export function getRealtime (parameter) {
  return axios({
      url: '/user/useronline',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 全服在线
 */
export function getFullServiceOnline (parameter) {
  return axios({
      url: '/user/totaluseronline',
      method: 'get',
      params: parameter
  })
}