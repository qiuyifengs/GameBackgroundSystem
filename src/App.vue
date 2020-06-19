<template>
<a-locale-provider :locale="zh_CN">
    <div id="app">
        <router-view v-if="isRouterAlive" />
    </div>
</a-locale-provider>
</template>

<script>
import util from '@/libs/util'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export default {
    name: 'app',
    watch: {
        '$i18n.locale': 'i18nHandle'
    },
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive: true,
            zh_CN
        }
    },
    created() {
        this.i18nHandle(this.$i18n.locale)
    },
    methods: {
        i18nHandle(val, oldVal) {
            util.cookies.set('lang', val)
            document.querySelector('html').setAttribute('lang', val)
        },
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        }
    }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
</style>
