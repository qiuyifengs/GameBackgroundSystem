<template>
<div class="page-header-index-wide">
    <a-card :bordered="false" :body-style="{ 'paddingBottom': '0' }" class="mb18">
        <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="12">
                    <a-col :md="4" :sm="24">
                        <a-form-item label="渠道">
                            <a-select v-model="queryParam.channel_id" placeholder="请选择" name="channel_id">
                                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="7" :sm="24">
                        <a-form-item label="区服">
                            <a-row>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select v-model="queryParam.server_id_start" placeholder="请选择">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="2" style="text-align: center">至</a-col>
                                <a-col :md="11">
                                    <a-form-item>
                                        <a-select v-model="queryParam.server_id_end" placeholder="请选择" name="server_id_end">
                                            <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <span class="table-page-search-submitButtons">
                            <a-button type="primary" @click="handleSubmit">查询</a-button>
                            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </a-card>
    <a-row :gutter="24">
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总充值金额" :total="overviewData.total_recharge">
                <a-tooltip title="历史累计的充值总和" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <template slot="footer">
                    <span>今日充值总额</span>
                    <a-statistic :value="overviewData.today_recharge" />
                </template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总充值人数" :total="overviewData.total_recharge_count">
                <a-tooltip title="历史累计的充值人数总和（同1账号1个服算1次）" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <template slot="footer">
                    <span>今日充值人数</span>
                    <a-statistic :value="overviewData.today_recharge_count" />
                </template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总产出能量" :total="overviewData.total_energy_produce">
                <a-tooltip title="历史累计产出能量总和" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <template slot="footer">
                    <span>今日产出能量</span>
                    <a-statistic :value="overviewData.today_energy_produce" />
                </template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总消耗能量" :total="overviewData.total_energy_cost">
                <a-tooltip title="历史累计消耗能量总和" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <template slot="footer">
                    <span>今日消耗能量</span>
                    <a-statistic :value="overviewData.today_energy_cost" />
                </template>
            </chart-card>
        </a-col>
    </a-row>

    <a-row :gutter="24">
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="平均ARPU" :total="overviewData.total_arpu">
                <a-tooltip title="总充值金额/总充值人数" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <template slot="footer">
                    <span>今日ARPU</span>
                    <a-statistic :value="overviewData.today_arpu" />
                </template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总付费率" :total="overviewData.total_pay_lv">
                <a-tooltip title="总充值人数/总登陆人数" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <template slot="footer">
                    <span>今日付费率</span>
                    <a-statistic :value="overviewData.today_pay_lv" />
                </template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总登陆人数" :total="overviewData.total_login">
                <a-tooltip title="历史累计登陆人数总和（同1账号算1次）" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <template slot="footer">
                    <span>今日登陆人数</span>
                    <a-statistic :value="overviewData.today_login" />
                </template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总注册量" :total="overviewData.total_reg">
                <a-tooltip title="历史累计总注册量" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <template slot="footer">
                    <span>今日注册量</span>
                    <a-statistic :value="overviewData.today_reg" />
                </template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="历史最高在线" :total="overviewData.max_online">
                <template slot="footer">
                    <span>当前在线</span>
                    <a-statistic :value="overviewData.online" />
                </template>
            </chart-card>
        </a-col>
    </a-row>
    <!-- <a-card :bordered="false" style="margin-bottom: 24px">
        <a-row :gutter="24">
            <a-col :sm="12" :xs="24">
                <head-info title="当前在线" :content="String(overviewData.online)" :bordered="true" />
            </a-col>
            <a-col :sm="12" :xs="24">
                <head-info title="历史最高在线" :content="String(overviewData.max_online)" />
            </a-col>
        </a-row>
    </a-card> -->
</div>
</template>

<script>
import moment from 'moment'
import {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea
} from '@/components'
import HeadInfo from '@/components/tools/HeadInfo'

import {
    mixin
} from '@/utils/mixin'

export default {
    mixins: [mixin],
    name: 'index',
    components: {
        ChartCard,
    },
    data() {
        return {
            loading: true,
            queryParam: {},
            overviewData: {}
        }
    },
    created() {
        setTimeout(() => {
            this.loading = !this.loading
            this.handleSubmit()
        }, 1000)
    },
    methods: {
        handleSubmit() {
            this.$api.OVERVIEW_ALL(this.queryParam).then(res => {
                if (res.Success) {
                    this.overviewData = res.Data.list
                } else {
                    this.$message.error(res.Error)
                }
            })
        },
        handleReset() {
            this.queryParam = {}
        },
    }
}
</script>

<style lang="less" scoped>
.table-page-search-wrapper .ant-form-inline .ant-form-item {
    margin-bottom: 0
}

.extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
        display: inline-block;
        margin-right: 24px;

        a {
            margin-left: 24px;
        }
    }
}

.antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
}

.antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);

    /deep/ .ant-card-head {
        position: relative;
    }
}

.dashboard-analysis-iconGroup {
    i {
        margin-left: 16px;
        color: rgba(0, 0, 0, .45);
        cursor: pointer;
        transition: color .32s;
        color: black;
    }
}

.analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
}
</style>
