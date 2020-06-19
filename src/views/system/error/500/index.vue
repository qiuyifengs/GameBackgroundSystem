<template>
<div>
    <a-result status="500" title="500" subTitle="对不起，服务器出错了。">
        <template v-slot:extra>
            <a-button type="primary" @click="goHome">返回</a-button>
        </template>
    </a-result>
</div>
</template>

<script>
import router from '@/router'
import util from '@/libs/util.js'
import store from '@/store'

export default {
    methods: {
        goHome() {
            store.dispatch('d2admin/api/getChannel', null, {
                root: true
            })
            store.dispatch('d2admin/api/getServer', null, {
                root: true
            })

            const lastLeaveRoute = util.cookies.get('lastLeaveRoute')
            console.log(lastLeaveRoute)
            if (lastLeaveRoute === undefined) {
                router.replace('/statistics/survey/index')
                return
            }
            if (!lastLeaveRoute.includes('login') && !lastLeaveRoute.includes('500') && !lastLeaveRoute.includes('404') && lastLeaveRoute !== undefined) {
                // [ 路由 ] 重新访问
                router.replace(lastLeaveRoute)
            } else {
                router.replace('/statistics/survey/index')
            }
        }
    }
}
</script>
