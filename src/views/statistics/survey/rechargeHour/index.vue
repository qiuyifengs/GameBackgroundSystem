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
                    <a-col :md="7">
                        <a-form-item label="区服">
                            <a-row>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select showSearch optionFilterProp="children" :filterOption="filterOption" v-decorator="['server_id_start']" placeholder="请选择" name="server_id_start">
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
                                    <a-date-picker v-decorator="['start_date']" placeholder="开始日期" />
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-date-picker v-decorator="['end_date']" placeholder="结束日期" />
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="开始金额">
                            <a-input-number v-decorator="['money_start']" style="width:100%" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="2">
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
        <mdd-table ref="table" size="default" rowKey="record_date" :columns="columns" :data="loadData" :showPagination="false" />
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

export default {
    mixins: [mixin],
    name: 'statistics-survey-rechargeHour',
    components: {
        MddTable
    },
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: '日期',
                    dataIndex: 'record_date',
                    width: '120px'
                },
                {
                    title: '0点',
                    dataIndex: '0',
                },
                {
                    title: '1点',
                    dataIndex: '1'
                },
                {
                    title: '2点',
                    dataIndex: '2',
                },
                {
                    title: '3点',
                    dataIndex: '3',
                },
                {
                    title: '4点',
                    dataIndex: '4'
                },
                {
                    title: '5点',
                    dataIndex: '5'
                },
                {
                    title: '6点',
                    dataIndex: '6'
                },
                {
                    title: '7点',
                    dataIndex: '7'
                },
                {
                    title: '8点',
                    dataIndex: '8'
                },
                {
                    title: '9点',
                    dataIndex: '9'
                },
                {
                    title: '10点',
                    dataIndex: '10'
                },
                {
                    title: '11点',
                    dataIndex: '11'
                },
                {
                    title: '12点',
                    dataIndex: '12'
                },
                {
                    title: '13点',
                    dataIndex: '13'
                },
                {
                    title: '14点',
                    dataIndex: '14'
                },
                {
                    title: '15点',
                    dataIndex: '15'
                },
                {
                    title: '16点',
                    dataIndex: '16'
                },
                {
                    title: '17点',
                    dataIndex: '17'
                },
                {
                    title: '18点',
                    dataIndex: '18'
                },
                {
                    title: '19点',
                    dataIndex: '19'
                },
                {
                    title: '20点',
                    dataIndex: '20'
                },
                {
                    title: '21点',
                    dataIndex: '21'
                },
                {
                    title: '22点',
                    dataIndex: '22'
                },
                {
                    title: '23点',
                    dataIndex: '23'
                },
            ],
            loadData: parameter => {

                return this.$api.OVERVIEW_RECHARGE_HOUR_ALL(this.queryParam)
                    .then(res => {
                        let data = {
                            data: []
                        }
                        if (res.Success) {
                            data = {
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
    }
}
</script>

<style scoped>
.table-page-search-wrapper .ant-form-inline .ant-form-item {
    margin-bottom: 12px
}
</style>
