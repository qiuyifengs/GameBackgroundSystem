<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select placeholder="请选择" name="channel_id" v-decorator="['channel_id', rule.channel_id]">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="区服">
                            <a-select placeholder="请选择" name="server_id" v-decorator="['server_id', rule.server_id]">
                                <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
                        <a-form-item label="物品名称">
                            <a-input />
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
                        <a-form-item label="角色名ID">
                            <a-input />
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
                        <a-form-item label="角色名">
                            <a-input />
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
                        <a-form-item label="道具位置">
                            <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                                <a-select-option value="0">全部</a-select-option>
                                <a-select-option value="1">关闭</a-select-option>
                                <a-select-option value="2">运行中</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">

                    <a-col :md="3">
                        <a-form-item label="道具类型">
                            <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                                <a-select-option value="0">全部</a-select-option>
                                <a-select-option value="1">关闭</a-select-option>
                                <a-select-option value="2">运行中</a-select-option>
                            </a-select>
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

let that
export default {
    mixins: [mixin],
    name: 'game-player-roleProps',
    components: {
        MddTable,
    },
    data() {
        return {
            rule: {
                channel_id: {
                    rules: [{
                        required: true,
                        message: '请选择渠道'
                    }]
                },
                server_id: {
                    rules: [{
                        required: true,
                        message: '请选择服务器'
                    }]
                }
            },
            queryParam: {},
            columns: [{
                    title: '渠道',
                    dataIndex: 'level',
                },
                {
                    title: '服务器序号',
                    dataIndex: 'total1',
                },
                {
                    title: '角色/角色ID',
                    dataIndex: 'total2',
                },
                {
                    title: '物品ID/物品名称',
                    dataIndex: 'total3',
                },
                {
                    title: '物品序列号',
                    dataIndex: 'total4',
                },
                {
                    title: '数量',
                    dataIndex: 'total5',
                },
                {
                    title: '品质',
                    dataIndex: 'total6',
                },
                {
                    title: '强化等级',
                    dataIndex: 'total7',
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
            form: this.$form.createForm(this),
        }
    },
    beforeCreate() {
        that = this
    },
    filters: {
        channelFilter(type) {
            return that.channelList.filter(item => item.channel_id === type)[0].channel_name
        },
        serverFilter(type) {
            return that.serverList.filter(item => item.server_id === type)[0].server_name
        }
    },
    methods: {
        handleOk() {
            this.$refs.table.refresh()
        },
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                console.log(err)
                if (!err) {
                    this.queryParam = values
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
