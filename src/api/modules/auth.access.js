export default ({ axios }) => ({
  /**
   * @description 管理员列表
   */
  ADMIN_ALL (parameter = {}) {
    return axios({
      url: '/manager/admin/list',
      method: 'get',
      params: parameter
    })
  },
  /**
   * @description 新增管理员
   */
  ADMIN_CREATE (parameter = {}) {
    return axios({
      url: '/manager/admin/addadminuser',
      method: 'post',
      params: parameter
    })
  },
  /**
   * @description 编辑管理员
   */
  ADMIN_UPDATE (parameter = {}) {
    return axios({
      url: '/manager/admin/editadmin',
      method: 'post',
      params: parameter
    })
  },
  /**
   * @description 删除管理员
   */
  ADMIN_DELETE (parameter = {}) {
    return axios({
      url: '/manager/admin/deleteadmin',
      method: 'post',
      params: parameter
    })
  },
  /**
   * @description 用户分组列表
   */
  ADMIN_GROUP_ALL (parameter = {}) {
    return axios({
      url: '/manager/admin/adminitemlist',
      method: 'get',
    })
  },
  /**
   * @description 添加用户分组
   */
  ADMIN_USERGROUP_CREATE (parameter = {}) {
    return axios({
      url: '/manager/admin/addadminitem',
      method: 'post',
      params: parameter
    })
  },
  /**
   * @description 已授权列表
   */
  ACCESS_ALL (parameter = {}) {
    return axios({
      url: '/manager/access/auth',
      method: 'get',
      params: parameter
    })
  },
  /**
   * @description 新增管理员授权-获取表单
   */
  ACCESS_AUTH_ADD_FORM (parameter = {}) {
    return axios({
      url: '/manager/access/authaddform',
      method: 'get',
      params: parameter
    })
  },
  /**
   * @description 编辑管理员授权-获取表单
   */
  ACCESS_AUTH_UPDATE_FORM (parameter = {}) {
    return axios({
      url: '/manager/access/autheditform',
      method: 'get',
      params: parameter
    })
  },
  /**
   * @description 保存管理员授权数据
   */
  ACCESS_AUTH_SAVE (parameter = {}) {
    return axios({
      url: '/manager/access/authsave',
      method: 'post',
      params: parameter
    })
  },
  /**
   * @description 管理员授权删除
   */
  ACCESS_AUTH_DELETE (parameter = {}) {
    return axios({
      url: '/manager/access/authdelete',
      method: 'post',
      params: parameter
    })
  },
  /**
   * @description 权限分组
   */
  ACCESS_AUTH_GROUP_ALL (parameter) {
    return axios({
      url: '/manager/access/grouplist',
      method: 'get',
      params: parameter
    })
  },
  /**
   * @description 新增权限分组-获取表单
   */
  ACCESS_AUTH_GROUP_ADDFORM_FORM () {
    return axios({
      url: '/manager/access/groupaddform',
      method: 'get'
    })
  },
  /**
   * @description 编辑权限分组-获取表单
   */
  ACCESS_AUTH_GROUP_UPDATE_FORM (parameter) {
    return axios({
      url: '/manager/access/groupeditform',
      method: 'get',
      params: parameter
    })
  },
  ACCESS_AUTH_GROUP_SAVE (parameter) {
    return axios({
      url: '/manager/access/groupsave',
      method: 'post',
      params: parameter
    })
  },
  /**
   * @description 删除权限分组
   */
  ACCESS_AUTH_GROUP_DELETE (parameter) {
    return axios({
      url: '/manager/access/groupdelete',
      method: 'post',
      params: parameter
    })
  },
  /**
   * @description 权限列表
   */
  ACCESS_RULE_ALL (parameter) {
    return axios({
      url: '/manager/access/ruleslist',
      method: 'get',
      params: parameter
    })
  },
  /**
   * @description 更新权限列表与分组
   */
  ACCESS_AUTH_REFRESH_NODE () {
    return axios({
      url: '/manager/access/rulessync',
      method: 'get'
    })
  }
})