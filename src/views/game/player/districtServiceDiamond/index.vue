<template>
<div>
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
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
                        <a-form-item label="区服">
                            <a-select placeholder="请选择" name="server_id" v-decorator="['server_id', rule.server_id ]">
                                <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="3">
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

        <mdd-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" :showPagination="false">
            <span slot="server_id" slot-scope="text">
                {{ text | serverFilter }}
            </span>
        </mdd-table>
    </a-card>
</div>
</template>

<script>
import {
    MddTable,
} from '@/components'

import {
    mixin
} from '@/utils/mixin'

let that
export default {
    mixins: [mixin],
    name: 'game-player-districtServiceDiamond',
    components: {
        MddTable,
    },
    data() {
        return {
            rule: {
                server_id: {
                    rules: [{
                        required: true,
                        message: '请选择服务器'
                    }]
                },
            },
            queryParam: {},
            columns: [{
                    title: '区服',
                    dataIndex: 'server_id',
                    scopedSlots: {
                        customRender: 'server_id'
                    }
                },
                {
                    title: '剩余钻石',
                    dataIndex: 'diamonds',
                    key: 'diamonds'
                }
            ],
            loadData: parameter => {
                const params = {
                    // page: parameter.pageNo,
                    // page_size: parameter.pageSize
                }
                return this.$api.PLAYER_SERVER_DIAMONDS_ALL(Object.assign(params, this.queryParam))
                    .then(res => {
                        let data = {}
                        if (res.Success) {
                            data = {
                                data: res.Data.map((item, index) => Object.assign(item, {
                                    key: index
                                }))
                            }
                        } else {
                            this.$message.error(res.Error)
                            data = {
                                data: []
                            }
                        }
                        return data
                    })
            },
            form: this.$form.createForm(this),
        }
    },
    beforeCreate() {
        that = this
    },
    filters: {
        serverFilter(type) {
            return that.serverList.filter(item => item.server_id === type)[0].server_name
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
                    this.queryParam = values
                    this.$refs.table.refresh(true)
                }
            })
        },
        handleReset() {
            this.form.resetFields();
            this.queryParam = {}
        }
    }
}
</script>
