<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select showSearch optionFilterProp="children" :filterOption="filterOption" placeholder="请选择" name="channel_id" v-decorator="['channel_id', rule.channel_id]">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="7">
                        <a-form-item label="区服">
                            <a-row>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select showSearch optionFilterProp="children" :filterOption="filterOption" placeholder="请选择" name="server_id_start" v-decorator="['server_id_start', rule.server_id_start]">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select showSearch optionFilterProp="children" :filterOption="filterOption" placeholder="请选择" name="server_id_end" v-decorator="['server_id_end', rule.server_id_end]">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :md="7">
                        <a-form-item label="日期">
                            <a-row>
                                <a-col :md="11">
                                    <a-date-picker v-decorator="['start_date']" placeholder="开始日期" style="width: 100%" />
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-date-picker v-decorator="['end_date']" placeholder="结束日期" style="width: 100%" />
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
                        <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' }">
                            <a-button htmlType="submit" type="primary">查询</a-button>
                            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </a-card>
    <a-card :bordered="false">

        <mdd-table ref="table" size="default" rowKey="reg_date" :columns="columns" :data="loadData" showPagination="auto" />
    </a-card>
</div>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
} from '@/components'
import {
    getRegsourcestat
} from '@/api/statistics'
import {
    mixin
} from '@/utils/mixin'

import {
    isNil
} from 'lodash'

export default {
    mixins: [mixin],
    name: 'statistics-activity-registrationSource',
    components: {
        MddTable,
    },
    data() {
        return {
            queryParam: {},
            rule: {
                channel_id: {
                    rules: [{
                        required: true,
                        message: '渠道id不能为空'
                    }]
                },
                server_id_start: {
                    rules: [{
                        required: true,
                        message: '起始服务器id不能为空'
                    }]
                },
                server_id_end: {
                    rules: [{
                        required: true,
                        message: '结束服务器id不能为空'
                    }]
                }
            },
            columns: [{
                    title: '注册日期',
                    dataIndex: 'reg_date',
                },
                {
                    title: '总注册数',
                    dataIndex: 'total_reg',
                },
                {
                    title: 'PC注册数',
                    dataIndex: 'pc',
                },
                {
                    title: 'PC注册数占比',
                    dataIndex: 'pc_percent',
                },
                {
                    title: 'H5注册数',
                    dataIndex: 'h5',
                },
                {
                    title: 'H5注册数占比',
                    dataIndex: 'h5_percent',
                },
                {
                    title: '苹果端注册数',
                    dataIndex: 'ios',
                },
                {
                    title: '苹果端注册数占比',
                    dataIndex: 'ios_percent',
                },
                {
                    title: '安卓端注册数',
                    dataIndex: 'android',
                },
                {
                    title: '安卓端注册数占比',
                    dataIndex: 'android_percent',
                },
                {
                    title: '安卓模拟器注册数',
                    dataIndex: 'android_simulate'
                },
                {
                    title: '安卓模拟器注册数占比',
                    dataIndex: 'android_simulate_percent'
                }
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return this.$api.ACTIVITY_REG_SOURCE_ALL({
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
                                data: res.Data.list
                            }
                        } else {
                            this.$message.error(res.Error)
                        }
                        return data
                    })
            },
            form: this.$form.createForm(this)
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
                console.log(err)
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
        handleReset() {
            this.form.resetFields();
            this.queryParam = {}
        }
    }
}
</script>

<style scoped>
.table-page-search-wrapper .ant-form-inline .ant-form-item {
    margin: 0
}
</style>
