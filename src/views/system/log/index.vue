<template>
<a-card :bordered="false">

    <a-table :columns="columns" :dataSource="log">
        <a slot="time" slot-scope="text" href="javascript:;">{{text}}</a>
        <span slot="message" slot-scope="text">{{ text }}</span>
        <span slot="meta" slot-scope="text, record" :key="record.url">{{ text.meta.url }}</span>
        <span slot="action" slot-scope="text, record">
            <a href="javascript:;" :key="text" @click="handleShowMore(record)">查看</a>
        </span>
    </a-table>

</a-card>
</template>

<script>
import {
    mapState
} from 'vuex'
import {
    get
} from 'lodash'

const columns = [{
        title: 'time',
        dataIndex: 'time',
        key: 'time'
    },
    {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
    },
    {
        title: 'Url',
        dataIndex: 'url',
        key: 'url',
    },
    {
        title: 'Action',
        key: 'action',
        scopedSlots: {
            customRender: 'action'
        },
    },
];

export default {
    name: 'log',
    data() {
        return {
            columns,
            uploading: false
        }
    },
    computed: {
        ...mapState('d2admin/log', [
            'log'
        ])
    },
    methods: {
        get,
        handleShowMore(log) {
            console.log(log)
            // 打印一条日志的所有信息到控制台
            this.$notification.open({
                message: '日志详情',
                description: '完整的日志内容已经打印到控制台',
                icon: <a-icon type = "smile" style = "color: #108ee9" /> ,
            });
            this.$log.capsule('D2Admin', 'handleShowMore', 'primary')
            console.group(log.message)
            console.log('time: ', log.time)
            console.log('type: ', log.type)
            console.log(log.meta)
            console.groupEnd()
        }
    }
}
</script>
