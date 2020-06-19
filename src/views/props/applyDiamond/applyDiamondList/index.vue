<template>
<a-card :bordered="false">
    <div class="table-page-search-wrapper">
        <a-form @submit="handleSubmit" layout="inline" :form="form">
            <a-row :gutter="12">
                <a-col :md="4" :sm="24">
                    <a-form-item label="状态">
                        <a-select v-decorator="['status']" placeholder="请选择">
                            <a-select-option v-for="(item, index) in statusArr" :key="index" :value="item.id">{{ item.status }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
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
                <a-col :md="7">
                    <a-form-item label="日期">
                        <a-row>
                            <a-col :md="11">
                                <a-date-picker v-decorator="['start_date']" format="YYYY-MM-DD" placeholder="开始日期" style="width: 100%" />
                            </a-col>
                            <a-col :md="2" style="text-align: center">至</a-col>
                            <a-col :md="11">
                                <a-date-picker v-decorator="['end_date']" format="YYYY-MM-DD" placeholder="结束日期" style="width: 100%" />
                            </a-col>
                        </a-row>
                    </a-form-item>
                </a-col>

            </a-row>
            <a-row :gutter="24">
                <a-col :md="4">
                    <a-form-item label="账号">
                        <a-input v-decorator="['account']" />
                    </a-form-item>
                </a-col>
                <a-col :md="4">
                    <a-form-item label="角色名">
                        <a-input v-decorator="['role_name']" />
                    </a-form-item>
                </a-col>

                <a-col :md="4" :sm="24">
                    <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' }">
                        <a-button htmlType="submit" type="primary">查询</a-button>
                        <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                    </span>
                </a-col>
            </a-row>
        </a-form>
    </div>

    <div class="table-operator" style="margin-bottom: 24px">
        <a-button type="primary" icon="plus" @click="$refs.createModal.add()">钻石申请</a-button>
    </div>
    <create-diamond-apply-form ref="createModal" @ok="handleOk" />

    <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto">
        <span slot="server_id" slot-scope="text">
            {{ text | serverFilter }}
        </span>
        <span slot="channel_id" slot-scope="text">
            {{ text | channelFilter }}
        </span>
    </mdd-table>
</a-card>
</template>

<script>
import {
    MddTable,
} from '@/components'

import CreateDiamondApplyForm from '../modules/CreateDiamondApplyForm'

const statusMap = [{
    id: 0,
    status: '审核中'
}, {
    id: 1,
    status: '审批-发放成功'
}, {
    id: 2,
    status: '审批-发放失败'
}, {
    id: 3,
    status: '审批不通过'
}, {
    id: 4,
    status: '撤销申请'
}]

let that

import {
    mixin
} from '@/utils/mixin'

export default {
    mixins: [mixin],
    name: 'props-applyDiamond-applyDiamondList',
    components: {
        MddTable,
        CreateDiamondApplyForm
    },
    data() {
        return {
            form: this.$form.createForm(this),
            statusArr: statusMap,
            queryParam: {},
            columns: [{
                    title: '申请日期',
                    dataIndex: 'create_date',
                },
                {
                    title: '申请人',
                    detaIndex: 'create_user_name'
                },
                {
                    title: '渠道',
                    dataIndex: 'channel_id',
                    scopedSlots: {
                        customRender: 'channel_id'
                    }
                },
                {
                    title: '服务器',
                    dataIndex: 'server_id',
                    scopedSlots: {
                        customRender: 'server_id'
                    }
                },
                {
                    title: '账号',
                    dataIndex: 'account',
                },
                {
                    title: '账号ID',
                    dataIndex: 'account_id',
                },
                {
                    title: '角色名',
                    dataIndex: 'role_name',
                },
                {
                    title: '角色ID',
                    dataIndex: 'role_id',
                },
                {
                    title: '道具ID',
                    dataIndex: 'item_id',
                },
                {
                    title: '钻石数',
                    dataIndex: 'diamonds_count',
                },
                {
                    title: '申请原因',
                    dataIndex: 'reason',
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                },
                {
                    title: '审批人',
                    dataIndex: 'auth_user_name',
                },
                {
                    title: '审批时间',
                    dataIndex: 'auth_date',
                },
                {
                    title: '申请备注',
                    dataIndex: 'remarks',
                }
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return this.$api.APPLY_DIAMOND_ALL(Object.assign(params, this.queryParam))
                    .then(res => {
                        let data = {}
                        if (res.Success) {
                            data = {
                                pageSize: res.Data.page_info.page_size,
                                pageNo: Number(res.Data.page_info.page),
                                totalCount: res.Data.page_info.total,
                                data: res.Data.list
                            }
                        } else {
                            this.$message.error(res.Error)
                            data = {
                                pageSize: parameter.pageSize,
                                pageNo: parameter.pageNo,
                                totalCount: 10,
                                data: []
                            }
                        }
                        return data
                    })
            },
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
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    const obj = this.form.getFieldsValue()
                    let params = {}
                    if (obj.start_date !== undefined) {
                        params.start_date = this.form.getFieldsValue().start_date.format('YYYY-MM-DD')
                    }
                    if (obj.end_date !== undefined) {
                        params.end_date = this.form.getFieldsValue().end_date.format('YYYY-MM-DD')
                    }
                    this.queryParam = Object.assign(values, params)
                    console.log('Received values of form: ', this.queryParam)

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
