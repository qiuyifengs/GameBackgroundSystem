<template>
<div class="ant-design-pro ant-pro-basicLayout">
    <a-layout :class="{grayMode: grayActive}">
        <a-drawer v-if="isMobile()" placement="left" :closable="false" :visible="collapsed" @close="drawerClose">

        </a-drawer>

        <a-layout-sider :theme="navTheme" :class="['ant-pro-sider-menu-sider', navTheme, fixSiderbar ? 'fix-sider-bar' : null]" :trigger="null" :width="asideCollapse ? asideWidthCollapse : asideWidth" collapsible>
            <div class="ant-pro-sider-menu-logo" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}" flex-box="0">
                <router-link to="/">
                    <img :src="`${$baseUrl}image/logo.png`" style="width: 32px; display: inline-block; vertical-align: middle">
                    <h1 v-if="!asideCollapse">游戏后台管理系统</h1>
                </router-link>
            </div>

            <d2-menu-side />
        </a-layout-sider>
        <a-layout :style="{ minHeight: '100vh', overflow: 'hidden', 'padding-left': fixSiderbar ? (asideCollapse ? asideWidthCollapse : asideWidth) : 0 }">
            <transition name="showHeader">
                <template v-if="visible">
                    <a-layout-header v-if="visible" :style="{ background: '#fff', padding: 0, width: fixedHeader ? (asideCollapse ? `calc(100% - ${asideWidthCollapse})` : `calc(100% - ${asideWidth}`) : '100%' }" :class="[fixedHeader && 'ant-pro-fixed-header', asideCollapse ? 'ant-header-side-closed' : 'ant-header-side-opened', ]">
                        <div class="ant-pro-global-header">
                            <span class="ant-pro-global-header-trigger">
                                <a-icon class="trigger" @click="handleToggleAside" :type="asideCollapse ? 'menu-unfold' : 'menu-fold'" />
                            </span>
                            <d2-menu-header />
                            <!-- 顶栏右侧 -->
                            <div class="antd-pro-components-global-header-index-right">
                                <d2-header-search @click="handleSearchClick" />
                                <d2-header-log />
                                <d2-header-fullscreen />
                                <d2-header-user />
                                <!-- <header-lang /> -->
                            </div>
                        </div>
                    </a-layout-header>
                </template>
            </transition>
            <a-layout-content :style="{ height: '100%', margin: '18px', paddingTop: fixedHeader ? '64px' : '0' }">
                <div>
                    <div v-if="multiTab" class="page-header" style="background-color: #fff; padding: 16px 32px 0;">
                        <multi-tab></multi-tab>
                    </div>
                    <!-- 搜索 -->
                    <transition name="fade-scale">
                        <div v-if="searchActive" class="d2-theme-container-main-layer" flex>
                            <d2-panel-search ref="panelSearch" @close="searchPanelClose" />
                        </div>
                    </transition>
                    <!-- 内容 -->
                    <transition name="fade-scale">
                        <template v-if="!searchActive">
                            <div class="page-header-index-wide">
                                <!-- 页面 -->
                                <div class="d2-theme-container-main-body" flex-box="1">
                                    <keep-alive :include="keepAlive">
                                        <router-view />
                                    </keep-alive>
                                </div>
                            </div>
                        </template>
                    </transition>

                    <!-- Setting Drawer (show in development mode) -->
                    <setting-drawer></setting-drawer>
                </div>

            </a-layout-content>
        </a-layout>
        <div id="components-back-top-demo-custom">
            <a-back-top>
                <div class="ant-back-top-inner">UP</div>
            </a-back-top>
        </div>
    </a-layout>
</div>
</template>

<script>
import d2MenuSide from './components/menu-side'
import d2MenuHeader from './components/menu-header'
import d2HeaderFullscreen from './components/header-fullscreen'
import d2HeaderSearch from './components/header-search'
import d2HeaderUser from './components/header-user'
import d2HeaderLog from './components/header-log'
import HeaderLang from './components/header-lang'

import config from '@/config/defaultSettings'
import SettingDrawer from '@/components/SettingDrawer'

import {
    mixin,
    mixinDevice
} from '@/utils/mixin'

import {
    mapState,
    mapGetters,
    mapActions
} from 'vuex'
import mixinSearch from './mixins/search'
export default {
    name: 'd2-layout-header-aside',
    mixins: [
        mixinSearch,
        mixin, mixinDevice
    ],
    components: {
        d2MenuSide,
        d2MenuHeader,
        d2HeaderFullscreen,
        d2HeaderSearch,
        d2HeaderUser,
        d2HeaderLog,
        SettingDrawer,
        // HeaderLang
    },
    data() {
        return {
            // [侧边栏宽度] 正常状态
            asideWidth: '265px',
            // [侧边栏宽度] 折叠状态
            asideWidthCollapse: '80px',
            production: config.production,
            collapsed: false,
            visible: true,
            oldScrollTop: 0
        }
    },
    computed: {
        ...mapState('d2admin', {
            keepAlive: state => state.page.keepAlive,
            grayActive: state => state.gray.active,
            transitionActive: state => state.transition.active,
            asideCollapse: state => state.menu.asideCollapse,
            navTheme: state => state.app.theme,
            contentWidth: state => state.app.contentWidth,
            sidebarOpened: state => state.app.sidebar,
            fixSidebar: state => state.app.fixSiderbar,
            fixedHeader: state => state.app.fixedHeader,
            fixSiderbar: state => state.app.fixSiderbar,
            autoHideHeader: state => state.app.autoHideHeader,
            multiTab: state => state.app.multiTab
        }),
        contentPaddingLeft() {
            if (!this.fixSidebar) {
                return '0'
            }
            if (!this.asideCollapse) {
                return '265px'
            }
            return '80px'
        }
    },
    mounted() {
        document.addEventListener('scroll', this.handleScroll, {
            passive: true
        })
    },
    beforeDestroy() {
        document.body.removeEventListener('scroll', this.handleScroll, true)
    },
    methods: {
        ...mapActions('d2admin/menu', [
            'asideCollapseToggle'
        ]),
        ...mapActions('d2admin/app', [
            'setSidebar'
        ]),
        changeLang() {
            this.$i18n.locale = this.$i18n.locale === "en_US" ? "zh_CN" : "en_US";
        },
        /**
         * 接收点击切换侧边栏的按钮
         */
        handleToggleAside() {
            this.asideCollapseToggle()
        },
        drawerClose() {
            this.collapsed = false
        },
        handleScroll() {
            if (!this.autoHideHeader) {
                return
            }

            const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
            if (!this.ticking) {
                this.ticking = true
                requestAnimationFrame(() => {
                    if (this.oldScrollTop > scrollTop) {
                        this.visible = true
                    } else if (scrollTop > 300 && this.visible) {
                        this.visible = false
                    } else if (scrollTop < 300 && !this.visible) {
                        this.visible = true
                    }
                    this.oldScrollTop = scrollTop
                    this.ticking = false
                })
            }
        },
    }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';

.el-menu {
    border-right: none !important
}

.el-menu--collapse {
    width: 80px;
    text-align: center
}

.ant-layout-sider-dark .el-submenu__title:hover {
    color: #fff !important;
    background: transparent !important;
}

// .ant-layout-sider-dark .el-submenu__title:hover { 

// }

.grayMode {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    -webkit-filter: grey;
    filter: gray;
}

.content {
    margin: 24px 24px 0
}

.ant-pro-sider-menu-logo {
    position: relative;
    padding: 0 24px;
    overflow: hidden;
    background: #001529;
    cursor: pointer;
    transition: all .3s
}

.ant-pro-sider-menu-logo>a {
    display: flex;
    align-items: center;
    height: 64px;
}

.ant-pro-sider-menu-logo svg {
    display: inline-block;
    height: 32px;
    vertical-align: middle
}

.ant-pro-sider-menu-logo h1 {
    display: inline-block;
    margin: 0 0 0 12px;
    color: #fff;
    font-weight: 600;
    font-size: 20px;
    vertical-align: middle;
    animation: fade-in;
    animation-duration: .3s;
}

</style>
