<template>
<a-card :bordered="false" class="" style="margin-top: 18px">
    <div class="table-operator" style="margin-bottom: 24px">
        <a-button type="primary" style="margin-right: 12px" @click="$refs.createModal.add()">新增管理员授权</a-button>
        <a-button @click="$refs.table.refresh()" type="primary">刷新</a-button>
    </div>
    <create-auth-form ref="createModal" @ok="handleOk" />

    <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto">
        <span slot="action" slot-scope="text, record">
            <template>
                <a-button type="link" size="small" @click="$refs.createModal.edit(record)">编辑</a-button>
                <a-divider type="vertical" />
                <a-popconfirm title="您确定删除该权限分组吗？" @confirm="confirm(record)" @cancel="cancel" okText="Yes" cancelText="No">
                    <a-button type="link" size="small">删除</a-button>
                </a-popconfirm>
            </template>
        </span>
    </mdd-table>
</a-card>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
} from '@/components'
import CreateAuthForm from '../modules/CreateAuthForm'

export default {
    name: 'system-access-authList',
    components: {
        MddTable,
        CreateAuthForm,
    },
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: '管理员ID',
                    dataIndex: 'user_id',
                },
                {
                    title: '管理员名称',
                    dataIndex: 'user_name'
                },
                {
                    title: '权限列表',
                    dataIndex: 'rules',
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
                return this.$api.ACCESS_ALL({
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
        }
    },
    mounted() {
        this.$refs.table.refresh()
    },
    methods: {
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
        confirm(record) {
            this.$api.ACCESS_AUTH_DELETE({
                uid: record.user_id
            }).then(res => {
                if (res.Success) {
                    this.$message.success(res.Error)
                    this.$refs.table.refresh()
                } else {
                    this.$message.error(res.Error)
                }
            })
        },
        cancel(e) {
            this.$message.error('取消操作')
        },
    }
}
</script>
