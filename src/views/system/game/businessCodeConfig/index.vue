<template>
<a-card :bordered="false" style="margin-top: 18px">
    <div class="table-operator" style="margin-bottom: 24px">
        <a-button type="primary" icon="reload" @click="$refs.table.refresh()">刷新</a-button>
    </div>

    <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" :showPagination="false" />

</a-card>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
} from '@/components'
import {
    getConfigTransaction
} from '@/api/sys.game'

export default {
    name: 'system-game-businessCodeConfig',
    components: {
        MddTable,
    },
    data() {
        return {
            columns: [{
                    title: 'ID',
                    dataIndex: 'id'
                }, {
                    title: '业务类型',
                    dataIndex: 'transaction_type',
                    width: '100px'
                },
                {
                    title: '业务类别',
                    dataIndex: 'class',
                    width: '100px'
                },
                {
                    title: '类别中文名称',
                    dataIndex: 'cn_name',
                },
                {
                    title: '类别英文名称',
                    dataIndex: 'en_name',
                    width: '120px'
                },
                {
                    title: '备注',
                    dataIndex: 'remarks',
                },
                {
                    title: '创建时间',
                    dataIndex: 'create_date',
                    width: '200px'
                },
                {
                    title: '创建人',
                    dataIndex: 'create_user_id',
                    width: '100px'
                },
                {
                    title: '修改时间',
                    dataIndex: 'update_date',
                    width: '200px'
                },
                {
                    title: '修改人',
                    dataIndex: 'update_user_id',
                    width: '100px'
                }
            ],
            loadData: parameter => {
                // const params = {
                //     page: parameter.pageNo,
                //     page_size: parameter.pageSize
                // }
                return getConfigTransaction()
                    .then(res => {
                        const data = {
                            // pageSize: res.Data.page_info.page_size,
                            // pageNo: Number(res.Data.page_info.page),
                            // totalCount: res.Data.page_info.total,
                            data: res.Data.list.map(item => item.record )
                        }

                        return data
                    })
            },
        }
    },
    mounted() {
       this.$refs.table.refresh()
    },
}
</script>
