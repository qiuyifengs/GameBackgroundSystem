import axios from '@/plugin/axios'

/**
 * @description 管理员列表
 */
export function getAdminList (parameter) {
  return axios({
      url: '/manager/admin/list',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 用户分组列表
 */
export function getUserGroupList () {
  return axios({
      url: '/manager/admin/adminitemlist',
      method: 'get',
  })
}
/**
 * @description 新增管理员
 */
export function addAdmin (parameter) {
  return axios({
      url: '/manager/admin/addadminuser',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 编辑管理员
 */
export function editAdmin (parameter) {
  return axios({
      url: '/manager/admin/editadmin',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 删除管理员
 */
export function deleteAdmin (parameter) {
  return axios({
      url: '/manager/admin/deleteadmin',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 添加用户分组
 */
export function addUserGroup (parameter) {
  return axios({
      url: '/manager/admin/addadminitem',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 已授权列表
 */
export function getAccessList (parameter) {
  return axios({
      url: '/manager/access/auth',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 获取权限组
 */
export function getAuthData (parameter) {
  return axios({
      url: '/manager/access/authaddform',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 编辑管理员授权
 */
export function editAdminAuth (parameter) {
  return axios({
      url: '/manager/access/authaddform',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 保存管理员授权数据
 */
export function saveAdminAuth (parameter) {
  return axios({
      url: '/manager/access/groupsave',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 保存管理员授权数据
 */
export function deleteAdminAuth (parameter) {
  return axios({
      url: '/manager/access/authdelete',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 权限分组
 */
export function getAuthGroupList (parameter) {
  return axios({
      url: '/manager/access/grouplist',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 新增权限分组-获取表单
 */
export function getAddAuthGroupForm (parameter) {
  return axios({
      url: '/manager/access/groupaddform',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 编辑权限分组-获取表单
 */
export function getEditAuthGroupForm (parameter) {
  return axios({
      url: '/manager/access/groupeditform',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 删除权限分组
 */
export function deleteAuthGroup(parameter) {
  return axios({
      url: '/manager/access/groupdelete',
      method: 'post',
      params: parameter
  })
}
/**
 * @description 权限列表
 */
export function getRuleList (parameter) {
  return axios({
      url: '/manager/access/ruleslist',
      method: 'get',
      params: parameter
  })
}
/**
 * @description 更新权限列表与分组
 */
export function getRefreshAuthNode (parameter) {
  return axios({
      url: '/manager/access/rulessync',
      method: 'get',
      params: parameter
  })
}