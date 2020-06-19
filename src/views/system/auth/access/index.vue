<template>
<a-card :bordered="false">
    <div class="table-page-search-wrapper">
        <a-form @submit="handleSubmit" layout="inline" :form="form">
            <a-row :gutter="24">
                <a-col :md="4" :sm="24">
                    <a-form-item label="渠道">
                        <a-select placeholder="请选择" name="channel_id">
                            <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :md="4" :sm="24">
                    <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' }">
                        <a-button htmlType="submit" type="primary">查询</a-button>
                        <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                    </span>
                </a-col>
            </a-row>
        </a-form>
    </div>

    <div class="table-operator" style="margin-bottom: 24px">
        <a-button type="primary" @click="$refs.createModal.add()">新增管理员授权</a-button>
    </div>
    <create-admin-auth-form ref="createModal" @ok="handleOk" />

    <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto">
        <span slot="action" slot-scope="text, record">
            <template>
                <a @click="$refs.createModal.edit(record)">编辑</a>
                <a-divider type="vertical" />
                <a @click="handleDel(record)">删除</a>
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
import {
    getAccessList
} from '@/api/auth'
import CreateAdminAuthForm from '../modules/CreateAdminAuthForm'

export default {
    name: 'admin',
    components: {
        MddTable,
        CreateAdminAuthForm,
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
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return getAccessList(Object.assign(params, this.queryParam))
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
            form: this.$form.createForm(this),
            channelList: [],
            serverList: [],
        }
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
    }
}
</script>
