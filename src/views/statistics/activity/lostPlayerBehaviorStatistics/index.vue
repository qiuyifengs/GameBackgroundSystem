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
                    <a-col :md="6">
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
                    <a-col :md="6">
                        <a-form-item label="角色创建时间">
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
                        <a-form-item label="统计类型">
                            <a-select placeholder="请选择" v-decorator="['type']">
                                <a-select-option value="1">关卡进度</a-select-option>
                                <a-select-option value="2">最后参与玩法</a-select-option>
                                <a-select-option value="3">最后点击事件</a-select-option>
                                <a-select-option value="4">最后停留页面</a-select-option>
                            </a-select>
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
    </a-card>
    <a-card :bordered="false">
        <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto" />
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
    name: 'statistics-activity-lostPlayerBehaviorStatistics',
    components: {
        MddTable,
    },
    data() {
        return {
            data: [],
            sortType: 'positive',
            padding: [20, 20, 40, 140],
            scale: [{
                dataKey: 'value',
                alias: '玩法统计'
            }],
            label,
            labelFormat,
            tickLine,
            title,
            style,
            queryParam: {},
            columns: [{
                    title: '玩法',
                    dataIndex: 'name',
                },
                {
                    title: '人数',
                    dataIndex: 'value',
                },
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return this.$api.ACTIVITY_LOST_PLAYER_BEHAVIOR_STATISTICS_ALL({
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
                            this.data = []
                            res.Data.list.forEach(item => {
                                const obj = {
                                    type: `${item.name}`,
                                    value: `${item.value}人`
                                }
                                this.data.push(obj)
                            })
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
    methods: {
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
                    this.$api.ACTIVITY_LOST_PLAYER_BEHAVIOR_STATISTICS_EXPORT({
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
