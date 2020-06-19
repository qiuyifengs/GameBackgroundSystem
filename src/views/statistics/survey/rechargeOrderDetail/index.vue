<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select showSearch optionFilterProp="children" :filterOption="filterOption" placeholder="请选择" name="channel_id" v-decorator="['channel_id', { rules: [{required: true, message: '渠道id不能为空'}] }]">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="7">
                        <a-form-item label="区服">
                            <a-row>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select showSearch optionFilterProp="children" :filterOption="filterOption" v-decorator="['server_id_start']" placeholder="请选择">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select showSearch optionFilterProp="children" :filterOption="filterOption" v-decorator="['server_id_end']" placeholder="请选择" name="server_id_end">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-item label="日期">
                            <a-row>
                                <a-col :md="11">
                                    <a-date-picker v-decorator="['start_date']" style="width: 100%" placeholder="开始日期" />
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-date-picker v-decorator="['end_date']" style="width: 100%" placeholder="结束日期" />
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-item label="充值金额范围">
                            <a-row>
                                <a-col :md="11">
                                    <a-input-number v-decorator="['money_start']" style="width: 100%" />
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-input-number v-decorator="['money_end']" style="width: 100%" />
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="用户账号">
                            <a-input v-decorator="['account']" allowClear />
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="订单号">
                            <a-input v-decorator="['order_number']" allowClear />
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
                        <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' }">
                            <a-button htmlType="submit" type="primary">查询</a-button>
                            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                            <a-button style="margin-left: 8px" icon="export" @click="handleExport">导出</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </a-card>
    <a-card :bordered="false" class="mb18">

        <mdd-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" showPagination="auto" :pageURI="true">
            <span slot="server_id" slot-scope="text">
                {{ text | serverFilter }}
            </span>
        </mdd-table>
    </a-card>
</div>
</template>

<script>
import moment from 'moment'
import {
    MddTable
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
    name: 'statistics-survey-rechargeOrderDetail',
    components: {
        MddTable
    },
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: 'ID',
                    dataIndex: 'id',
                },
                {
                    title: '服务器',
                    dataIndex: 'server_id',
                    scopedSlots: {
                        customRender: 'server_id'
                    }
                },
                {
                    title: '订单号',
                    dataIndex: 'order_number',
                },
                {
                    title: '账号ID',
                    dataIndex: 'account_id',
                },
                {
                    title: '账号名',
                    dataIndex: 'account'
                },
                {
                    title: '角色ID',
                    dataIndex: 'role_id',
                },
                {
                    title: '角色名',
                    dataIndex: 'role_name'
                },
                {
                    title: '充值金额',
                    dataIndex: 'money',
                },
                {
                    title: '充值时间',
                    dataIndex: 'record_date',
                },
                {
                    title: '获得奖励',
                    dataIndex: 'transaction_details',
                    width: '420px'
                },
                {
                    title: '充值类型',
                    dataIndex: 'pay_type',
                }
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return this.$api.OVERVIEW_RECHARGE_ORDER_DETAIL_ALL({
                        ...this.queryParam,
                        ...params
                    })
                    .then(res => {
                        let data = {}
                        if (res.Success) {
                            data = {
                                pageSize: res.Data.page_info.page_size,
                                pageNo: Number(res.Data.page_info.page),
                                totalCount: res.Data.page_info.total,
                                data: res.Data.list
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
            form: this.$form.createForm(this)
        }
    },
    beforeCreate() {
        that = this
    },
    filters: {
        serverFilter(type) {
            return that.serverList.filter(item => item.server_id === type)[0].server_name
        }
    },
    methods: {
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
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
                    this.$api.OVERVIEW_RECHARGE_ORDER_DETAIL_EXPORT({
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
        handleReset() {
            this.form.resetFields();
            this.queryParam = {}
        },
    }
}
</script>

<style scoped>
.table-page-search-wrapper .ant-form-inline .ant-form-item {
    margin-bottom: 12px
}
</style>
