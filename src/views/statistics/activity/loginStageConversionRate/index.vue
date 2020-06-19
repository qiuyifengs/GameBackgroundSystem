<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select placeholder="请选择" name="channel_id" v-decorator="['channel_id', rule.channel_id]">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="7">
                        <a-form-item label="区服">
                            <a-row>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select placeholder="请选择" name="server_id_start" v-decorator="['server_id_start', rule.server_id_start]">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select placeholder="请选择" name="server_id_end" v-decorator="['server_id_end', rule.server_id_end]">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :md="7">
                        <a-form-item label="日期">
                            <a-row>
                                <a-col :md="11">
                                    <a-date-picker v-decorator="['start_date']" style="width: 100%" />
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-date-picker v-decorator="['end_date']" style="width: 100%" />
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' }">
                            <a-button htmlType="submit" type="primary">查询</a-button>
                            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </a-card>
    <a-card :bordered="false" style="width:100%" :tabList="tabListNoTitle" :activeTabKey="noTitleKey" @tabChange="key => onTabChange(key, 'noTitleKey')">
        <p v-if="noTitleKey === '1'">
            <mdd-table ref="table" size="default" rowKey="key" :columns="columns1" :data="loadData" showPagination="auto">
            </mdd-table>
        </p>
        <p v-if="noTitleKey === '2'">
            <mdd-table ref="table" size="default" rowKey="key" :columns="columns1" :data="loadData" showPagination="auto">
            </mdd-table>
        </p>
        <p v-if="noTitleKey === '3'">
            <mdd-table ref="table" size="default" rowKey="key" :columns="columns1" :data="loadData" showPagination="auto">
            </mdd-table>
        </p>
        <p v-if="noTitleKey === '4'">
            <mdd-table ref="table" size="default" rowKey="key" :columns="columns1" :data="loadData" showPagination="auto">
            </mdd-table>
        </p>
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
    name: 'statistics-activity-loginStageConversionRate',
    components: {
        MddTable,
    },
    data() {
        return {
            tabListNoTitle: [{
                    key: '1',
                    tab: 'PC网页端'
                },
                {
                    key: '2',
                    tab: '移动H5端'
                },
                {
                    key: '3',
                    tab: '移动微端(ios)'
                },
                {
                    key: '4',
                    tab: '移动微端(安卓)'
                }
            ],
            noTitleKey: '1',
            queryParam: {},
            rule: {
                channel_id: {
                    rules: [{
                        required: true,
                        message: '渠道id不能为空'
                    }]
                },
                server_id_start: {
                    rules: [{
                        required: true,
                        message: '起始服务器id不能为空'
                    }]
                },
                server_id_end: {
                    rules: [{
                        required: true,
                        message: '结束服务器id不能为空'
                    }]
                }
            },
            columns1: [{
                    title: '注册量',
                    dataIndex: 'level1',
                },
                {
                    title: '创角界面',
                    dataIndex: 'total2',
                    sorter: true,
                },
                {
                    title: '创建角色',
                    dataIndex: 'total1',
                    sorter: true,
                },
                {
                    title: '开始游戏',
                    dataIndex: 'total2',
                    sorter: true,
                },
                {
                    title: '进入游戏',
                    dataIndex: 'total3',
                    sorter: true,
                }
            ],
            columns2: [{
                    title: '下载游戏',
                    dataIndex: 'level4',
                },
                {
                    title: '安装游戏',
                    dataIndex: 'total5',
                    sorter: true,
                },
                {
                    title: '打开游戏',
                    dataIndex: 'total6',
                    sorter: true,
                },
                {
                    title: '注册界面',
                    dataIndex: 'total7',
                    sorter: true,
                },
                {
                    title: '注册量',
                    dataIndex: 'total8',
                    sorter: true,
                },
                {
                    title: '创角界面',
                    dataIndex: 'total9',
                    sorter: true,
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
        onTabChange(key, type) {
            console.log(key, type);
            this[type] = key;
        },
        handleReset() {
            this.form.resetFields();
            this.queryParam = {}
        },
    }
}
</script>
<style scoped>
.table-page-search-wrapper .ant-form-inline .ant-form-item {
    margin: 0
}
</style>
