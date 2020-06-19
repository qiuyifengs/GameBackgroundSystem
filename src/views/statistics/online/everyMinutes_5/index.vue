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
                    <a-col :md="4">
                        <a-form-item label="区服">
                            <a-select placeholder="请选择" name="server_id" v-decorator="['server_id', { rules: [{required: false, message: '服务器不能为空'}] }]">
                                <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="日期">
                            <a-date-picker v-decorator="['date']" style="width: 100%" />
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
        <!-- <v-chart :forceFit="true" height="400" :data="dv" :padding="pad" :scale="scale" :animate="false">
        <v-tooltip></v-tooltip>
        <v-axis dataKey="yestoday" :title="true"></v-axis>
        <v-legend></v-legend>
        <v-line position="time_point*yestoday" color="city" :size="4" />
        <v-point position="time_point*today" color="city" :size="4"/>

    </v-chart> -->
        <!-- <v-plugin>
        <v-slider container='viser-slider-1' width="auto" height="26" :start="start" :end="end" xAxis="time_point" yAxis="yestoday" :scales="scale1" :data="data" :backgroundChart="bg" :onChange="onChange"></v-slider>
    </v-plugin> -->
        <a-spin :spinning="spinning" :delay="delayTime">
            <TimelineChart :height="400" :data="data" :titleMap="{ yestoday: '昨日', today: '今日' }" :columns="['time_point', 'yestoday', 'today']" :colors="colors" />
        </a-spin>
    </a-card>
</div>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
} from '@/components'

const DataSet = require('@antv/data-set');

const sourceData = [{
        time_point: '13.00',
        yestoday: 7.0,
        today: 3.9
    },
    {
        time_point: '13.05',
        yestoday: 6.9,
        today: 4.2
    },
    {
        time_point: '13.10',
        yestoday: 9.5,
        today: 5.7
    },
    {
        time_point: '13.15',
        yestoday: 14.5,
        today: 8.5
    },
    {
        time_point: '13.20',
        yestoday: 18.4,
        today: 11.9
    },
    {
        time_point: '13.20',
        yestoday: 21.5,
        today: 15.2
    },
    {
        time_point: '13.25',
        yestoday: 25.2,
        today: 17.0
    },
    {
        time_point: '13.30',
        yestoday: 26.5,
        today: 16.6
    },
    {
        time_point: '13.35',
        yestoday: 23.3,
        today: 14.2
    },
    {
        time_point: '13.40',
        yestoday: 18.3,
        today: 10.3
    },
    {
        time_point: '13.45',
        yestoday: 13.9,
        today: 6.6
    },
    {
        time_point: '13.50',
        yestoday: 9.6,
        today: 4.8
    },
]

import {
    mixin
} from '@/utils/mixin'
import {
    colors,
    TimelineChart
} from '@/components'

import {
    isNil
} from 'lodash'

export default {
    mixins: [mixin],
    name: 'statistics-online-everyMinutes_5',
    components: {
        TimelineChart
    },
    data() {
        return {
            spinning: false,
            delayTime: 500,
            colors,
            data: [],
            queryParam: {},
            form: this.$form.createForm(this),
        }
    },
    created() {
        this.$nextTick(() => {
            this.getEveryMinutes5Data()
        })
    },
    methods: {
        getEveryMinutes5Data() {
            this.spinning = true
            this.$api.ONLINE_EVERY_MINUTES_5_ALL(this.queryParam)
                .then(res => {
                    this.spinning = false
                    if (res.Success) {
                        this.data = res.Data.online
                    } else {
                        this.$message.error(res.Error)
                    }
                })
        },
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)
                    const obj = this.form.getFieldsValue()
                    let params = {}
                    if (!isNil(obj.date)) {
                        params.date = this.form.getFieldsValue().date.format('YYYY-MM-DD')
                    }
                    this.queryParam = {
                        ...values,
                        ...params
                    }
                    this.getEveryMinutes5Data()
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
