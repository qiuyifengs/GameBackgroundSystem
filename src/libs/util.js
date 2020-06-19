import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'

const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

/**
 * @description 尝试在一个数据上取值 可以有多个备选 keyName
 * @param {Object} parent 被取值的数据
 * @param {Array} paths 可供选择的取值路径
 * @param {*} defaultValue 默认值
 */
util.getFromMulti = function (parent = {}, paths = [], defaultValue = '') {
  let result = defaultValue
  for (let pathIndex = 0; pathIndex < paths.length; pathIndex++) {
    const path = paths[pathIndex]
    const value = get(parent, path, defaultValue)
    if (value !== defaultValue) {
      result = value
      break
    }
  }
  return result
}

/**
 * @description 给指定的数组添加唯一 id 字段
 * @description https://github.com/dylang/shortid
 * @param {Array} source 数据源
 * @param {String} idKeyName 字段名
 */
util.arrayAddUniqueId = function (source = [], idKeyName = 'id') {
  return source.map(item => {
    let currentItem = cloneDeep(item)
    currentItem[idKeyName] = shortid.generate()
    return currentItem
  })
}

export default util
