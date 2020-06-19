<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select placeholder="请选择" name="channel_id" v-decorator="['channel_id', rule.channel_id]">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="区服">
                            <a-select placeholder="请选择" name="server_id" v-decorator="['server_id', rule.server_id]">
                                <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="排行榜类型">
                            <a-select v-decorator="['type', rule.type]" placeholder="请选择">
                                <a-select-option value="1">充值排行</a-select-option>
                                <a-select-option value="2">消费排行</a-select-option>
                                <a-select-option value="3">等级排行</a-select-option>
                                <a-select-option value="4">能量排行</a-select-option>
                                <a-select-option value="5">钻石排行</a-select-option>
                                <a-select-option value="6">积分排行</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' } || {} ">
                            <a-button htmlType="submit" type="primary">查询</a-button>
                            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                            <a-button style="margin-left: 8px" @click="handleExport" icon="export">导出</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </a-card>
    <a-card :bordered="false">

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
import moment from 'moment'
import {
    MddTable,
} from '@/components'

import {
    mixin
} from '@/utils/mixin'

let that
export default {
    mixins: [mixin],
    name: 'game-player-playerRank',
    components: {
        MddTable,
    },
    data() {
        return {
            rule: {
                channel_id: {
                    rules: [{
                        required: true,
                        message: '请选择渠道'
                    }]
                },
                server_id: {
                    rules: [{
                        required: true,
                        message: '请选择服务器'
                    }]
                },
                type: {
                    rules: [{
                        required: true,
                        message: '请选择排行榜类型'
                    }]
                }
            },
            form: this.$form.createForm(this),
            queryParam: {},
            columns: [{
                    title: '服务器ID',
                    dataIndex: 'server_id',
                    scopedSlots: {
                        customRender: 'server_id'
                    }
                },
                {
                    title: '渠道ID',
                    dataIndex: 'channel_id',
                    scopedSlots: {
                        customRender: 'channel_id'
                    }
                },
                {
                    title: '账号ID',
                    dataIndex: 'account_id',
                    key: 'account_id'
                },
                {
                    title: '账号名',
                    dataIndex: 'account',
                },
                {
                    title: '角色ID',
                    dataIndex: 'role_id',
                },
                {
                    title: '角色名',
                    dataIndex: 'role_name',
                },
                {
                    title: '总数',
                    dataIndex: 'total'
                },
                {
                    title: '排名',
                    dataIndex: 'ranking'
                }
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return this.$api.PLAYER_RANK_ALL(Object.assign(params, this.queryParam))
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
                                totalCount: 0,
                                data: []
                            }
                        }
                        return data
                    })
            },

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
        handleExport() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.$api.PLAYER_RANK_EXPORT(values).then(res => {
                        if (res.Success) {
                            window.open(res.Data.download_url)
                        } else {
                            this.$message.error(res.Error)
                        }

                    })
                }
            })
        },
    }
}
</script>
