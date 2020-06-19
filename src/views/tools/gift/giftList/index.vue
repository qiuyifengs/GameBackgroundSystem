<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="礼包名称">
                            <a-input v-decorator="['name']" allowClear />
                        </a-form-item>
                    </a-col>
                    <a-col :md="7">
                        <a-form-item label="日期">
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
                        <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' } || {} ">
                            <a-button htmlType="submit" type="primary">查询</a-button>
                            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>

                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <create-add-gift-form ref="createAddGiftModal" />
    </a-card>

    <a-card :bordered="false" style="margin-top: 18px">
        <div class="table-operator" style="margin-bottom: 18px">
            <a-button type="primary" @click="$refs.createAddGiftModal.add()">添加礼包</a-button>
        </div>
        <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto" />

    </a-card>
</div>
</template>

<script>
import moment from 'moment'
import {
    MddTable
} from '@/components'

import CreateAddGiftForm from '../modules/CreateAddGiftForm'

import {
    mixin
} from '@/utils/mixin'

import {
    isNil
} from 'lodash'

export default {
    mixins: [mixin],
    name: 'tools-gift-giftList',
    components: {
        MddTable,
        CreateAddGiftForm
    },
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: 'ID',
                    dataIndex: 'record_month',
                },
                {
                    title: '礼包名称',
                    detaIndex: 'total_recharge'
                },
                {
                    title: '礼包价值',
                    dataIndex: 'total_reg1',
                },
                {
                    title: '道具',
                    dataIndex: 'total_reg2',
                },
                {
                    title: '生成时间',
                    dataIndex: 'total_reg3',
                },
                {
                    title: '修改时间',
                    dataIndex: 'total_reg4',
                },
                {
                    title: '操作',
                    dataIndex: 'total_login4',
                },
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
    }
}
</script>
