<template>
<!-- <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{info.name ? `你好 ${info.name}` : '未登录'}}</span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logOff">
            <d2-icon name="power-off" class="d2-mr-5" />
            注销
        </el-dropdown-item>
    </el-dropdown-menu>
</el-dropdown> -->
<a-dropdown class="antd-pro-components-global-header-index-action antd-pro-components-global-header-index-account">
    <span class="ant-dropdown-link user-dropdown-menu">
        <a-avatar class="antd-pro-components-global-header-index-avatar" size="small" :src="`${$baseUrl}image/avatar2.png`" />
        <span>{{info.name ? `你好 ${info.name}` : '未登录'}}</span>
    </span>
    <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <a-menu-item key="2" @click="$refs.createModal.edit()">
            <a-icon type="setting" />
            <span>个人设置</span>
            <create-edit-admin-form ref="createModal" />
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
            <a href="javascript:;" @click="logOff">
                <a-icon type="logout" />
                <span>退出登录</span>
            </a>
        </a-menu-item>
    </a-menu>
    
</a-dropdown>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex'
import CreateEditAdminForm from '@/components/CreateEditAdminForm'

export default {
    components: {
        CreateEditAdminForm
    },
    computed: {
        ...mapState('d2admin/user', [
            'info'
        ])
    },
    methods: {
        ...mapActions('d2admin/account', [
            'logout'
        ]),
        /**
         * @description 登出
         */
        logOff() {
            this.logout({
                confirm: true
            })
        },
    }
}
</script>
