<template>
    <TablePage :searchParams="searchParams" v-model:showSearch="showSearch" :bus-key="busKey"
        :table-columns="tableColumns">
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

// table 表头数据
const tableColumns = ref([
    {
        title: '登录账号',
        dataIndex: 'loginName',
        columnType: 'text',
        width:'120px'
    },
    {
        title: '头像',
        dataIndex: 'avatar',
        columnType: 'image',
        width:'120px'
    },
    {
        title: '用户名称',
        dataIndex: 'userName',
        columnType: 'text',
        width:'120px'
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        columnType: 'text',
        width:'120px'
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        columnType: 'text',
        width:'120px'
    },
    {
        title: '用户类型',
        dataIndex: 'userType',
        columnType: 'tag',
        width:'120px',
        options: [
            {
                dictLabel: "系统用户",
                dictValue: "1",
                dictTag: "primary",
                dictColor: ""
            },
            {
                dictLabel: "注册用户",
                dictValue: "2",
                dictTag: "warning",
                dictColor: ""
            }
        ]
    },
    {
        title: '用户性别',
        dataIndex: 'sex',
        columnType: 'tag',
        width:'120px',
        options: [
            { dictLabel: "男", dictValue: "1", dictTag: "primary", dictColor: "" },
            { dictLabel: "女", dictValue: "2", dictTag: "danger", dictColor: "" },
            { dictLabel: "未知", dictValue: "3", dictTag: "info", dictColor: "" }
        ]
    },
    {
        title: '用户状态',
        dataIndex: 'userStatus',
        columnType: 'switch',
        width:'120px'
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        columnType: 'text',
        width:'160px'
    },
    {
        title: '备注',
        dataIndex: 'remark',
        columnType: 'text',
        width:'120px'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        columnType: 'operation',
        width:'120px'
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

/** 编辑 */
const handleUpdate = (row:any) => {
    console.log(row)
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