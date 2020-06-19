// 创建 el-menu-item
export function elMenuItem (createElement, menu) {
  return createElement('el-menu-item', { props: { index: menu.path }, key: menu.path  }, [
    ...menu.icon ? [
      createElement('a-icon', { props: { type: menu.icon } })
    ] : [],
    createElement('span', { slot: 'title' }, menu.title || '未命名菜单')
  ])
}

// 创建 el-submenu
export function elSubmenu (createElement, menu) {
  return createElement('el-submenu', { props: { index: menu.path }, key: menu.path }, [
    ...menu.icon ? [
      createElement('a-icon', { slot: 'title', props: { type: menu.icon } })
    ] : [],
    createElement('span', { slot: 'title' }, menu.title || '未命名菜单'),
    ...menu.children.map((child, childIndex) => (child.children === undefined ? elMenuItem : elSubmenu).call(this, createElement, child))
  ])
}