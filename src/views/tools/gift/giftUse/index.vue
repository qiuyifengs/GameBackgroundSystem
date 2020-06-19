<template>
<a-card :bordered="false">
    <div class="table-page-search-wrapper">
        <a-form @submit="handleSubmit" layout="inline" :form="form">
            <a-row :gutter="48">
                <a-col :md="7" :sm="24">
                    <a-form-item label="渠道">
                        <a-select v-decorator="['channel_id']" placeholder="请选择" name="channel_id">
                            <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :md="7" :sm="24">
                    <a-form-item label="区服">
                        <a-select placeholder="请选择区服" v-decorator="['server_id']" name="server_id">
                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :md="7" :sm="24">
                    <a-form-item label="角色名">
                        <a-input-number v-decorator="['role_name']" style="width: 100%" />
                    </a-form-item>
                </a-col>
                <a-col :md="7" :sm="24">
                    <a-form-item label="角色ID">
                        <a-input v-decorator="['role_id']" />
                    </a-form-item>
                </a-col>
                <a-col :md="7" :sm="24">
                    <span class="table-page-search-submitButtons" :style="advanced && { float: 'left', overflow: 'hidden' } || {} ">
                        <a-button htmlType="submit" type="primary">查询</a-button>
                        <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                    </span>
                </a-col>
            </a-row>
        </a-form>
    </div>

    <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto" />
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
    components: {
        MddTable,
    },
    name: 'tools-gift-giftCodeUse',
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: '角色名/角色ID',
                    dataIndex: 'record_month',
                },
                {
                    title: '礼包名称',
                    detaIndex: 'total_recharge'
                },
                {
                    title: '使用时间',
                    dataIndex: 'total_reg',
                    sorter: true,
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
    methods: {
        handleOk() {
            this.$refs.table.refresh()
        },
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', this.values)
                    this.queryParam = values
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
