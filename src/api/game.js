import axios from '@/plugin/axios'

// ===================================日志查询==============================================
/**
 * @description 玩家登陆日志查询
 */
export function getPlayerLoginLog (parameter) {
  return axios({
      url: '/user/userlogin',
      method: 'get',
      params: parameter
  })
}

// ===================================玩家信息==============================================
/**
 * @description IP下玩家管理
 */
export function getIpPlayer (parameter) {
  return axios({
      url: '/user/ipuser',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 账号角色封禁
 */
export function updateAccountRoleLock (parameter) {
  return axios({
      url: '/gm/addblackuser',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 账号角色封禁列表
 */
export function getAccountRoleLockList (parameter) {
  return axios({
      url: '/gm/BlackUser',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 账号角色禁言
 */
export function updateAccountRoleForbiddenWords (parameter) {
  return axios({
      url: '/gm/forbiddenwords',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 账号角色禁言列表
 */
export function getAccountRoleForbiddenWordsList (parameter) {
  return axios({
      url: '/gm/forbiddenwords',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 踢角色下线
 */
export function updateKickRolesOffline (parameter) {
  return axios({
      url: '/gm/kickout',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 给玩家发送邮件
 */
export function sendMail (parameter) {
  return axios({
      url: '/gm/sendemail',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 角色信息查询
 */
export function getRoleInfo (parameter) {
  return axios({
      url: '/gm/roleinfo',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 区服钻石查询
 */
export function getServerdiamonds (parameter) {
  return axios({
      url: '/gm/serverdiamonds',
      method: 'get',
      params: parameter
  })
}