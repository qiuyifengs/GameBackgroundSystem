<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="12">
                    <a-col :md="4" :sm="24">
                        <a-form-item label="分组名称">
                            <a-input v-model="queryParam.title" placeholder="请搜索分组名称" name="title" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="4" :sm="24">
                        <a-form-item label="分组类型">
                            <a-select v-model="queryParam.type" placeholder="请选择分组类型" name="type">
                                <a-select-option value="1">系统分组</a-select-option>
                                <a-select-option value="0">自定义分组</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4" :sm="24">
                        <a-form-item label="分组状态">
                            <a-select v-model="queryParam.status" placeholder="请选择分组类型" name="status">
                                <a-select-option value="1">启用</a-select-option>
                                <a-select-option value="2">禁用</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4" :sm="24">
                        <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' }">
                            <a-button @click="$refs.table.refresh(true)" type="primary">查询</a-button>
                            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <create-auth-group-form ref="createModal" @ok="handleOk" />
    </a-card>
    <a-card :bordered="false">
        <div class="table-operator mb18">
            <a-button type="primary" @click="$refs.createModal.add()">新增权限分组</a-button>
        </div>
        <mdd-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" showPagination="auto">
            <span slot="type" slot-scope="text">
                {{ text | typeFilter }}
            </span>
            <span slot="status" slot-scope="text">
                <a-badge :status="text == 1 ? 'processing' : 'error'" :text="text | statusFilter" />
            </span>
            <span slot="action" slot-scope="text, record">
                <template>
                    <a-button type="link" size="small" @click="$refs.createModal.edit(record)" v-if="record.type === 0">编辑</a-button>
                    <a-divider type="vertical" v-if="record.type === 0" />
                    <a disabled v-if="record.type === 1">删除</a>
                    <a-popconfirm v-else title="您确定删除该权限分组吗？" @confirm="confirm(record)" @cancel="cancel" okText="Yes" cancelText="No">
                        <a-button type="link" size="small">删除</a-button>
                    </a-popconfirm>
                </template>
            </span>
        </mdd-table>
    </a-card>
</div>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
} from '@/components'

import CreateAuthGroupForm from '../modules/CreateAuthGroupForm'

const statusMap = {
    0: {
        value: 0,
        text: '禁用'
    },
    1: {
        value: 1,
        text: '启用'
    }
}
const typeMap = {
    0: {
        value: 0,
        text: '自定义分组'
    },
    1: {
        value: 1,
        text: '系统分组'
    }
}

export default {
    name: 'system-access-authGroup',
    components: {
        MddTable,
        CreateAuthGroupForm
    },
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: '分组ID',
                    dataIndex: 'id',
                },
                {
                    title: '分组类型',
                    dataIndex: 'type',
                    scopedSlots: {
                        customRender: 'type'
                    }
                },
                {
                    title: '分组标识',
                    dataIndex: 'name',
                },
                {
                    title: '分组名称',
                    dataIndex: 'title',
                },
                {
                    title: '分组权限',
                    dataIndex: 'rules',
                    width: '650px',
                },
                {
                    title: '分组状态',
                    dataIndex: 'status',
                    scopedSlots: {
                        customRender: 'status'
                    }
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    width: '180px',
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
                return this.$api.ACCESS_AUTH_GROUP_ALL({
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
            channelList: [],
            serverList: [],
        }
    },
    filters: {
        statusFilter(type) {
            return statusMap[type].text
        },
        typeFilter(type) {
            return typeMap[type].text
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
            this.$api.ACCESS_AUTH_GROUP_DELETE({
                id: record.id
            }).then(res => {
                if (res.Code === 200) {
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
