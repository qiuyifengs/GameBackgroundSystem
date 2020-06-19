import Vue from 'vue'

import d2Container from './d2-container'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))


// chart
import Bar from '@/components/Charts/Bar'
import ChartCard from '@/components/Charts/ChartCard'
import Liquid from '@/components/Charts/Liquid'
import MiniArea from '@/components/Charts/MiniArea'
import MiniSmoothArea from '@/components/Charts/MiniSmoothArea'
import MiniBar from '@/components/Charts/MiniBar'
import MiniProgress from '@/components/Charts/MiniProgress'
import Radar from '@/components/Charts/Radar'
import RankList from '@/components/Charts/RankList'
import TransferBar from '@/components/Charts/TransferBar'
import TagCloud from '@/components/Charts/TagCloud'
import TimelineChart from '@/components/Charts/TimelineChart'

import NumberInfo from '@/components/NumberInfo'
import Trend from '@/components/Trend'
import DescriptionList from '@/components/DescriptionList'
import MultiTab from '@/components/MultiTab'
import MddTable from '@/components/Table'
import Ellipsis from '@/components/Ellipsis'

const colors = [
  "#1890FF",
  "#13C2C2",
  "#2FC25B",
  "#FACC14",
  "#F04864",
  "#8543E0",
  "#3436C7",
  "#223273"
];

export {
  colors,
    Bar,
    ChartCard,
    Liquid,
    MiniArea,
    MiniSmoothArea,
    MiniBar,
    MiniProgress,
    Radar,
    TagCloud,
    TimelineChart,
    RankList,
    TransferBar,
    NumberInfo,
    Trend,
    MddTable,
    Ellipsis,
    DescriptionList,
    // 兼容写法，请勿继续使用
    DescriptionList as DetailList,
    MultiTab
  }