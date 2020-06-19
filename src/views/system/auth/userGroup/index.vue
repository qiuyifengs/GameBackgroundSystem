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
        <a-button type="primary" @click="$refs.createModal.add()">新增用户分组</a-button>
    </div>
    <create-user-group-form ref="createModal" @ok="handleOk" />

    <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" :showPagination="false"/>

</a-card>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
} from '@/components'
import {
    getUserGroupList
} from '@/api/auth'
import CreateUserGroupForm from '../modules/CreateUserGroupForm'

export default {
    name: 'userGroup',
    components: {
        MddTable,
        CreateUserGroupForm
    },
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: '分组ID',
                    dataIndex: 'item_id',
                },
                {
                    title: '用户分组名称',
                    dataIndex: 'name'
                },
            ],
            loadData: parameter => {
                const params = {
                    // page: parameter.pageNo,
                    // page_size: parameter.pageSize
                }
                return getUserGroupList()
                    .then(res => {
                        const data = {
                            // pageSize: res.Data.page_info.page_size,
                            // pageNo: Number(res.Data.page_info.page),
                            // totalCount: res.Data.page_info.total,
                            data: res.Data
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
