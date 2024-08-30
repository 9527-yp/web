<template>
    <div class="table-operate">
        <el-row>
            <el-tooltip :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
                <el-button circle icon="search" @click="toggleSearch()"/>
            </el-tooltip>
            <el-tooltip content="刷新" placement="top">
                <el-button circle icon="refresh" />
            </el-tooltip>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import {  } from 'vue';
import { useEventBus } from '@vueuse/core'
const props = defineProps({
  busKey: {
    type: String,
    default: ''
  }
});

const showSearch = defineModel('showSearch', {
    type: Boolean,
    default: true
})

// 搜索事件总线
const formBus = useEventBus(`${props.busKey}_form}`);


// 点击子组件，调用父组件方法
const toggleSearch = () => {
  // 同步修改父子组件的值，但是父组件需要使用v-model:showSearch="showSearch"
  // @ts-ignore
  formBus.emit('onShowform');
};
</script>


<style lang="less" scoped>
.table-operate{
    margin-left: auto;
}
</style>