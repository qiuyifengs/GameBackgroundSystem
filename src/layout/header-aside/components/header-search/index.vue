<template>
  <span class="antd-pro-components-global-header-index-action antd-pro-components-global-header-index-search antd-pro-components-header-search-index-headerSearch">
    <a-icon type="search" @click="handleClick" />
  </span>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
