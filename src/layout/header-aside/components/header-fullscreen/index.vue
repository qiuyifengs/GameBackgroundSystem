<template>
<span class="antd-pro-components-global-header-index-action">
    <a-tooltip placement="bottom">
        <template slot="title">
            <span>{{ active ? '退出全屏' : '全屏' }}</span>
        </template>
        <a-icon @click="toggle" :type="active ? 'fullscreen' : 'fullscreen-exit'" style="font-size: 16px" />
    </a-tooltip>
</span>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    computed: {
        ...mapState('d2admin/fullscreen', [
            'active'
        ])
    },
    methods: {
        ...mapActions('d2admin/fullscreen', [
            'toggle'
        ])
    }
}
</script>

<style lang="less" scoped>
.layout.ant-layout .header .user-wrapper .action, .layout.ant-layout .top-nav-header-index .user-wrapper .action {
    cursor: pointer;
    padding: 0 12px;
    display: inline-block;
    -webkit-transition: all .3s;
    transition: all .3s;
    height: 100%;
    color: rgba(0,0,0,.65);
}
</style>
