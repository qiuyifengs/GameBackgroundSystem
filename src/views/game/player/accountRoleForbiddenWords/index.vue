<template>

<a-card :bordered="false">
    <div class="table-page-search-wrapper">
        <a-form layout="inline">
            <a-row :gutter="48">
                <a-col :md="6" :sm="24">
                    <a-form-item label="渠道">
                        <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                            <a-select-option value="0">全部</a-select-option>
                            <a-select-option value="1">关闭</a-select-option>
                            <a-select-option value="2">运行中</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                    <a-form-item label="区服">
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

    <a-form :form="form">
        <a-form-item label="封禁列表" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea v-decorator="['switch_en_name', {rules: [{required: true, message: '请输入开关英文名称'}]}]" placeholder="Autosize height based on content lines" autosize />
        </a-form-item>
        <a-form-item label="封禁列表类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select style="width: 30%" v-decorator="['switch_cn_name', {rules: [{required: true, initialValue: 0, message: '请输入开关中文名称'}]}]" placeholder="指定时间(单位分钟)" default-value="0">
                <a-select-option value="0">1小时</a-select-option>
                <a-select-option value="1">2小时</a-select-option>
                <a-select-option value="2">8小时</a-select-option>
                <a-select-option value="3">1天</a-select-option>
                <a-select-option value="4">3天</a-select-option>
                <a-select-option value="5">1周</a-select-option>
                <a-select-option value="6">30天</a-select-option>
                <a-select-option value="7">永久</a-select-option>
            </a-select>
            <a-input style="width: 20%; margin-left: 12px"/>
        </a-form-item>
        <a-form-item label="禁言原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea v-decorator="['switch_en_name', {rules: [{required: true, message: '请输入开关英文名称'}]}]" placeholder="Autosize height based on content lines" autosize />
        </a-form-item>
        <a-form-item label="操作" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-button type="primary">提交</a-button>
        </a-form-item>
    </a-form>
 
</a-card>
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
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 7
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 13
                }
            },
            form: this.$form.createForm(this),
            mdl: {},
            // 高级搜索 展开/关闭
            advanced: false,
            // 查询参数
            queryParam: {},
            // 表头
            columns: [{
                    title: '渠道',
                    dataIndex: 'level',
                },
                {
                    title: '服务器序号',
                    dataIndex: 'total1',
                    sorter: true,
                },
                {
                    title: '账号/账号ID',
                    dataIndex: 'total2',
                    sorter: true,
                },
                {
                    title: '角色名/角色ID',
                    dataIndex: 'total3',
                    sorter: true,
                },
                {
                    title: '禁言时间/禁言人',
                    dataIndex: 'total4',
                    sorter: true,
                },
                {
                    title: '解禁时间/解禁人',
                    dataIndex: 'total5',
                    sorter: true,
                },
                {
                    title: '封号时长',
                    dataIndex: 'total6',
                    sorter: true,
                },
                {
                    title: '封号原因',
                    dataIndex: 'total7',
                    sorter: true,
                },
                {
                    title: '操作',
                    dataIndex: 'total8'
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
