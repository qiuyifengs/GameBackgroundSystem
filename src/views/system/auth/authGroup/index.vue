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
        <!-- <a-button type="primary" @click="$refs.createModal.add()">新增权限分组</a-button> -->
    </div>
    <create-admin-form ref="createModal" @ok="handleOk" />

    <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto"/>
        
</a-card>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
} from '@/components'
import {
    getAuthGroupList
} from '@/api/auth'
import CreateAdminForm from '../modules/CreateAdminForm'

export default {
    name: 'admin',
    components: {
        MddTable,
        CreateAdminForm,
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
                    dataIndex: 'type'
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
                },
                {
                    title: '分组状态',
                    dataIndex: 'status',
                },
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return getAuthGroupList(Object.assign(params, this.queryParam))
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
