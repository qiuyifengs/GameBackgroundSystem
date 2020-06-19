<template>
<a-card :bordered="false" style="margin-top: 18px">
    <div class="table-operator" style="margin-bottom: 24px">
      <a-button type="primary" style="margin-right: 12px" icon="plus" @click="$refs.createModal.add()">新增客户端事件配置</a-button>
      <a-button type="primary" icon="reload" @click="$refs.table.refresh()">刷新</a-button>
    </div>
    <create-event-config-form ref="createModal" @ok="handleOk" />

    <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto">
        <span slot="event_type" slot-scope="text">
            {{ text | eventTypeFilter }}
        </span>
    </mdd-table>
</a-card>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
} from '@/components'
import { getClientEventsConfig } from '@/api/sys.game'
import CreateEventConfigForm from '../modules/CreateEventConfigForm'

export default {
    name: 'system-game-clientEventsConfig',
    components: {
        MddTable,
        CreateEventConfigForm
    },
    data() {
        return {
            columns: [{
                    title: 'ID',
                    dataIndex: 'id',
                },{
                    title: '界面ID',
                    dataIndex: 'page_id',
                },
                {
                    title: '事件ID',
                    dataIndex: 'event_id',
                },
                {
                    title: '界面名称',
                    dataIndex: 'page_name',
                },
                {
                    title: '事件名称',
                    dataIndex: 'event_name',
                },
                {
                    title: '属性',
                    dataIndex: 'attribute'
                },
                {
                    title: '事件类型',
                    dataIndex: 'event_type',
                    scopedSlots: { customRender: 'event_type' }
                },
                {
                    title: '事件主题',
                    dataIndex: 'event_theme'
                },
                {
                    title: '采集时机',
                    dataIndex: 'collect_timing',
                },
                {
                    title: '版本号',
                    dataIndex: 'game_version',
                },
                {
                    title: '创建时间',
                    dataIndex: 'record_date'
                }
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return getClientEventsConfig(Object.assign(params, this.queryParam))
                    .then(res => {
                        const data = {
                            pageSize: res.Data.page_info.page_size,
                            pageNo: Number(res.Data.page_info.page),
                            totalCount: res.Data.page_info.total,
                            data: res.Data.list
                        }
                        return data
                    })
                
            },
        }
    },
    filters: {
        eventTypeFilter(type) {
            const eventTypeMap = {
                1: '点击事件',
                2: '浏览事件'
            }
            return eventTypeMap[type]
        }
    },
    created() {
    },
    mounted() {
        this.$refs.table.refresh()
    },
    methods: {
        handleOk() {
            this.$refs.table.refresh()
        },
    }
}
</script>
