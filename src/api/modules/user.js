export default ({ axios }) => ({
    /**
     * @description 登录
     */
    USER_LOGIN (parameter) {
        return axios({
            url: '/manager/authorize/login',
            method: 'post',
            params: parameter
        })
    },
    /**
     * @description 登出
     */
    USER_LOGOUT () {
        return axios({
            url: '/manager/authorize/logout',
            method: 'get'
        })
    },
    /**
     * @description 验证码
     */
    CAPTCHA_CHECK () {
        return axios({
            url: '/manager/authorize/captcha',
            method: 'get',
            responseType: 'arraybuffer'
        })
    },
    /**
     * @description 权限菜单列表
     */
    MENU_ALL () {
        return axios({
            url: '/index/menu',
            method: 'get'
        })
    },
    /**
     * @description 查询当前登录管理员信息
     */
    USER_ADMIN_INFO () {
        return axios({
            url: '/index/Admin',
            method: 'get'
        })
    },  
    /**
     * @description 编辑管理员
     */
    USER_ADMIN_UPDATE (parameter = {}) {
        return axios({
            url: '/index/EditAdmin',
            method: 'post',
            params: parameter
        })
    }
})