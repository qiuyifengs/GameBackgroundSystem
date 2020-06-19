<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select showSearch optionFilterProp="children" :filterOption="filterOption" placeholder="请选择" name="channel_id" v-decorator="['channel_id']">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="7">
                        <a-form-item label="区服">
                            <a-row>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select showSearch optionFilterProp="children" :filterOption="filterOption" placeholder="请选择" name="server_id_start" v-decorator="['server_id_start', { rules: [{required: false, message: '起始服务器不能为空'}] }]">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select showSearch optionFilterProp="children" :filterOption="filterOption" placeholder="请选择" name="server_id_end" v-decorator="['server_id_end', { rules: [{required: false, message: '结束服务器不能为空'}] }]">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>

                    <a-col :md="3">
                        <a-form-item label="货币类型">
                            <a-select v-decorator="['type']" placeholder="请选择">
                                <a-select-option value="1403001">钻石</a-select-option>
                                <a-select-option value="1403002">能量</a-select-option>
                                <a-select-option value="1403003">积分</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :md="6">
                        <a-form-item label="日期">
                            <a-row>
                                <a-col :md="11">
                                    <a-date-picker v-decorator="['start_date']" placeholder="开始日期" />
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-date-picker v-decorator="['end_date']" placeholder="结束日期" />
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>

                    <a-col :md="2">
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
    name: 'statistics-consume-shopPropsConsumeDetail',
    components: {
        MddTable,
    },
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: '区服',
                    dataIndex: 'server_id',
                    scopedSlots: {
                        customRender: 'server_id'
                    }
                },
                {
                    title: '渠道',
                    dataIndex: 'channel_id',
                    scopedSlots: {
                        customRender: 'channel_id'
                    }
                },
                {
                    title: '账号ID',
                    dataIndex: 'account_id',
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
                    title: '购买数',
                    dataIndex: 'get_item_count',
                },
                {
                    title: '购买的道具名称',
                    dataIndex: 'get_item_names',
                },
                {
                    title: '消耗货币数',
                    dataIndex: 'cost_item_count',
                },
                {
                    title: '消耗货币名称',
                    dataIndex: 'cost_item_names',
                    filters: [{
                            text: '钻石',
                            value: '钻石',
                        },
                        {
                            text: '能量',
                            value: '能量',
                        },
                        {
                            text: '积分',
                            value: '积分',
                        }
                    ],
                    onFilter: (value, record) => record.cost_item_names.indexOf(value) === 0,
                },
                {
                    title: '购买时间',
                    dataIndex: 'record_date',
                }
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return this.$api.SHOP_PROP_CONSUME_DETAIL_ALL({
                        ...this.queryParam,
                        ...params
                    })
                    .then(res => {
                        let data = {
                            pageSize: 10,
                            pageNo: 1,
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
        }
    },
    filters: {
        channelFilter(type) {
            return that.channelList.filter(item => item.channel_id === type)[0].channel_name
        },
        serverFilter(type) {
            return that.serverList.filter(item => item.server_id === type)[0].server_name
        }
    },
    beforeCreate() {
        that = this
    },
    methods: {
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        onStartDateChange(date, dateString) {
            this.form.resetFields(`start_date`)
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
                    console.log('Received values of form: ', values)
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
                    this.$api.SHOP_PROP_CONSUME_DETAIL_EXPORT({
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
    margin-bottom: 0
}
</style>
