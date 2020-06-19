<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4" :sm="24">
                        <a-form-item label="渠道">
                            <a-select showSearch optionFilterProp="children" :filterOption="filterOption" placeholder="请选择" name="channel_id" v-decorator="['channel_id', rule.channel_id]">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4" :sm="24">
                        <a-form-item label="区服">
                            <a-select showSearch optionFilterProp="children" :filterOption="filterOption" placeholder="请选择" name="server_id" v-decorator="['server_id', rule.server_id]">
                                <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
                        <a-form-item label="账号">
                            <a-input v-decorator="['account']" allowClear />
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
                        <a-form-item label="账号id">
                            <a-input v-decorator="['account_id']" allowClear />
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
                        <a-form-item label="角色名">
                            <a-input v-decorator="['role_name']" allowClear />
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
                        <a-form-item label="角色id">
                            <a-input v-decorator="['role_id']" allowClear />
                        </a-form-item>
                    </a-col>
                    <a-col :md="2">
                        <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' }">
                            <a-button htmlType="submit" type="primary">查询</a-button>
                            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
                <a-row :gutter="24">

                </a-row>
            </a-form>
        </div>
    </a-card>
    <a-card :bordered="false">

        <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" :showPagination="false">
            <span slot="server_id" slot-scope="text">
                {{ text | serverFilter }}
            </span>
            <span slot="channel_id" slot-scope="text">
                {{ text | channelFilter }}
            </span>
        </mdd-table>
    </a-card>
</div>
</template>

<script>
import {
    MddTable,
} from '@/components'

import {
    mixin
} from '@/utils/mixin'

let that
export default {
    mixins: [mixin],
    name: 'game-player-roles',
    components: {
        MddTable
    },
    data() {
        return {
            queryParam: {},
            rule: {
                channel_id: {
                    rules: [{
                        required: false,
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
            columns: [{
                    title: '渠道',
                    key: '1',
                    dataIndex: 'channel_id',
                    scopedSlots: {
                        customRender: 'channel_id'
                    }
                },
                {
                    title: '服务器',
                    key: '2',
                    dataIndex: 'server_id',
                    scopedSlots: {
                        customRender: 'server_id'
                    }
                },
                {
                    title: '账号名',
                    key: '3',
                    dataIndex: 'account',
                },
                {
                    title: '账号ID',
                    key: '4',
                    dataIndex: 'account_id',
                },
                {
                    title: '角色名',
                    key: '5',
                    dataIndex: 'role_name',
                },
                {
                    title: '角色ID',
                    key: '6',
                    dataIndex: 'role_id',
                },
                {
                    title: '创建时间',
                    key: '7',
                    dataIndex: 'create_time',
                },
                {
                    title: '角色等级',
                    key: '8',
                    dataIndex: 'role_level',
                },
                {
                    title: '钻石',
                    key: '9',
                    dataIndex: 'diamonds',
                },
                {
                    title: '能量',
                    key: '10',
                    dataIndex: 'energy',
                },
                {
                    title: '积分',
                    key: '11',
                    dataIndex: 'integral',
                }
            ],
            loadData: parameter => {
                const params = {
                    // page: parameter.pageNo,
                    // page_size: parameter.pageSize
                }
                return this.$api.ROLE_ALL(Object.assign(params, this.queryParam))
                    .then(res => {
                        let filterData = []
                        let data = {}
                        if (res.Success) {
                            data = {
                                // pageSize: res.Data.page_info.page_size,
                                // pageNo: Number(res.Data.page_info.page),
                                // totalCount: res.Data.page_info.total,
                                data: res.Data.map((item, index) => Object.assign(item, {
                                    key: index
                                }))
                            }
                        } else {
                            this.$message.error(res.Error)
                            data = {
                                // pageSize: parameter.pageSize,
                                // pageNo: parameter.pageNo,
                                // totalCount: 10,
                                data: []
                            }
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
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
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
