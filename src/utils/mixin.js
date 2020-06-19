import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import { mapState, mapActions } from 'vuex'

const mixin = {
    computed: {
      ...mapState('d2admin', {
        layoutMode: state => state.app.layout,
        navTheme: state => state.app.theme,
        primaryColor: state => state.app.color,
        colorWeak: state => state.app.weak,
        fixedHeader: state => state.app.fixedHeader,
        fixSiderbar: state => state.app.fixSiderbar,
        fixSidebar: state => state.app.fixSiderbar,
        autoHideHeader: state => state.app.autoHideHeader,
        sidebarOpened: state => state.app.sidebar,
        multiTab: state => state.app.multiTab,
        keepAlive: state => state.page.keepAlive,
        grayActive: state => state.gray.active,
        transitionActive: state => state.transition.active,
        asideCollapse: state => state.menu.asideCollapse,
        contentWidth: state => state.app.contentWidth,
        channelList: state => state.api.channelList,
        serverList: state => state.api.serverList
      }),
      contentPaddingLeft() {
          if (!this.fixSidebar) {
              return '0'
          }
          if (!this.asideCollapse) {
              return '256px'
          }
          return '80px'
      }
    },
    methods: {
      isTopMenu () {
        return this.layoutMode === 'topmenu'
      },
      isSideMenu () {
        return !this.isTopMenu()
      }
    }
  }
  
  const mixinDevice = {
    computed: {
      ...mapState('d2admin', {
        device: state => state.app.device
      })
    },
    methods: {
      isMobile () {
        return this.device === DEVICE_TYPE.MOBILE
      },
      isDesktop () {
        return this.device === DEVICE_TYPE.DESKTOP
      },
      isTablet () {
        return this.device === DEVICE_TYPE.TABLET
      }
    }
  }
  
  const AppDeviceEnquire = {
    mounted () {
      const { $store } = this
      deviceEnquire(deviceType => {
        switch (deviceType) {
          case DEVICE_TYPE.DESKTOP:
            $store.commit('TOGGLE_DEVICE', 'desktop')
            $store.dispatch('setSidebar', true)
            break
          case DEVICE_TYPE.TABLET:
            $store.commit('TOGGLE_DEVICE', 'tablet')
            $store.dispatch('setSidebar', false)
            break
          case DEVICE_TYPE.MOBILE:
          default:
            $store.commit('TOGGLE_DEVICE', 'mobile')
            $store.dispatch('setSidebar', true)
            break
        }
      })
    }
  }
  
  export { mixin, AppDeviceEnquire, mixinDevice }
  