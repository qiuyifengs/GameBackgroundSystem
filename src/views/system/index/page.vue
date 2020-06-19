<template>
<div class="page-header-index-wide">
    <a-card :bordered="false" style="margin-bottom: 24px">
        <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="48">
                    <a-col :md="6" :sm="24">
                        <a-form-item label="渠道">
                            <a-select placeholder="请选择" default-value="0">
                                <a-select-option value="0">全部</a-select-option>
                                <a-select-option value="1">关闭</a-select-option>
                                <a-select-option value="2">运行中</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="10" :sm="24">
                        <a-form-item label="区服">
                            <a-row>
                                <a-col :md="11" :sm="11">
                                    <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                                        <a-select-option value="0">全部</a-select-option>
                                        <a-select-option value="1">关闭</a-select-option>
                                        <a-select-option value="2">运行中</a-select-option>
                                    </a-select>
                                </a-col>
                                <a-col :md="2" :sm="2" style="text-align: center">至</a-col>
                                <a-col :md="11" :sm="11">
                                    <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                                        <a-select-option value="0">全部</a-select-option>
                                        <a-select-option value="1">关闭</a-select-option>
                                        <a-select-option value="2">运行中</a-select-option>
                                    </a-select>
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <span class="table-page-search-submitButtons">
                        <a-button type="primary">查询</a-button>
                        <a-button style="margin-left: 8px">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
        </a-form>
      </div>
    </a-card>

    <a-row :gutter="24">
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总充值金额" total="￥126,560">
                <a-tooltip title="历史累计的充值总和" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <template slot="footer">今日均销售额<span>￥ 234.56</span></template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总充值人数" :total="8846 | NumberFormat">
                <a-tooltip title="历史累计的充值人数总和（同1账号1个服算1次）" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                    <trend flag="up" style="margin-right: 16px;">
                        <span slot="term">周同比</span>
                        12%
                    </trend>
                    <trend flag="down">
                        <span slot="term">日同比</span>
                        11%
                    </trend>
                </div>
                <template slot="footer">今日日访问量<span> {{ '1234' | NumberFormat }}</span> </template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总产出秘籍" :total="6560 | NumberFormat">
                <a-tooltip title="历史累计产出秘籍总和" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                    <trend flag="up" style="margin-right: 16px;">
                        <span slot="term">周同比</span>
                        12%
                    </trend>
                    <trend flag="down">
                        <span slot="term">日同比</span>
                        11%
                    </trend>
                </div>
                <template slot="footer">今日产出秘籍</template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总消耗秘籍" total="78%">
                <a-tooltip title="历史累计消耗秘籍总和" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                    <trend flag="up" style="margin-right: 16px;">
                        <span slot="term">周同比</span>
                        12%
                    </trend>
                    <trend flag="down">
                        <span slot="term">日同比</span>
                        11%
                    </trend>
                </div>
                <template slot="footer">今日消耗秘籍</template>
            </chart-card>
        </a-col>
    </a-row>

    <a-row :gutter="24">
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="平均ARPU" total="￥126,560">
                <a-tooltip title="总充值金额/总充值人数" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                    <trend flag="up" style="margin-right: 16px;">
                        <span slot="term">周同比</span>
                        12%
                    </trend>
                    <trend flag="down">
                        <span slot="term">日同比</span>
                        11%
                    </trend>
                </div>
                <template slot="footer">今日ARPU<span>￥ 234.56</span></template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总产出金币" total="￥126,560">
                <a-tooltip title="历史累计产出金币总和" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                    <trend flag="up" style="margin-right: 16px;">
                        <span slot="term">周同比</span>
                        12%
                    </trend>
                    <trend flag="down">
                        <span slot="term">日同比</span>
                        11%
                    </trend>
                </div>
                <template slot="footer">今日产出金币<span>￥ 234.56</span></template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总登陆人数" total="￥126,560">
                <a-tooltip title="历史累计登陆人数总和（同1账号算1次）" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                    <trend flag="up" style="margin-right: 16px;">
                        <span slot="term">周同比</span>
                        12%
                    </trend>
                    <trend flag="down">
                        <span slot="term">日同比</span>
                        11%
                    </trend>
                </div>
                <template slot="footer">今日登陆人数<span>￥ 234.56</span></template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总消耗金币" total="￥126,560">
                <a-tooltip title="历史累计消耗金币总和" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                    <trend flag="up" style="margin-right: 16px;">
                        <span slot="term">周同比</span>
                        12%
                    </trend>
                    <trend flag="down">
                        <span slot="term">日同比</span>
                        11%
                    </trend>
                </div>
                <template slot="footer">今日消耗金币<span>￥ 234.56</span></template>
            </chart-card>
        </a-col>
    
    </a-row>

    <a-row :gutter="24">
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总付费率" total="￥126,560">
                <a-tooltip title="总充值人数/总登陆人数" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <mini-progress color="rgb(19, 194, 194)" :target="80" :percentage="78" height="8px" />
                <template slot="footer">今日付费率<span>￥ 234.56</span></template>
            </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总注册量" total="￥126,560">
                <a-tooltip title="历史累计总注册量" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                    <trend flag="up" style="margin-right: 16px;">
                        <span slot="term">周同比</span>
                        12%
                    </trend>
                    <trend flag="down">
                        <span slot="term">日同比</span>
                        11%
                    </trend>
                </div>
                <template slot="footer">今日注册量<span>￥ 234.56</span></template>
            </chart-card>
        </a-col>
    
    </a-row>
    
    <a-card :bordered="false" style="margin-bottom: 24px">
      <a-row>
        <a-col :sm="12" :xs="24">
          <head-info title="当前在线" content="1003人" :bordered="true"/>
        </a-col>
        <a-col :sm="12" :xs="24">
          <head-info title="历史最高在线" content="2334343人"/>
        </a-col>
      </a-row>
    </a-card>
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

const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
    barData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200
    })
    barData2.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200
    })
}

const rankList = []
for (let i = 0; i < 7; i++) {
    rankList.push({
        name: '白鹭岛 ' + (i + 1) + ' 号店',
        total: 1234.56 - i * 100
    })
}

const searchUserData = []
for (let i = 0; i < 7; i++) {
    searchUserData.push({
        x: moment().add(i, 'days').format('YYYY-MM-DD'),
        y: Math.ceil(Math.random() * 10)
    })
}
const searchUserScale = [{
        dataKey: 'x',
        alias: '时间'
    },
    {
        dataKey: 'y',
        alias: '用户数',
        min: 0,
        max: 10
    }
]

const searchTableColumns = [{
        dataIndex: 'index',
        title: '排名',
        width: 90
    },
    {
        dataIndex: 'keyword',
        title: '搜索关键词'
    },
    {
        dataIndex: 'count',
        title: '用户数'
    },
    {
        dataIndex: 'range',
        title: '周涨幅',
        align: 'right',
        sorter: (a, b) => a.range - b.range,
        scopedSlots: {
            customRender: 'range'
        }
    }
]
const searchData = []
for (let i = 0; i < 50; i += 1) {
    searchData.push({
        index: i + 1,
        keyword: `搜索关键词-${i}`,
        count: Math.floor(Math.random() * 1000),
        range: Math.floor(Math.random() * 100),
        status: Math.floor((Math.random() * 10) % 2)
    })
}

const DataSet = require('@antv/data-set')

const sourceData = [{
        item: '家用电器',
        count: 32.2
    },
    {
        item: '食用酒水',
        count: 21
    },
    {
        item: '个护健康',
        count: 17
    },
    {
        item: '服饰箱包',
        count: 13
    },
    {
        item: '母婴产品',
        count: 9
    },
    {
        item: '其他',
        count: 7.8
    }
]

const pieScale = [{
    dataKey: 'percent',
    min: 0,
    formatter: '.0%'
}]

const dv = new DataSet.View().source(sourceData)
dv.transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
})
const pieData = dv.rows

export default {
    name: 'index',
    components: {
        ChartCard,
        MiniArea,
        MiniBar,
        MiniProgress,
        RankList,
        Bar,
        Trend,
        NumberInfo,
        MiniSmoothArea,
        HeadInfo
    },
    data() {
        return {
            loading: true,
            rankList,
            // 查询参数
            queryParam: {},

            // 搜索用户数
            searchUserData,
            searchUserScale,
            searchTableColumns,
            searchData,

            barData,
            barData2,

            //
            pieScale,
            pieData,
            sourceData,
            pieStyle: {
                stroke: '#fff',
                lineWidth: 1
            }
        }
    },
    created() {
        setTimeout(() => {
            this.loading = !this.loading
        }, 1000)
    }
}
</script>

<style lang="less" scoped>
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
