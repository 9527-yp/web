<template>
    <TablePage :searchParams="searchParams" v-model:showSearch="showSearch" :bus-key="busKey"
        :table-columns="tableColumns" :load-table-data-api-func="loadTableDataApiFunc"
        v-model:tableSelectedRowKeys="tableSelectedRowKeys"
        v-model:tableSelectedRows="tableSelectedRows">
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
        </template>
        <!-- 表格数据操作 -->
        <template #rowOperation="{record}">
            <el-tooltip content="修改🌻" placement="top">
                <el-button
                    type="primary"
                    icon="Edit"
                    circle
                    plain
                    @click="handleUpdate(record)"
                ></el-button>
            </el-tooltip>
            <el-tooltip content="删除🌻" placement="top">
                <el-button
                    type="danger"
                    icon="Delete"
                    circle
                    plain
                    @click="handleDelete(record)"
                ></el-button>
            </el-tooltip>
        </template>
    </TablePage>
</template>

<script setup lang="ts">
import TablePage from '@/components/page/table-page.vue'
import { getBusUniqueKey } from "@/utils/bus.js";
import { ref } from 'vue';
import {useEventBus} from '@vueuse/core';
import { ElMessage } from 'element-plus';

import { getDatabase } from '@/apis/index.js';

defineOptions({
    name: 'userPage'
})

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
// 表单显示隐藏事件总线
const formBus = useEventBus(`${busKey}_form}`);

/** switch 启用 禁用 调用接口 */
const switchStatusFunc = (id, status) => {
    console.log('启用 禁用', id, status)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 随机模拟成功、失败返回
            const random = Math.random()
            if (random > 0.5) {
                ElMessage.success('操作成功')
                resolve()
            } else {
                ElMessage.error('操作失败')
                reject()
            }
        }, 1000)
    })
}

/** 加载表格数据接口 */
const loadTableDataApiFunc = async (params) => {
  console.log('表格数据开始加载，参数：', params)
  return getDatabase({
    page: params.pageNumber,
    page_size: params.pageSize,
  })
}

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

// table 表头数据
const tableColumns = ref([
    {
        title: '文档名称',
        dataIndex: 'name',
        columnType: 'text',
        width:'120px'
    },
    {
        title: '头像',
        dataIndex: 'avatar',
        columnType: 'image',
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
        columnType: 'text',
    },
    {
        title: '描述',
        dataIndex: 'description',
        columnType: 'text',
    },
    {
        title: '更新时间',
        dataIndex: 'update_time',
        columnType: 'text',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        columnType: 'operation',
    },
])
/** 是否显示搜索表单 */
const showSearch = ref<boolean>(true); // 默认显示搜索条件
// 搜索表单显示隐藏
formBus.on((event) => {
  switch (event) {
    case 'onShowform':
      showSearch.value = !showSearch.value
      break
    default:
      break
  }
})

//获取选中的行的键值
const tableSelectedRowKeys = defineModel('tableSelectedRowKeys', {
  type: Array,
  default: () => []
})
// 获取选中的行
const tableSelectedRows = defineModel('tableSelectedRows', {
  type: Array,
  default: () => []
})

/** 编辑 */
const handleUpdate = (row:any) => {
    console.log(row, '编辑')
    console.log(tableSelectedRowKeys.value, 'tableSelectedRowKeys')
    console.log(tableSelectedRows.value, 'tableSelectedRows')
}

/** 删除 */
const handleDelete = (row:any) => {
    console.log(row)
}
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