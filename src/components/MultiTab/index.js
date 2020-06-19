import MultiTab from './MultiTab'
import './index.less'

MultiTab.install = function (Vue) {
    if (Vue.prototype.$multiTab) {
      return
    }
    Vue.component('multi-tab', MultiTab)
  }
  
  export default MultiTab
  