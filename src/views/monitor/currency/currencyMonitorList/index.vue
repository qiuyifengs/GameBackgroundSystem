<template>
<a-card :bordered="false">
    <div class="table-page-search-wrapper">
        <a-form @submit="handleSubmit" layout="inline" :form="form">
            <a-row :gutter="24">
                <a-col :md="4" :sm="24">
                    <a-form-item label="渠道">
                        <a-select v-decorator="['channel_id']" placeholder="请选择" name="channel_id">
                            <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :md="4" :sm="24">
                    <a-form-item label="区服">
                        <a-select v-decorator="['server_id']" placeholder="请选择" name="server_id">
                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                    <a-form-item label="日期">
                        <a-range-picker v-decorator="['start_date']" />
                    </a-form-item>
                </a-col>
                <a-col :md="4" :sm="24">
                    <a-form-item label="监控间隔">
                        <a-select v-decorator="['time', { initialValue: '1' }]" placeholder="请选择">
                            <a-select-option value="0">1小时</a-select-option>
                            <a-select-option value="1">1天</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :md="3" :sm="24">
                    <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' } || {} ">
                        <a-button htmlType="submit" type="primary">查询</a-button>
                        <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                    </span>
                </a-col>
            </a-row>
        </a-form>
    </div>

    <div class="table-operator" style="margin-bottom: 24px">
        <a-button type="primary" icon="export">导出</a-button>
    </div>

    <mdd-table ref="table" size="default" rowKey="key" bordered :columns="columns" :data="loadData" showPagination="auto" />
</a-card>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
} from '@/components'

import {
    mixin
} from '@/utils/mixin'

export default {
    mixins: [mixin],
    name: 'currencyMonitorList',
    components: {
        MddTable,
    },
    data() {
        return {
            form: this.$form.createForm(this),
            queryParam: {},
            columns: [{
                    title: '渠道',
                    dataIndex: 'channel_id',
                },
                {
                    title: '区服',
                    dataIndex: 'server_id'
                },
                {
                    title: '日期',
                    detaIndex: 'date'
                },
                {
                    title: '产出',
                    children: [
                        {
                            title: '怪物掉落',
                            dataIndex: 'total_login',
                        },
                        {
                            title: '幸运一击',
                            dataIndex: 'total_recharge_people',
                        },
                        {
                            title: '关卡奖励',
                            dataIndex: 'pay_lv1',
                        },
                        {
                            title: '能量挂机',
                            dataIndex: 'pay_lv2',
                        },
                        {
                            title: '世界BOSS奖励',
                            dataIndex: 'pay_lv3',
                        },
                        {
                            title: '阵营赛季奖励',
                            dataIndex: 'pay_lv4',
                        },
                        {
                            title: '比赛排行奖励',
                            dataIndex: 'pay_lv5',
                        },
                        {
                            title: '每日任务',
                            dataIndex: 'pay_lv6',
                        },
                        {
                            title: '成就',
                            dataIndex: 'pay_lv7',
                        },
                        {
                            title: '活动产出',
                            dataIndex: 'pay_lv8',
                        },
                        {
                            title: '产出话费',
                            dataIndex: 'pay_lv9',
                        },
                        {
                            title: '产出红包',
                            dataIndex: 'pay_lv10',
                        },
                    ]
                },
                {
                    title: '消耗',
                    children: [
                        {
                            title: '能量商城',
                            dataIndex: 'xx1'
                        },
                        {
                            title: '攻击消耗',
                            dataIndex: 'xx2'
                        },
                        {
                            title: '能量挂机',
                            dataIndex: 'xx3'
                        },
                        {
                            title: '比赛报名',
                            dataIndex: 'xx4'
                        }
                    ]
                }
            ],
            loadData: parameter => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            loop: false
                        })
                    }, 800)
                }).then(() => {
                    const data = {
                        pageSize: 10,
                        pageNo: 1,
                        totalCount: 10,
                        data: []
                    }
                    return data
                })
            },
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', this.values)
                    this.$refs.table.refresh(true)
                }
            })
        },
        handleReset() {
            this.form.resetFields();
            this.queryParam = {}
        },
        handleOk() {
            this.$refs.table.refresh()
        },
    }
}
</script>
