<template>
<div>
<a-card :bordered="false">
<div class="table-page-search-wrapper">
        <a-form layout="inline">
            <a-row :gutter="48">
                <a-col :md="8" :sm="24">
                    <a-form-item label="渠道">
                        <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                            <a-select-option value="0">全部</a-select-option>
                            <a-select-option value="1">关闭</a-select-option>
                            <a-select-option value="2">运行中</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                    <a-form-item label="区服">
                        <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                            <a-select-option value="0">全部</a-select-option>
                            <a-select-option value="1">关闭</a-select-option>
                            <a-select-option value="2">运行中</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <template v-if="advanced">
                    <a-col :md="8" :sm="11">
                        <a-form-item label="开服时间">
                            <a-range-picker />
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="11">
                        <a-form-item label="来源">
                            <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                                <a-select-option value="0">全部</a-select-option>
                                <a-select-option value="1">PC网页端</a-select-option>
                                <a-select-option value="2">移动H5端</a-select-option>
                                <a-select-option value="3">移动微端（IOS）</a-select-option>
                                <a-select-option value="4">移动微端（安卓）</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </template>
                <a-col :md="!advanced && 6 || 23" :sm="24">
                    <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                        <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                        <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                        <a @click="toggleAdvanced" style="margin-left: 8px">
                            {{ advanced ? '收起' : '展开' }}
                            <a-icon :type="advanced ? 'up' : 'down'" />
                        </a>
                    </span>
                </a-col>
            </a-row>
        </a-form>
    </div>
</a-card>
<a-card :bordered="false" style="margin: 24px">
    <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" :alert="options.alert" :rowSelection="options.rowSelection" showPagination="auto">
        
    </mdd-table>
</a-card>
</div>
</template>

<script>
import moment from 'moment'
import {
    MddTable,
    Ellipsis
} from '@/components'
import { get_stat_first_pay_level } from '@/api/statistics'

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
            advanced: true,
            // 查询参数
            queryParam: {},
            // 表头
            columns: [{
                    title: '日期',
                    dataIndex: 'level',
                    sorter: true,
                },
                {
                    title: '当天注册',
                    dataIndex: 'total1',
                },
                {
                    title: '次日留存',
                    dataIndex: 'total2',
                },
                {
                    title: '3日留存',
                    dataIndex: 'total3',
                },
                {
                    title: '4日留存',
                    dataIndex: 'total4',
                    sorter: true,
                },
                {
                    title: '5日留存',
                    dataIndex: 'total5',
                },
                {
                    title: '6日留存',
                    dataIndex: 'total6',
                },
                {
                    title: '7日留存',
                    dataIndex: 'total7',
                },
                {
                    title: '10日留存',
                    dataIndex: 'total8',
                },
                {
                    title: '15日留存',
                    dataIndex: 'total9',
                },
                {
                    title: '30日留存',
                    dataIndex: 'total10',
                }
            ],
            // 加载数据方法 必须为 Promise 对象
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
                        totalCount: 0,
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
