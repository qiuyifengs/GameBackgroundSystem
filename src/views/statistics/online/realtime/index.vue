<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
                <a-row :gutter="12">
                    <a-col :md="3">
                        <a-form-item label="全服实时在线">
                            <a-input v-model="total_online" disabled />
                        </a-form-item>
                    </a-col>
                    <a-col :md="4">
                        <a-form-item label="渠道">
                            <a-select v-decorator="['channel_id']" placeholder="请选择" name="channel_id">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="7">
                        <a-form-item label="区服">
                            <a-row>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select v-decorator="['server_id_start']" placeholder="请选择" name="server_id_start">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select v-decorator="['server_id_end']" placeholder="请选择" name="server_id_end">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
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
    <a-card :bordered="false">

        <mdd-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" showPagination="auto">
            <span slot="server_id" slot-scope="text">
                {{ text | serverFilter }}
            </span>
            <!-- <span slot="channel_id" slot-scope="text">
            {{ text | channelFilter }}
        </span> -->
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

let that
export default {
    mixins: [mixin],
    name: 'statistics-online-realtime',
    components: {
        MddTable,
    },
    data() {
        return {
            queryParam: {},
            columns: [{
                    title: 'ID',
                    dataIndex: 'id',
                },
                {
                    title: '平台在线人数',
                    dataIndex: 'platform_online'
                },
                {
                    title: '服务器ID',
                    dataIndex: 'server_id',
                    scopedSlots: {
                        customRender: 'server_id'
                    }
                },
                // {
                //     title: '渠道ID',
                //     dataIndex: 'channel_id',
                //     scopedSlots: {
                //         customRender: 'channel_id'
                //     }
                // }
            ],
            loadData: parameter => {
                const params = {
                    page: parameter.pageNo,
                    page_size: parameter.pageSize
                }
                return this.$api.ONLINE_REALTIME_ALL({
                        ...this.queryParam,
                        ...params
                    })
                    .then(res => {
                        let data = {
                            pageSize: 10,
                            pageNo: 1,
                            totalCount: 0,
                            data: []
                        }
                        if (res.Success) {
                            data = {
                                pageSize: res.Data.page_info.page_size,
                                pageNo: Number(res.Data.page_info.page),
                                totalCount: res.Data.page_info.total,
                                data: res.Data.list
                            }
                        } else {
                            this.$message.error(res.Error)
                        }
                        return data
                    })
            },
            form: this.$form.createForm(this),
            total_online: 0
        }
    },
    beforeCreate() {
        that = this
    },
    created() {
        this.$api.ONLINE_FULL_SERVICE_ALL().then(res => {
            if (res.Success) {
                this.total_online = res.Data.total_online
            } else {
                this.$message.error(res.Error)
            }
        })
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

<style scoped>
.table-page-search-wrapper .ant-form-inline .ant-form-item {
    margin: 0
}
</style>
