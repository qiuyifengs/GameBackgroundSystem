<template>
<a-card :bordered="false" style="margin-top: 18px">
    <div class="table-operator" style="margin-bottom: 24px">
        <a-button type="primary" style="margin-right: 12px" @click="refreshAuthNode">更新权限节点</a-button>
        <a-button type="primary" @click="$refs.table.refresh(true)">刷新</a-button>
    </div>

    <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto">
        <span slot="type" slot-scope="text">
            {{ text === 1 ? '系统' : '自定义' }}
        </span>
        <span slot="status" slot-scope="text">
            <a-badge :status="text == 1 ? 'processing' : 'error'" :text="text === 1 ? '启用' : '禁用'" />
        </span>
    </mdd-table>

    <a-modal title="更新权限节点" :width="400" v-model="visible" @ok="visible=false">
        <p v-for="(item, index) in refreshAuthNodeContent" :key="index">{{ item }}</p>
    </a-modal>
</a-card>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
} from '@/components'

export default {
    name: 'system-access-ruleList',
    components: {
        MddTable,
    },
    data() {
        return {
            visible: false,
            queryParam: {},
            columns: [{
                    title: '权限ID',
                    dataIndex: 'id',
                },
                {
                    title: '权限类型',
                    dataIndex: 'type',
                    scopedSlots: {
                        customRender: 'type'
                    }
                },
                {
                    title: '权限字段',
                    dataIndex: 'name',
                },
                {
                    title: '权限标题',
                    dataIndex: 'title',
                },
                {
                    title: '权限状态',
                    dataIndex: 'status',
                    scopedSlots: {
                        customRender: 'status'
                    }
                }
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return this.$api.ACCESS_RULE_ALL({
                        ...params,
                        ...this.queryParam
                    })
                    .then(res => {
                        let data
                        if (res.Success) {
                            data = {
                                pageSize: res.Data.page_info.page_size,
                                pageNo: Number(res.Data.page_info.page),
                                totalCount: res.Data.page_info.total,
                                data: res.Data.list.map((item, index) => Object.assign(item, {
                                    key: index
                                }))
                            }
                        } else {
                            this.$message.error(res.Error)
                            data = {
                                pageSize: parameter.pageNo,
                                pageNo: parameter.page_size,
                                totalCount: 0,
                                data: []
                            }
                        }
                        return data
                    })
            },
            form: this.$form.createForm(this),
            refreshAuthNodeContent: []
        }
    },
    mounted() {
        this.$refs.table.refresh()
    },
    methods: {
        refreshAuthNode() {
            this.$api.ACCESS_AUTH_REFRESH_NODE().then(res => {
                if (res.Code === 200) {
                    this.visible = true
                    this.refreshAuthNodeContent = res.Error
                } else {
                    this.$message.error(res.Error)
                }
            })
        },
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    // eslint-disable-next-line no-console
                    console.log('Received values of form: ', values)
                    this.$refs.table.refresh(true)
                }
            })
        },
        handleReset() {
            this.form.resetFields();
            this.queryParam = {}
        },
        handleOk() {
            this.$refs.table.refresh()
        },
    }
}
</script>
