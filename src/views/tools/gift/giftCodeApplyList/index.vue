<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" style="margin-bottom: 18px">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select v-decorator="['channel_id']" placeholder="请选择" name="channel_id">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="礼包类型">
                            <a-select v-decorator="['type']" placeholder="请选择">
                                <a-select-option value="0">新手礼包</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="状态">
                            <a-select v-decorator="['status']" placeholder="请选择">
                                <a-select-option value="0">申请失败</a-select-option>
                                <a-select-option value="1">申请成功</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' } || {} ">
                            <a-button htmlType="submit" type="primary">查询</a-button>
                            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                            <a-button style="margin-left: 8px" @click="$refs.createModal.add()">申请礼包码</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>

        <create-apply-gift-form ref="createModal" @ok="handleOk" />
    </a-card>
    <a-card :bordered="false">
        <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto" />
    </a-card>
</div>
</template>

<script>
import moment from 'moment'
import {
    MddTable
} from '@/components'

import CreateApplyGiftForm from '../modules/CreateApplyGiftForm'

import {
    mixin
} from '@/utils/mixin'

export default {
    mixins: [mixin],
    name: 'tools-gift-giftCodeApplyList',
    components: {
        MddTable,
        CreateApplyGiftForm,
    },
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: '渠道',
                    dataIndex: 'record_month',
                },
                {
                    title: '礼包类型',
                    detaIndex: 'total_recharge'
                },
                {
                    title: '数量',
                    dataIndex: 'total_reg1',
                },
                {
                    title: '玩家使用上限',
                    dataIndex: 'total_reg2',
                },
                {
                    title: '开始时间',
                    dataIndex: 'total_reg3',
                },
                {
                    title: '结束时间',
                    dataIndex: 'total_reg4',
                },
                {
                    title: '申请人',
                    dataIndex: 'total_login4',
                },
                {
                    title: '申请时间',
                    dataIndex: 'total_recharge_people',
                },
                {
                    title: '生成时间',
                    dataIndex: 'pay_lv',
                },
                {
                    title: '备注',
                    dataIndex: 'arpu',
                },
                {
                    title: '状态',
                    dataIndex: 'arpu2',
                },
                {
                    title: '操作',
                    dataIndex: 'max_online',
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
        handleEdit(record) {
            console.log(record)
            this.$refs.modal.edit(record)
        },
        handleOk() {
            this.$refs.table.refresh()
        },
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
    }
}
</script>
