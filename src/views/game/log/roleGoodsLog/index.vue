<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select showSearch optionFilterProp="children" :filterOption="filterOption" v-decorator="['channel_id']" placeholder="请选择" name="channel_id">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="区服">
                            <a-select showSearch optionFilterProp="children" :filterOption="filterOption" v-decorator="['server_id']" placeholder="请选择" name="server_id">
                                <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="7" :sm="24">
                        <a-form-item label="日期">
                            <a-row>
                                <a-col :md="11">
                                    <a-date-picker placeholder="开始日期" style="width: 100%" v-decorator="['start_date']" />
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-date-picker placeholder="结束日期" style="width: 100%" v-decorator="['end_date']" />
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="角色名">
                            <a-input v-decorator="['role_name']" allowClear />
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
                        <a-form-item label="角色ID">
                            <a-input v-decorator="['role_id']" allowClear />
                        </a-form-item>
                    </a-col>

                </a-row>
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="账号">
                            <a-input v-decorator="['account']" allowClear />
                        </a-form-item>
                    </a-col>
                    <a-col :md="4" :sm="24">
                        <a-form-item label="道具名称">
                            <a-input v-decorator="['item_name']" allowClear />
                        </a-form-item>
                    </a-col>
                    <a-col :md="3" :sm="24">
                        <a-form-item label="道具ID">
                            <a-input v-decorator="['item_id']" allowClear />
                        </a-form-item>
                    </a-col>
                    <a-col :md="3" :sm="24">
                        <a-form-item label="操作类型">
                            <a-select v-decorator="['operate_type']" placeholder="请选择">
                                <a-select-option value="1">全部</a-select-option>
                                <a-select-option value="2">获得</a-select-option>
                                <a-select-option value="3">消耗</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="5" :sm="24">
                        <a-form-item label="操作行为">
                            <a-select showSearch optionFilterProp="children" :filterOption="filterOption" v-decorator="['transaction_type']" placeholder="请选择">
                                <a-select-option v-for="(item, index) in transactionArr" :key="index" :value="item.transaction_type"> {{ item.cn_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :md="3" :sm="24">
                        <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' } || {} ">
                            <a-button htmlType="submit" type="primary">查询</a-button>
                            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                            <a-button style="margin-left: 8px" icon="export" @click="handleExport">导出</a-button>
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

import {
    isNil
} from 'lodash'

let that
export default {
    mixins: [mixin],
    name: 'game-log-roleGoodsLog',
    components: {
        MddTable,
    },
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: '渠道id',
                    dataIndex: 'channel_id',
                    key: "channel_id",
                    scopedSlots: {
                        customRender: 'channel_id'
                    }
                },
                {
                    title: '区服id',
                    dataIndex: 'server_id',
                    scopedSlots: {
                        customRender: 'server_id'
                    }
                },
                {
                    title: '账号id',
                    dataIndex: 'account_id',
                },
                {
                    title: '账号',
                    dataIndex: 'account'
                },
                {
                    title: '角色id',
                    dataIndex: 'role_id',
                },
                {
                    title: '角色名',
                    dataIndex: 'role_name',
                },
                {
                    title: '操作行为',
                    dataIndex: 'transaction_type',
                },
                {
                    title: '道具id',
                    dataIndex: 'item_id',
                },
                {
                    title: '道具名称',
                    dataIndex: 'item_name'
                },
                {
                    title: '数量',
                    dataIndex: 'count_update',
                },
                {
                    title: '日期',
                    dataIndex: 'record_date'
                },
                {
                    title: '操作类型',
                    dataIndex: 'operate_type',
                    filters: [{
                            text: '全部',
                            value: '全部',
                        },
                        {
                            text: '获得',
                            value: '获得',
                        },
                        {
                            text: '消耗',
                            value: '消耗',
                        }
                    ],
                    onFilter: (value, record) => record.operate_type.indexOf(value) === 0,
                }
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return this.$api.LOG_GOODS_ALL({
                        ...params,
                        ...this.queryParam
                    })
                    .then(res => {
                        let data = {
                            pageSize: parameter.pageSize,
                            pageNo: parameter.pageNo,
                            totalCount: 0,
                            data: []
                        }
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
                        }
                        return data
                    })
            },
            form: this.$form.createForm(this),
            transactionArr: []
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
    created() {
        this.getTransactionAll()
    },
    methods: {
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        getTransactionAll() {
            this.$api.TRANSACTION_ALL().then(res => {
                this.transactionArr = res.Data.list
            })
        },
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    let params = {}
                    const obj = this.form.getFieldsValue()

                    if (!isNil(obj.start_date)) {
                        params.start_date = obj.start_date.format('YYYY-MM-DD')
                    }
                    if (!isNil(obj.end_date)) {
                        params.end_date = obj.end_date.format('YYYY-MM-DD')
                    }
                    this.queryParam = {
                        ...values,
                        ...params
                    }
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
                    let params = {}
                    const obj = this.form.getFieldsValue()

                    if (!isNil(obj.start_date)) {
                        params.start_date = obj.start_date.format('YYYY-MM-DD')
                    }
                    if (!isNil(obj.end_date)) {
                        params.end_date = obj.end_date.format('YYYY-MM-DD')
                    }
                    this.$api.LOG_GOODS_EXPORT({
                        ...values,
                        ...params
                    }).then(res => {
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
