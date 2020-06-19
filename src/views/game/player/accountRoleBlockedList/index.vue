<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select placeholder="请选择" name="channel_id" v-decorator="['channel_id']">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="区服">
                            <a-select placeholder="请选择" name="server_id" v-decorator="['server_id']">
                                <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="账号">
                            <a-input v-decorator="['account']" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="角色名">
                            <a-input v-decorator="['role_name']" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="2" :sm="24">
                        <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' } || {} ">
                            <a-button htmlType="submit" type="primary">查询</a-button>
                            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>

        <create-account-role-blocked-form ref="createModal" @ok="handleOk" />

    </a-card>
    <a-card :bordered="false">
        <div class="table-operator" style="margin-bottom: 24px">
            <a-button type="primary" style="margin-right: 12px" @click="$refs.createModal.add()">账号角色封禁</a-button>
        </div>
        <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto">
            <span slot="server_id" slot-scope="text">
                {{ text | serverFilter }}
            </span>
            <span slot="channel_id" slot-scope="text">
                {{ text | channelFilter }}
            </span>
        </mdd-table>
    </a-card>
</div>
</template>

<script>
import {
    MddTable,
} from '@/components'

import CreateAccountRoleBlockedForm from '../modules/CreateAccountRoleBlockedForm'

import {
    mixin
} from '@/utils/mixin'
let that
export default {
    mixins: [mixin],
    name: 'game-player-accountRoleBlockedList',
    components: {
        MddTable,
        CreateAccountRoleBlockedForm
    },
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: '渠道',
                    dataIndex: 'channel_id',
                    scopedSlots: {
                        customRender: 'channel_id'
                    }
                },
                {
                    title: '服务器',
                    dataIndex: 'server_id',
                    scopedSlots: {
                        customRender: 'server_id'
                    }
                },
                {
                    title: '账号',
                    dataIndex: 'account',
                },
                {
                    title: '账号ID',
                    dataIndex: 'account_id',
                },
                {
                    title: '角色名',
                    dataIndex: 'role_name',
                },
                {
                    title: '角色ID',
                    dataIndex: 'role_id',
                },
                {
                    title: '禁言时间',
                    dataIndex: 'lock_date',
                },
                {
                    title: '禁言人',
                    dataIndex: 'lock_user_name',
                },
                {
                    title: '解封时间',
                    dataIndex: 'unlock_date'
                },
                {
                    title: '解封人',
                    dataIndex: 'unlock_user_name'
                },
                {
                    title: '禁言时长',
                    dataIndex: 'lock_time'
                },
                {
                    title: '禁言理由',
                    dataIndex: 'reason'
                },
                {
                    title: '状态',
                    dataIndex: 'status'
                }
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return this.$api.PLAYER_ROLE_LOCK_ALL(Object.assign(params, this.queryParam))
                    .then(res => {
                        let data = {}
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
                                pageSize: parameter.pageSize,
                                pageNo: parameter.pageNo,
                                totalCount: 10,
                                data: []
                            }
                        }
                        return data
                    })
            },
            form: this.$form.createForm(this),
        }
    },
    beforeCreate() {
        that = this
    },
    filters: {
        channelFilter(type) {
            return that.channelList.filter(item => item.channel_id === type)[0].channel_name
        },
        serverFilter(type) {
            return that.serverList.filter(item => item.server_id === type)[0].server_name
        }
    },
    methods: {
        handleOk() {
            this.$refs.table.refresh()
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
    }
}
</script>
