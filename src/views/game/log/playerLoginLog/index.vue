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
                    <a-col :md="4">
                        <a-form-item label="区服">
                            <a-select showSearch optionFilterProp="children" :filterOption="filterOption" v-decorator="['server_id']" placeholder="请选择" name="server_id">
                                <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="7">
                        <a-form-item label="日期">
                            <a-row>
                                <a-col :md="11">
                                    <a-date-picker v-decorator="['start_date']" style="width: 100%" placeholder="开始日期" />
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-date-picker v-decorator="['end_date']" style="width: 100%" placeholder="结束日期" />
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="账号">
                            <a-input v-decorator="['account']" allowClear />
                        </a-form-item>
                    </a-col>
                    <a-col :md="4 ">
                        <a-form-item label="角色名">
                            <a-input v-decorator="['role_name']" allowClear />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="12">

                    <a-col :md="3">
                        <a-form-item label="IP">
                            <a-input v-decorator="['ip']" allowClear />
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' } || {} ">
                            <a-button htmlType="submit" type="primary">查询</a-button>
                            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </a-card>
    <a-card :bordered="false">
        <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto">
            <span slot="server_id" slot-scope="text">
                {{ text | serverFilter }}
            </span>
        </mdd-table>
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

let that
export default {
    mixins: [mixin],
    name: 'game-log-playerLoginLog',
    components: {
        MddTable,
    },
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: '服务器ID',
                    dataIndex: 'server_id',
                    scopedSlots: {
                        customRender: 'server_id'
                    }
                },
                {
                    title: '渠道名称',
                    dataIndex: 'channel_name',
                },
                {
                    title: '登陆账号',
                    dataIndex: 'account',
                },
                {
                    title: '登陆角色名',
                    dataIndex: 'role_name',
                },
                {
                    title: '登陆IP',
                    dataIndex: 'ip',
                },
                {
                    title: '登陆时间',
                    dataIndex: 'record_date',
                    key: 'record_date'
                }
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return this.$api.LOG_LOGIN_ALL({
                        ...this.queryParam,
                        ...params
                    })
                    .then(res => {
                        let data = {
                            pageSize: parameter.pageSize,
                            pageNo: parameter.pageNo,
                            totalCount: 0,
                            data: []
                        }
                        if (res.Success) {
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
    beforeCreate() {
        that = this
    },
    filters: {
        serverFilter(type) {
            return that.serverList.filter(item => item.server_id === type)[0].server_name
        }
    },
    methods: {
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            )
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
                    console.log('Received values of form: ', this.queryParam)
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
