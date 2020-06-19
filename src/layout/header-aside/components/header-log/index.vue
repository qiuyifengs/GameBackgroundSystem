<template>
<span class="antd-pro-components-global-header-index-action antd-pro-components-notice-icon-index-noticeButton ant-dropdown-trigger">
    <a-tooltip placement="bottom">
        <template slot="title">
            <span>{{ tooltipContent }}</span>
        </template>
        <span class="header-notice" @click="handleClick" ref="noticeRef">
            <a-badge class="antd-pro-components-notice-icon-index-badge" :count="logLengthError">
                <a-icon class="antd-pro-components-notice-icon-index-icon" type="bell" />
            </a-badge>
        </span>
    </a-tooltip>
</span>
</template>

<script>
import {
    mapGetters,
    mapMutations
} from 'vuex'
export default {
    computed: {
        ...mapGetters('d2admin', {
            logLength: 'log/length',
            logLengthError: 'log/lengthError'
        }),
        tooltipContent() {
            return this.logLength === 0 ?
                '没有日志或异常' :
                `${this.logLength} 条日志${this.logLengthError > 0
          ? ` | 包含 ${this.logLengthError} 个异常`
          : ''}`
        }
    },
    methods: {
        ...mapMutations('d2admin/log', [
            'clean'
        ]),
        handleClick() {
            this.$router.push({
                name: 'log'
            })
        }
    }
}
</script>
