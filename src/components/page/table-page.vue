<template>
    <div class="page-index">
        <div class="page-table">
            <!-- 搜索 -->
            <BaseSearch v-if="showSearch" v-bind="$attrs" />
            <!-- 表格 -->
            <BaseTable v-bind="$attrs" v-model:showSearch="showSearch">
                <!-- 表格操作 -->
                <template #tableOperation>
                    <slot name="tableOperation"></slot>
                </template>

                <!-- table操作 -->
                <template #rowOperation="{record}">
                    <slot name="rowOperation" :record="record"></slot>
                </template>
            </BaseTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseSearch from '@/components/search/base-search.vue'
import BaseTable from '@/components/table/base-table.vue'
import { ref } from 'vue';

defineOptions({
    name: 'TablePage'
})

const showSearch = defineModel('showSearch', {
    type: Boolean,
    default: true
})
</script>
<style lang="less" scoped>
.page-index{
    height:100%;
    display:flex;
    flex-direction: column;
}
.page-table{
    padding: 20px;
    border-radius: 6px;
    border: 1px solid #e4e7ed;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    
}
</style>