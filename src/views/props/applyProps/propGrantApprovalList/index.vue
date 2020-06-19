<template>

<a-card :bordered="false">
    <div class="table-page-search-wrapper">
        <a-form layout="inline">
            <a-row :gutter="48">
                <a-col :md="6" :sm="24">
                    <a-form-item label="状态">
                        <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                            <a-select-option value="0">全部</a-select-option>
                            <a-select-option value="1">关闭</a-select-option>
                            <a-select-option value="2">运行中</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :md="4" :sm="24">
                    <span class="table-page-search-submitButtons" :style="advanced && { float: 'left', overflow: 'hidden' } || {} ">
                        <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                        <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                    </span>
                </a-col>
            </a-row>
        </a-form>
    </div>

    <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" :alert="options.alert" :rowSelection="options.rowSelection" showPagination="auto">
        <span slot="action" slot-scope="text, record">
            <template>
                <a @click="handleEdit(record)">配置</a>
                <a-divider type="vertical" />
                <a @click="handleSub(record)">订阅报警</a>
            </template>
        </span>
    </mdd-table>
</a-card>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
    Ellipsis
} from '@/components'
import { get_stat_monthly_data } from '@/api/statistics'

const statusMap = {
    0: {
        status: 'default',
        text: '关闭'
    },
    1: {
        status: 'processing',
        text: '运行中'
    },
    2: {
        status: 'success',
        text: '已上线'
    },
    3: {
        status: 'error',
        text: '异常'
    }
}

export default {
    name: 'TableList',
    components: {
        MddTable,
        Ellipsis
    },
    data() {
        return {
            mdl: {},
            // 高级搜索 展开/关闭
            advanced: false,
            // 查询参数
            queryParam: {},
            // 表头
            columns: [{
                    title: '申请日期',
                    dataIndex: 'record_month',
                },
                {
                    title: '申请人',
                    detaIndex: 'total_recharge'
                },
                {
                    title: '渠道',
                    dataIndex: 'total_reg',
                    sorter: true,
                },
                {
                    title: '服务器',
                    dataIndex: 'total_login',
                },
                {
                    title: '账号/角色名',
                    dataIndex: 'total_recharge_people',
                    sorter: true
                },
                {
                    title: '能量数量（万）',
                    dataIndex: 'pay_lv',
                    sorter: true
                },
                {
                    title: '申请备注',
                    dataIndex: 'arpu',
                    sorter: true
                },
                {
                    title: '操作',
                    dataIndex: 'max_online',
                    sorter: true
                }
            ],
            // 加载数据方法 必须为 Promise 对象
            loadData: parameter => {
                console.log('loadData.parameter', parameter)
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
            selectedRowKeys: [],
            selectedRows: [],

            // custom table alert & rowSelection
            options: {
                alert: {
                    show: true,
                    clear: () => {
                        this.selectedRowKeys = []
                    }
                },
                rowSelection: {
                    selectedRowKeys: this.selectedRowKeys,
                    onChange: this.onSelectChange
                }
            },
            optionAlertShow: false
        }
    },
    filters: {
        statusFilter(type) {
            return statusMap[type].text
        },
        statusTypeFilter(type) {
            return statusMap[type].status
        }
    },
    created() {
        this.tableOption()
        // getRoleList({
        //     t: new Date()
        // })
    },
    methods: {
        tableOption() {
            if (!this.optionAlertShow) {
                this.options = {
                    alert: {
                        show: true,
                        clear: () => {
                            this.selectedRowKeys = []
                        }
                    },
                    rowSelection: {
                        selectedRowKeys: this.selectedRowKeys,
                        onChange: this.onSelectChange,
                        getCheckboxProps: record => ({
                            props: {
                                disabled: record.no === 'No 2', // Column configuration not to be checked
                                name: record.no
                            }
                        })
                    }
                }
                this.optionAlertShow = true
            } else {
                this.options = {
                    alert: false,
                    rowSelection: null
                }
                this.optionAlertShow = false
            }
        },

        handleEdit(record) {
            console.log(record)
            this.$refs.modal.edit(record)
        },
        handleSub(record) {
            if (record.status !== 0) {
                this.$message.info(`${record.no} 订阅成功`)
            } else {
                this.$message.error(`${record.no} 订阅失败，规则已关闭`)
            }
        },
        handleOk() {
            this.$refs.table.refresh()
        },
        onSelectChange(selectedRowKeys, selectedRows) {
            this.selectedRowKeys = selectedRowKeys
            this.selectedRows = selectedRows
        },
        toggleAdvanced() {
            this.advanced = !this.advanced
        },
        resetSearchForm() {
            this.queryParam = {
                date: moment(new Date())
            }
        }
    }
}
</script>
