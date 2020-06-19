<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" style="margin-bottom: 18px">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select placeholder="请选择" name="channel_id" v-decorator="['channel_id', { rules: [{required: true, message: '渠道id不能为空'}] }]">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="区服">
                            <a-select placeholder="请选择" name="server_id" v-decorator="['server_id', { rules: [{required: true, message: '服务器不能为空'}] }]">
                                <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="角色名">
                            <a-input v-model="queryParam.callNo" style="width: 100%" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="角色ID">
                            <a-input v-model="queryParam.id" placeholder="" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
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

export default {
    mixins: [mixin],
    name: 'giftUse',
    components: {
        MddTable,
    },
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
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)
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
