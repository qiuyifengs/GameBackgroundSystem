<template>
<div>
    <a-result status="404" title="404" subTitle="对不起，您访问的页面不存在。">
        <template v-slot:extra>
            <a-button type="primary" @click="goHome">返回</a-button>
        </template>
    </a-result>
</div>
</template>

<script>
import router from '@/router'
import store from '@/store'
import util from '@/libs/util.js'

export default {
    methods: {
        goHome() {
            const lastLeaveRoute = util.cookies.get('lastLeaveRoute')
            store.dispatch('d2admin/page/close', { tagName: lastLeaveRoute }, { root: true })
            router.replace('/statistics/survey/index')
        }
    }
}
</script>
