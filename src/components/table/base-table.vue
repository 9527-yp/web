<template>
    <div class="custom-table">
        <div class="table-page-top">
            <el-row :gutter="10">
                <slot name="tableOperation"></slot>
                <TableOperate v-model:showSearch="showSearch" :busKey="busKey" />
            </el-row>
        </div>
        <el-table v-loading="loading"
          border
          ref="tableRef"
          row-key="userId"
          :data="tableList"
          @selection-change="handleSelectionChange"
          empty-text="暂时没有数据哟🌻">
            <el-table-column :reserve-selection="true" type="selection" width="55" align="center" />
            <el-table-column label="序号" prop="userId" width="80px" align="center" type="index"></el-table-column>
            <template v-for="item in tableColumns" :key="item.dataIndex">
                <el-table-column
                    v-if="item.columnType == 'text'"
                    :label="item.title"
                    :prop="item.dataIndex"
                    :width="item.width || '120px'" 
                    align="center" 
                    :show-overflow-tooltip="true" 
                ></el-table-column>
                <el-table-column
                    v-if="item.columnType == 'tag'"
                    :label="item.title"
                    :prop="item.dataIndex"
                    :width="item.width || '120px'" 
                    align="center" 
                >
                    <template #default="scope">
                        <BaseTag :tagOptions="item.options" :value="scope.row[item.dataIndex]"></BaseTag>
                    </template>
                </el-table-column>
                <el-table-column 
                  v-if="item.columnType == 'image'"
                  :label="item.title"
                  :prop="item.dataIndex"
                  :width="item.width || '120px'" 
                  align="center" >
                    <template #default="scope">
                        <div class="flex justify-center">
                        <el-image
                            class="rounded-full"
                            :preview-teleported="true"
                            :preview-src-list="[scope.row.avatar]"
                            :src="
                            scope.row.avatar != null && scope.row.avatar != ''
                                ? scope.row.avatar
                                : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                            "
                        >
                            <template #error>
                            <el-icon class="c-[--el-color-primary]" :size="36">
                                <CircleCloseFilled />
                            </el-icon>
                            </template>
                        </el-image>
                        </div>
                    </template>
                </el-table-column>
                <!-- 注意：如果后端数据返回的是字符串"0" OR "1"，这里的active-value AND inactive-value不需要加冒号，会认为是字符串，否则：后端返回是0 AND 1数字，则需要添加冒号 -->
                <el-table-column 
                  v-if="item.columnType == 'switch'"
                  :label="item.title"
                  :prop="item.dataIndex"
                  :width="item.width || '120px'" 
                  align="center" >
                    <template #default="scope">
                        <el-switch
                        v-model="scope.row[item.dataIndex]"
                        :active-text="item.options[0].label"
                        :inactive-text="item.options[1].label"
                        :active-value="item.options[0].value"
                        :inactive-value="item.options[1].value"
                        :inline-prompt="true"
                        :loading='scope.switchLoading'
                        @change="switchChange(item, scope, scope.row[item.dataIndex])"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                  v-if="item.columnType == 'operation'"
                  :label="item.title"
                  :prop="item.dataIndex"
                  :width="item.width || '120px'" 
                  align="center"
                  fixed="right">
                <template #default="{ row }">
                    <slot name="rowOperation" :record="row"></slot>
                </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import TableOperate from '@/components/table/table-operate.vue'
import BaseTag from '@/components//tag/base-tag.vue'

import { ref, computed, onMounted, toRef, toRefs, watch } from 'vue';
import {useEventBus} from '@vueuse/core';
import { ElTable } from 'element-plus'

const props = defineProps({
    // bus key
    busKey: {
        type: String,
        default: ''
    },
    // 表头数据
    tableColumns: {
        type: Array,
        default: []
    },
    // 数据方法
    loadTableDataApiFunc: {
        type: Function,
    },
    // 表格数据
    tableDataSource: {
        type: Array,
        default: () => []
    },
})

const tableRef = ref<InstanceType<typeof ElTable>>()
const showSearch = defineModel('showSearch', {
    type: Boolean,
    default: true
})

// 表格选中的行键值
const tableSelectedRowKeys = defineModel('tableSelectedRowKeys', {
  type: Array,
  default: () => []
})
// 表格选中的行
const tableSelectedRows = defineModel('tableSelectedRows', {
  type: Array,
  default: () => []
})

watch(() =>tableSelectedRows.value, (newItems, oldItems) => {
    if(oldItems === undefined){
        setTimeout(() => {
            if (newItems) {
                newItems.forEach((row) => {
                    console.log(row, 'row')
                tableRef.value?.toggleRowSelection(row, undefined)
                })
            } else {
                tableRef.value?.clearSelection()
            }
        },300)
    }
},{immediate:true,deep:true});
// table 表格选中
const handleSelectionChange = (val: any) => {
    tableSelectedRowKeys.value = val.map(item => item.userId); 
    tableSelectedRows.value = val
}

// 数据表格加载页面动画
const loading = ref(false);

// 数据表格数据
const loadDataSource = ref([])
const tableList = computed(() => {
  return props.tableDataSource.length > 0 ? props.tableDataSource : loadDataSource.value
})

const params = ref({

})
// 加载表格数据
const loadTableData = async () => {
  // 如果没有数据加载函数
  if (!props.loadTableDataApiFunc) return
  loading.value = true
  // 加载数据
  props.loadTableDataApiFunc(params.value).then(res => {
    loadDataSource.value = res?.data || []
  }).finally(() => {
    loading.value = false
  })
}

/** 状态switch */
const switchChange = (item:any, scope, value) => {
    console.log(item, scope.row, value)
    scope.switchLoading = true
    // 调用接口方法
    item?.switchFunc(scope.row.userId, value).catch(() => {
        const options = item?.options || []
        const find = options.find(item => item.value !== value)
        if (find) {
        scope.row[item.dataIndex] = find.value
        }
    }).finally(() => {
        scope.switchLoading = false
    })
};
// 搜索事件总线
const searchBus = useEventBus(`${props.busKey}_search}`);
// 搜索事件总线
searchBus.on(async (event, data) => {
  switch (event) {
    case 'onSearch':
      console.log('表格搜索：', data)
      loading.value = true
      params.value = data
      await loadTableData()
      break
    default:
      break
  }
})

onMounted(() => {
  console.log('开始加载表格数据')
  loadTableData()
})


</script>

<style lang="less" scoped>
.rounded-full{
    width:36px;
    height:36px;
    border-radius:999px;
}
.table-page-top{
    margin-bottom:20px;
}
</style>