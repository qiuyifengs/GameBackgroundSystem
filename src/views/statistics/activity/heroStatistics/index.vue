<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select showSearch optionFilterProp="children" :filterOption="filterOption" placeholder="请选择" name="channel_id" v-decorator="['channel_id', { rules: [{required: false, message: '渠道id不能为空'}] }]">
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
                                <a-col :md="2" :sm="2" style="text-align: center">至</a-col>
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
                        <a-form-item label="排序">
                            <a-select v-decorator="['type']" placeholder="请选择">
                                <a-select-option value="0">按消费总数</a-select-option>
                                <a-select-option value="1">按购买角色数</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :md="6">
                        <a-form-item label="日期">
                            <a-row>
                                <a-col :md="11">
                                    <a-date-picker v-decorator="['start_date']" />
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-date-picker v-decorator="['end_date']" />
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>

                    <a-col :md="4" :sm="24">
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

    <a-card :bordered="false" style="width:100%" :tabList="tabListNoTitle" :activeTabKey="noTitleKey" @tabChange="key => onTabChange(key, 'noTitleKey')">
        <p v-if="noTitleKey === '1'">
            <a-table :columns="columns" rowKey="item_name" :dataSource="data.diamods" :loading="loading" :pagination="{ hideOnSinglePage: true }">
                <span slot="percent" slot-scope="text">
                    <a-progress :percent="text | percentFilter" strokeLinecap="square" size="small" status="active" />
                </span>
            </a-table>
        </p>
        <p v-if="noTitleKey === '2'">
            <a-table :columns="columns" rowKey="item_name" :dataSource="data.energy" :loading="loading" :pagination="{ hideOnSinglePage: true }">
                <span slot="percent" slot-scope="text">
                    <a-progress :percent="text | percentFilter" size="small" status="active" />
                </span>
            </a-table>
        </p>
        <p v-if="noTitleKey === '3'">
            <a-table :columns="columns" rowKey="total" :dataSource="data.integral" :loading="loading" :pagination="{ hideOnSinglePage: true }">
                <span slot="percent" slot-scope="text">
                    <a-progress :percent="text | percentFilter" size="small" status="active" />
                </span>
            </a-table>
        </p>
    </a-card>

</div>
</template>

<script>
import moment from 'moment'
import {
    mixin
} from '@/utils/mixin'
import {
    isNil
} from 'lodash'

export default {
    mixins: [mixin],
    name: 'statistics-consume-shopPropsConsumeRank',
    data() {
        return {
            tabListNoTitle: [{
                    key: '1',
                    tab: '钻石商城'
                },
                {
                    key: '2',
                    tab: '能量商城'
                },
                {
                    key: '3',
                    tab: '积分商城'
                }
            ],
            noTitleKey: '1',
            loading: false,
            queryParam: {},
            columns: [{
                    title: '排名',
                    dataIndex: 'ranking',
                },
                {
                    title: '道具名称',
                    dataIndex: 'item_name',
                },
                {
                    title: '消费总数',
                    dataIndex: 'total',
                },
                {
                    title: '消费占比',
                    dataIndex: 'percent',
                    scopedSlots: {
                        customRender: 'percent'
                    }
                },
                {
                    title: '角色数',
                    dataIndex: 'role_count',
                },
                {
                    title: '消费次数',
                    dataIndex: 'cost_time',
                }
            ],
            form: this.$form.createForm(this),
            data: {
                diamods: [],
                energy: [],
                integral: []
            }
        }
    },
    filters: {
        percentFilter(val) {
            return Number(val.replace('%', ''))
        }
    },
    methods: {
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        onTabChange(key, type) {
            console.log(key, type);
            this[type] = key;
        },
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)
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
                    this.loadData()
                }
            })
        },
        handleReset() {
            this.form.resetFields();
            this.queryParam = {}
        },
        loadData() {
            this.loading = true
            this.$api.SHOP_PROP_CONSUME_RANK_ALL(this.queryParam)
                .then(res => {
                    this.loading = false
                    if (res.Success) {
                        this.data.diamods = res.Data.list.diamods_ranking
                        this.data.energy = res.Data.list.energy_ranking
                        this.data.integral = res.Data.list.integral_ranking
                    } else {
                        this.$message.error(res.Error)
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
                    this.$api.SHOP_PROP_CONSUME_RANK_EXPORT({
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
