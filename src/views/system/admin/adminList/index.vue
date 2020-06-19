<template>
<div>
    <!-- <a-card :bordered="false" class="mb18">
        <div class="table-page-search-wrapper">

        </div>
    </a-card> -->
    <a-card :bordered="false" style="margin-top: 18px">
        <create-admin-form ref="createModal" @ok="handleOk" />
        <!-- <div class="table-operator" style="margin-bottom: 24px">
            <a-button type="primary" @click="$refs.createModal.add()">新增管理员</a-button>
        </div> -->
        <div slot="title">
            <a-button type="primary" @click="$refs.createModal.add()">新增管理员</a-button>
        </div>
        <div slot="extra">

            <a-form layout="inline" :form="form">
                <a-row :gutter="4">
                    <a-col :md="7">
                        <a-form-item>
                            <a-select style="width: 100px" v-model="queryParam.user_name" placeholder="请选择">
                                <a-select-option value="user_name">用户名</a-select-option>
                                <a-select-option value="email">邮箱</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="16">
                        <a-form-item>
                            <a-input-search v-model="queryParam.string" @search="onSearch" enterButton="查询" placeholder="请搜索" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto">
            <span slot="action" slot-scope="text, record">
                <template>
                    <a @click="$refs.createModal.edit(record)">编辑</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="您确定删除吗？" @confirm="confirm(record)" @cancel="cancel" okText="Yes" cancelText="No">
                        <a>删除</a>
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
import CreateAdminForm from '../modules/CreateAdminForm'

export default {
    name: 'system-admin-adminList',
    components: {
        MddTable,
        CreateAdminForm,
    },
    data() {
        return {
            queryParam: {
                user_name: 'user_name'
            },
            columns: [{
                    title: '用户ID',
                    dataIndex: 'user_id',
                },
                {
                    title: '姓名',
                    dataIndex: 'user_name'
                },
                {
                    title: '邮箱',
                    dataIndex: 'email',
                },
                {
                    title: '手机',
                    dataIndex: 'mobile',
                },
                {
                    title: '真实名称',
                    dataIndex: 'realname',
                },
                {
                    title: '添加时间',
                    dataIndex: 'add_time',
                },
                {
                    title: '上次登录时间',
                    dataIndex: 'last_login',
                },
                {
                    title: '上次登录ip',
                    dataIndex: 'last_ip',
                },
                {
                    title: '用户组',
                    dataIndex: 'item_name',
                },
                {
                    title: '封禁时间',
                    dataIndex: 'lock_time',
                },
                {
                    title: '封禁原因',
                    dataIndex: 'lock_text',
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
                return this.$api.ADMIN_ALL({
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
    mounted() {
        this.$refs.table.refresh()
    },
    methods: {
        onSearch(value) {
            this.$refs.table.refresh()
            console.log(value);
        },
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)
                    this.queryParam = values
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
            this.$api.ADMIN_DELETE({
                'user_id': record.user_id
            }).then(res => {
                if (res.Code) {
                    this.$message.success(`${record.user_name} 用户删除成功`)
                    this.$refs.table.refresh(true)
                } else {
                    this.$message.error(res.Error)
                }
            })
        },
        cancel(e) {
            this.$message.error('取消删除操作')
        },
    }
}
</script>
