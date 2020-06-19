<template>
<div class="d2-contentmenu-list" @click="rowClick">
    <div v-for="item in menulist" :key="item.value" :data-value="item.value" class="d2-contentmenu-item" flex="cross:center main:center">
        <a-icon v-if="item.icon" :type="item.icon" />
        <div class="d2-contentmenu-item-title" flex-box="1">
            {{item.title}}
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'd2-contextmenu-list',
    props: {
        menulist: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        rowClick(event) {
            let target = event.target
            while (!target.dataset.value) {
                target = target.parentNode
            }
            this.$emit('rowClick', target.dataset.value)
        }
    }
}
</script>

<style lang="scss">
.d2-contentmenu-list {
    .d2-contentmenu-item {
        clear: both;
        margin: 0;
        padding: 5px 12px;
        color:rgba(0, 0, 0, 0.65);
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            background: #e6f7ff;
        }

        .d2-contentmenu-item-title {
            margin-left: 10px;
        }
    }
}
</style>
