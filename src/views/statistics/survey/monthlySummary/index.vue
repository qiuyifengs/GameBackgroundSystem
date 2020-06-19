<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select placeholder="请选择" name="channel_id" v-decorator="['channel_id', { rules: [{required: false, message: '渠道id不能为空'}] }]">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="7">
                        <a-form-item label="区服">
                            <a-row>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select placeholder="请选择" name="server_id_start" v-decorator="['server_id_start', { rules: [{required: false, message: '起始服务器不能为空'}] }]">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select placeholder="请选择" name="server_id_end" v-decorator="['server_id_end', { rules: [{required: false, message: '结束服务器不能为空'}] }]">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :md="7">
                        <a-form-item label="月份范围">
                            <a-row>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-month-picker v-decorator="['start_month']" />
                                    </a-form-item>
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-month-picker v-decorator="['end_month']" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
                        <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' }">
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

        <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" :showPagination="false" />
    </a-card>
</div>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
} from '@/components'
import {
    get_stat_monthly_data
} from '@/api/statistics'
import {
    mixin
} from '@/utils/mixin'
import {
    isNil
} from 'lodash'

export default {
    mixins: [mixin],
    name: 'statistics-survey-monthlySummary',
    components: {
        MddTable
    },
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: '月份',
                    dataIndex: 'record_month',
                    key: 'record_month'
                },
                {
                    title: '月流水',
                    dataIndex: 'total_recharge'
                },
                {
                    title: '月注册用户',
                    dataIndex: 'total_reg',
                },
                {
                    title: '月登陆用户',
                    dataIndex: 'total_login',
                },
                {
                    title: '月充值人数',
                    dataIndex: 'total_recharge_people',
                },
                {
                    title: '月付费率',
                    dataIndex: 'pay_lv',
                },
                {
                    title: '月ARPU',
                    dataIndex: 'arpu',
                },
                {
                    title: '月最高在线',
                    dataIndex: 'max_online',
                },
                {
                    title: '月均在线',
                    dataIndex: 'avg_online',
                },
                {
                    title: '月产出能量',
                    dataIndex: 'produce_energy',
                }, {
                    title: '月消耗能量',
                    dataIndex: 'cost_energy',
                }
            ],
            loadData: parameter => {
                return this.$api.OVERVIEW_MONTHLY_SUMMARY_ALL(this.queryParam)
                    .then(res => {
                        let data = {
                            data: []
                        }
                        if (res.Success) {
                            data = {
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
            form: this.$form.createForm(this)
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    let params = {}
                    const obj = this.form.getFieldsValue()

                    if (!isNil(obj.start_month)) {
                        params.start_month = obj.start_month.format('YYYY-MM')
                    }
                    if (!isNil(obj.end_month)) {
                        params.end_month = obj.end_month.format('YYYY-MM')
                    }
                    this.queryParam = {
                        ...values,
                        ...params
                    }
                    console.log('Received values of form: ', {
                        ...values,
                        ...params
                    })
                    this.$refs.table.refresh(true)
                }
            })
        },
        handleExport() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    let params = {}
                    const obj = this.form.getFieldsValue()

                    if (!isNil(obj.start_month)) {
                        params.start_month = obj.start_month.format('YYYY-MM')
                    }
                    if (!isNil(obj.end_month)) {
                        params.end_month = obj.end_month.format('YYYY-MM')
                    }
                    this.$api.OVERVIEW_MONTHLY_SUMMARY_EXPORT({
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
