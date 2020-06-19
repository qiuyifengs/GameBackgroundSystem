<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" :form="form" layout="inline">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select showSearch optionFilterProp="children" :filterOption="filterOption" v-decorator="['channel_id', rule.channel_id]" placeholder="请选择" name="channel_id">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="区服">
                            <a-select showSearch optionFilterProp="children" :filterOption="filterOption" v-decorator="['server_id', rule.server_id]" placeholder="请选择" name="server_id">
                                <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="7">
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
                    <a-col :md="4">
                        <a-form-item label="来源">
                            <a-select showSearch optionFilterProp="children" :filterOption="filterOption" v-decorator="['device_type']" placeholder="请选择">
                                <a-select-option v-for="(item, index) in deviceTypeList" :key="index" :value="item.device_type">{{ item.device_type_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
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
        <mdd-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" showPagination="auto" />
    </a-card>
</div>
</template>

<script>
import moment from 'moment'
import {
    MddTable
} from '@/components'
import {
    getDeviceTypeList
} from '@/api/common'

import {
    mixin
} from '@/utils/mixin'

import {
    isNil
} from 'lodash'

export default {
    mixins: [mixin],
    name: 'statistics-activity-keepStatistics',
    components: {
        MddTable
    },
    data() {
        return {
            queryParam: {},
            rule: {
                channel_id: {
                    rules: [{
                        required: true,
                        message: '渠道id不能为空'
                    }],
                },
                server_id: {
                    rules: [{
                        required: true,
                        message: '服务器id不能为空'
                    }],
                },
            },
            columns: [{
                    title: 'ID',
                    dataIndex: 'id'
                },
                // {
                //     title: '服务器id',
                //     dataIndex: 'server_id',
                // },
                // {
                //     title: '渠道id',
                //     dataIndex: 'channel_id',
                // },
                {
                    title: '注册日期',
                    dataIndex: 'reg_date',
                },
                {
                    title: '总注册数',
                    dataIndex: 'total_reg',
                },
                {
                    title: '统计时间',
                    dataIndex: 'create_date',
                },
                {
                    title: '次日留存数',
                    dataIndex: 'k2',
                },
                {
                    title: '3日留存',
                    dataIndex: 'k3',
                },
                {
                    title: '4日留存',
                    dataIndex: 'k4',
                },
                {
                    title: '5日留存',
                    dataIndex: 'k5',
                },
                {
                    title: '6日留存',
                    dataIndex: 'k6',
                },
                {
                    title: '7日留存',
                    dataIndex: 'k7',
                },
                {
                    title: '10日留存',
                    dataIndex: 'k10',
                },
                {
                    title: '15日留存',
                    dataIndex: 'k15',
                },
                {
                    title: '30日留存',
                    dataIndex: 'k30'
                }
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return this.$api.ACTIVITY_LIUCUN_ALL({
                        ...this.queryParam,
                        ...params
                    })
                    .then(res => {
                        try {
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
                                    data: res.Data.list
                                }
                            } else {
                                this.$message.error(res.Error)
                            }
                            return data
                        } catch (e) {
                            console.error(e)
                        }

                    })
            },
            deviceTypeList: [],
            form: this.$form.createForm(this)
        }
    },
    created() {
        this.getDeviceTypeArr()
    },
    methods: {
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        getDeviceTypeArr() {
            this.$api.DEVICE_TYPE_ALL().then(res => {
                this.deviceTypeList = res.Data.list
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
                    console.log('Received values of form: ', this.queryParam)
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
                    this.$api.ACTIVITY_LIUCUN_EXPORT({
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
        }
    }
}
</script>

<style scoped>
.table-page-search-wrapper .ant-form-inline .ant-form-item {
    margin: 0
}
</style>
