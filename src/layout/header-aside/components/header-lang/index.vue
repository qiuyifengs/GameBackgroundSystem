<template>
<span class="antd-pro-components-global-header-index-action">
    <a-tooltip :title="$t('navbar.lang')" placement="bottom">
        <a-icon type="global" @click='changeLang' />
    </a-tooltip>
</span>
</template>

<script>
export default {
    methods: {
        changeLang() {
            this.$i18n.locale = this.$i18n.locale === "en_US" ? "zh_CN" : "en_US";
            console.log(this.$i18n.locale)
        },
    }
}
</script>
