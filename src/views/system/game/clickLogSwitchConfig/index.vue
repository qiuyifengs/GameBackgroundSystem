<template>
<a-card :bordered="false" style="margin-top: 18px">
    <div class="table-operator" style="margin-bottom: 24px">
        <a-button type="primary" icon="plus" style="margin-right: 12px" @click="$refs.createModal.add()">新增日志开关配置</a-button>
        <a-button type="primary" icon="reload" @click="$refs.table.refresh()">刷新</a-button>
    </div>
    <create-click-log-config-form ref="createModal" @ok="handleOk" />

    <mdd-table ref="table" rowKey="key" size="default" :columns="columns" :data="loadData" showPagination="auto">
        <template slot="switch_en_name" slot-scope="text, record">
            <!-- <editable-cell :text="text" @change="onCellChange(record, 'switch_en_name', $event)" /> -->
            <a-input v-if="record.editable" style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, 'switch_en_name', record)" />
            <template v-else>{{ text }}</template>
        </template>
        <template slot="switch_cn_name" slot-scope="text, record">
            <!-- <editable-cell :text="text" @change="onCellChange(record, 'switch_cn_name', $event)" /> -->
            <a-input v-if="record.editable" style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, 'switch_cn_name', record)" />
            <template v-else>{{ text }}</template>
        </template>
        <template slot="switch_status" slot-scope="text, record">
            <a-switch checkedChildren="开" unCheckedChildren="关" @change="onSwitchChange(record)" :defaultChecked="text | statusFilter" />
        </template>

        <template slot="action" slot-scope="text, record">
            <div class="editable-row-operations">
                <span v-if="record.editable">
                    <a-button type="link" size="small" @click="() => save(record)">保存</a-button>
                    <a-divider type="vertical" />
                    <a-popconfirm title="真的放弃编辑吗?" @confirm="() => cancel(record)">
                        <a-button type="link" size="small">取消</a-button>
                    </a-popconfirm>
                </span>
                <span v-else>
                    <a-button type="link" size="small" class="edit" @click="() => edit(record)">修改</a-button>
                </span>
            </div>
        </template>
    </mdd-table>
</a-card>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
} from '@/components'
import {
    getClickLogSwitchConfig,
    updateClickLogSwitchConfig
} from '@/api/sys.game'
import CreateClickLogConfigForm from '../modules/CreateClickLogConfigForm'
import EditableCell from '@/components/tools/EditableCell'

export default {
    name: 'system-game-clickLogSwitchConfig',
    components: {
        MddTable,
        CreateClickLogConfigForm
    },
    data() {
        return {
            columns: [{
                    title: 'ID',
                    dataIndex: 'id',
                },
                {
                    title: '开关英文名称',
                    dataIndex: 'switch_en_name',
                    scopedSlots: {
                        customRender: 'switch_en_name'
                    }
                },
                {
                    title: '开关中文名称',
                    dataIndex: 'switch_cn_name',
                    scopedSlots: {
                        customRender: 'switch_cn_name'
                    }
                },
                {
                    title: '开关状态',
                    dataIndex: 'switch_status',
                    scopedSlots: {
                        customRender: 'switch_status'
                    }
                },
                {
                    title: '备注',
                    dataIndex: 'remarks',
                },
                {
                    title: '创建时间',
                    dataIndex: 'create_date',
                },
                {
                    title: '创建人',
                    dataIndex: 'create_user_id',
                },
                {
                    title: '修改时间',
                    dataIndex: 'update_date',
                },
                {
                    title: '修改人',
                    dataIndex: 'update_user_id',
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    width: '150px',
                    scopedSlots: {
                        customRender: 'action'
                    }
                }
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return getClickLogSwitchConfig(params)
                    .then(res => {
                        const result = res.Data.list
                        const newArr = result.map(item => {
                            return { ...item, editable: false }
                        })
                        const data = {
                            pageSize: res.Data.page_info.page_size,
                            pageNo: Number(res.Data.page_info.page),
                            totalCount: res.Data.page_info.total,
                            data: newArr
                        }
                        return data
                    })
            },
        }
    },
    filters: {
        statusFilter(type) {
            return type == 1 ? true : false
        }
    },
    mounted() {
        this.$refs.table.refresh()
    },
    methods: {
        handleChange(value, column, record) {
            record[column] = value
        },
        edit(row) {
            row.editable = true
        },
        save(row) {
            console.log(row)
            row.editable = false
            const params = {
                id: row.id,
                switch_en_name: row.switch_en_name,
                switch_cn_name: row.switch_cn_name,
                switch_status: row.switch_status
            }
            updateClickLogSwitchConfig(params).then(res => {
                this.$message.success('修改成功')
            }).catch(err => {
                this.$message.error(err.Error)
            })
            this.$refs.table.refresh(true)
        },
        cancel(row) {
            row.editable = false
        },
        onSwitchChange(row) {
            console.log(row)
            const params = {
                id: row.id,
                switch_en_name: row.switch_en_name,
                switch_cn_name: row.switch_cn_name,
                switch_status: row.switch_status == 0 ? 1 : 0
            }
            if (row.switch_status == 0) {
                this.$message.success('开启日志')
            } else {
                this.$message.success('关闭日志')
            }
            updateClickLogSwitchConfig(params).then(res => {

            }).catch(err => {
                this.$message.error(err.Error)
            })
            this.$refs.table.refresh()
        },
        onCellChange(row, dataIndex, value) {
            console.log(row, dataIndex, value)
            const params = {
                id: row.id,
                switch_en_name: row.switch_en_name,
                switch_cn_name: row.switch_cn_name,
                switch_status: row.switch_status
            }
            dataIndex === 'switch_en_name' ? params.switch_en_name = value : params.switch_cn_name = value
            updateClickLogSwitchConfig(params).then(res => {

            }).catch(err => {
                this.$message.error(err.Error)
            })
            this.$refs.table.refresh()
        },
        handleEdit(record) {
            this.$refs.createModal.edit(record)
        },
        handleOk() {
            this.$refs.table.refresh()
        },
        onSelectChange(selectedRowKeys, selectedRows) {
            this.selectedRowKeys = selectedRowKeys
            this.selectedRows = selectedRows
        },
        toggleAdvanced() {
            this.advanced = !this.advanced
        },
        resetSearchForm() {
            this.queryParam = {
                date: moment(new Date())
            }
        }
    }
}
</script>
