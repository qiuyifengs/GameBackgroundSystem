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

                    <a-col :md="7">
                        <a-form-item label="角色创建时间">
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
                    <a-col :md="4">
                        <a-form-item label="等级步长">
                            <a-input v-decorator="['foot']" allowClear />
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
    <a-card :bordered="false" style="margin-bottom: 18px" v-if="data.length > 0">
        <div ref="printMe">
            <v-chart :forceFit="true" height="300" :data="data" :scale="scale" :padding="padding">
                <v-tooltip :shared="true"></v-tooltip>
                <v-interval position="type*value" opacity="1">
                </v-interval>
                <v-axis dataKey="type" :label="label" :tickLine="tickLine">
                </v-axis>
                <v-axis dataKey="value" :label="labelFormat" :title="title">
                </v-axis>
            </v-chart>
        </div>
        <img style="width: 100%" :src="output">
    </a-card>
    <a-card :bordered="false">
        <mdd-table ref="table" size="default" rowKey="level_range" :columns="columns" :data="loadData" showPagination="auto" />
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
import html2canvas from 'html2canvas'

import {
    isNil
} from 'lodash'

const DataSet = require('@antv/data-set');

const label = {
    textStyle: {
        fill: '#aaaaaa'
    }
}

const labelFormat = {
    textStyle: {
        fill: '#aaaaaa'
    },
    formatter: function formatter(text) {
        return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
}

const tickLine = {
    alignWithLabel: false,
    length: 0
}

const title = {
    offset: 70
}

const style = {
    text: {
        fontSize: 13
    }
}

function sortData(sortType) {
    if (sortType === 'positive') {
        data.sort(function (a, b) {
            return b.value - a.value;
        });
    } else {
        data.sort(function (a, b) {
            return a.value - b.value;
        });
    }
}

export default {
    mixins: [mixin],
    name: 'statistics-activity-lostPlayerRankDistribution',
    components: {
        MddTable,
    },
    data() {
        return {
            output: null,
            data: [],
            sortType: 'positive',
            padding: [20, 20, 40, 140],
            scale: [{
                dataKey: 'value',
                alias: '等级分布'
            }],
            label,
            labelFormat,
            tickLine,
            title,
            style,
            position: ['2014-01', 1750],
            queryParam: {},
            columns: [{
                    title: '等级范围',
                    dataIndex: 'level_range',
                },
                {
                    title: '总人数',
                    dataIndex: 'total',
                },
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return this.$api.ACTIVITY_LOST_PLAYER_RANK_DISTRIBUTION_ALL({
                        ...params,
                        ...this.queryParam
                    })
                    .then(res => {
                        let data = {
                            pageSize: 10,
                            pageNo: 1,
                            totalCount: 0,
                            data: []
                        }
                        if (res.Success) {
                            this.data = []
                            res.Data.list.forEach(item => {
                                const obj = {
                                    type: `${item.level_range} 级`,
                                    value: item.total
                                }
                                this.data.push(obj)
                            })
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
        print() {
            const el = this.$refs.printMe;
            html2canvas(el).then(canvas => {
                this.output = canvas.toDataURL("image/png");
            });
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
                    this.$api.ACTIVITY_LOST_PLAYER_RANK_DISTRIBUTION_EXPORT({
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
    margin-bottom: 0
}
</style>
