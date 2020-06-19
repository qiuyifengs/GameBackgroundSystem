<template>
<div class="d2-multiple-page-control-group" flex>
    <div class="d2-multiple-page-control-content" flex-box="1" style="overflow: auto">
        <div class="d2-multiple-page-control-content-inner">
            <d2-contextmenu :visible.sync="contextmenuFlag" :x="contentmenuX" :y="contentmenuY">
                <d2-contextmenu-list :menulist="tagName === '/index' ? contextmenuListIndex : contextmenuList" @rowClick="contextmenuClick" />
            </d2-contextmenu>

            <el-tabs class="d2-multiple-page-control d2-multiple-page-sort" :value="current" type="card" :closable="true" @tab-click="handleClick" @edit="handleTabsEdit" @contextmenu.native="handleContextmenu">
                <el-tab-pane v-for="page in opened" :key="page.fullPath" :label="page.meta.title || '未命名'" :name="page.fullPath" />
            </el-tabs>
        </div>
    </div>
    <div class="d2-multiple-page-control-btn" flex-box="0" style="padding-top: 9px">

        <a-dropdown-button @click="closeAll">
            清空
            <a-menu slot="overlay" @click="handleControlItemClick">
                <a-menu-item key="left">
                    <a-icon type="arrow-left" />关闭左侧</a-menu-item>
                <a-menu-item key="right">
                    <a-icon type="arrow-right" />关闭右侧</a-menu-item>
                <a-menu-item key="other">
                    <a-icon type="close" />关闭其它</a-menu-item>
                <a-menu-item key="all">
                    <a-icon type="close-circle" />全部关闭</a-menu-item>
            </a-menu>
        </a-dropdown-button>
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex'
import Sortable from 'sortablejs'
export default {
    components: {
        D2Contextmenu: () => import('../contextmenu'),
        D2ContextmenuList: () => import('../contextmenu/components/contentmenuList')
    },
    data() {
        return {
            contextmenuFlag: false,
            contentmenuX: 0,
            contentmenuY: 0,
            contextmenuListIndex: [{
                icon: 'times-circle',
                title: '关闭全部',
                value: 'all'
            }],
            contextmenuList: [{
                    icon: 'arrow-left',
                    title: '关闭左侧',
                    value: 'left'
                },
                {
                    icon: 'arrow-right',
                    title: '关闭右侧',
                    value: 'right'
                },
                {
                    icon: 'close',
                    title: '关闭其它',
                    value: 'other'
                },
                {
                    icon: 'close-circle',
                    title: '关闭全部',
                    value: 'all'
                }
            ],
            tagName: '/'
        }
    },
    computed: {
        ...mapState('d2admin/page', [
            'opened',
            'current'
        ])
    },
    methods: {
        ...mapActions('d2admin/page', [
            'close',
            'closeLeft',
            'closeRight',
            'closeOther',
            'closeAll',
            'openedSort'
        ]),
        /**
         * @description 右键菜单功能点击
         */
        handleContextmenu(event) {
            let target = event.target
            // 解决 https://github.com/d2-projects/d2-admin/issues/54
            let flag = false
            if (target.className.indexOf('el-tabs__item') > -1) flag = true
            else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
                target = target.parentNode
                flag = true
            }
            if (flag) {
                event.preventDefault()
                event.stopPropagation()
                this.contentmenuX = event.clientX
                this.contentmenuY = event.clientY
                this.tagName = target.getAttribute('aria-controls').slice(5)
                this.contextmenuFlag = true
            }
        },
        /**
         * @description 右键菜单的row-click事件
         */
        contextmenuClick(command) {
            this.handleControlItemClick(command, this.tagName, 2)
        },
        /**
         * @description 接收点击关闭控制上选项的事件
         */
        handleControlItemClick(command, tagName = null, type = 1) {
            if (tagName) {
                this.contextmenuFlag = false
            }
            const params = {
                pageSelect: tagName
            }
            const key = type == 1 ? command.key : command
            switch (key) {
                case 'left':
                    this.closeLeft(params)
                    break
                case 'right':
                    console.log(params)
                    this.closeRight(params)
                    break
                case 'other':
                    this.closeOther(params)
                    break
                case 'all':
                    this.closeAll()
                    break
                default:
                    this.$message.error('无效的操作')
                    break
            }
        },
        /**
         * @description 接收点击 tab 标签的事件
         */
        handleClick(tab, event) {
            // 找到点击的页面在 tag 列表里是哪个
            const page = this.opened.find(page => page.fullPath === tab.name)
            const {
                name,
                params,
                query
            } = page
            if (page) {
                this.$router.push({
                    name,
                    params,
                    query
                })
            }
        },
        /**
         * @description 点击 tab 上的删除按钮触发这里 首页的删除按钮已经隐藏 因此这里不用判断是 index
         */
        handleTabsEdit(tagName, action) {
            if (action === 'remove') {
                this.close({
                    tagName
                })
            }
        }
    },
    mounted() {
        const el = document.querySelectorAll('.d2-multiple-page-sort .el-tabs__nav')[0]
        Sortable.create(el, {
            onEnd: (evt) => {
                const {
                    oldIndex,
                    newIndex
                } = evt
                this.openedSort({
                    oldIndex,
                    newIndex
                })
            }
        })
    }
}
</script>
