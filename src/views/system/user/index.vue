<template>
    <TablePage :searchParams="searchParams" v-model:showSearch="showSearch" :bus-key="busKey">
        <!-- 表格操作 -->
        <template #tableOperation>
            <!-- 新增 -->
            <el-col :span="1.5">
                <el-button type="primary" icon="plus" plain>新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" icon="edit" plain>修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" icon="delete" plain>删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" icon="edit" plain>分配角色</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="download" plain>导出</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" icon="upload" plain>导入</el-button>
            </el-col>
        </template>
    </TablePage>
</template>

<script setup lang="ts">
import TablePage from '@/components/page/table-page.vue'
import { getBusUniqueKey } from "@/utils/bus.js";
import { ref } from 'vue';
import {useEventBus} from '@vueuse/core';

interface Option {  
    value: string;  
    label: string;  
}

interface searchParams {  
    fieId: string;
    label: string;
    type: 'input' | 'select' | 'DatePicker'; // 或者根据需要定义其他类型  
    optionList?: Option[];
}

// 生成随机事件键值
const busKey = getBusUniqueKey();

// 表格事件总线
const tableBus = useEventBus(`${busKey}_table}`);
// 搜索事件总线
const formBus = useEventBus(`${busKey}_form}`);

// 查询参数
const searchParams: searchParams[] = [
    {
        fieId: 'userName',
        label: '用户名称',
        type:'input',
    },
    {
        fieId: 'sex',
        label: '用户性别',
        type:'select',
        optionList:[
            {
                value: '0',
                label: '女',
            },
            {
                value: '1',
                label: '男',
            },
        ]
    },
    {
        fieId: 'createTime',
        label: '创建时间',
        type:'DatePicker',
    },
]

/** 是否显示搜索表单 */
const showSearch = ref<boolean>(true); // 默认显示搜索条件

// 刷新表格数据
formBus.on((event) => {
  switch (event) {
    case 'onShowform':
      showSearch.value = !showSearch.value
      break
    default:
      break
  }
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