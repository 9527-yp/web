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
import { ElMessage } from 'element-plus'

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
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = {
        data: [
            {
                userId: 1,
                loginName: "YU-ADMIN",
                userName: "超级管理员",
                userType: "1",
                email: "YU-ADMIN666@163.com",
                phone: "18888888888",
                sex: "1",
                avatar: "https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_b.webp",
                userStatus: "0",
                remark: "管理员",
                createTime: "2023-08-06 04:00:00"
            },
            {
                userId: 2,
                loginName: "KOI",
                userName: "小锦鲤",
                userType: "1",
                email: "koi@qq.com",
                phone: "18666666666",
                sex: "1",
                avatar: "https://pic2.zhimg.com/v2-44ce1b82f7e68de4078bf513221619e1_b.webp",
                userStatus: "0",
                remark: "管理员",
                createTime: "2023-08-07 04:00:00"
            },
            {
                userId: 3,
                loginName: "YXT",
                userName: "于金金",
                userType: "2",
                email: "koi@qq.com",
                phone: "18666666666",
                sex: "2",
                avatar: "https://pic1.zhimg.com/v2-3cbc889feac057cc7fb85a40c82598dc_b.webp",
                userStatus: "0",
                remark: "管理员",
                createTime: "2023-08-08 04:00:00"
            },
            {
                userId: 4,
                loginName: "orange",
                userName: "迪迦",
                userType: "1",
                email: "YU-ADMIN666@163.com",
                phone: "18888888888",
                sex: "1",
                avatar: "https://pic3.zhimg.com/v2-b6c350529f3c06c8a90d886c311f3866_b.webp",
                userStatus: "0",
                remark: "远古时代战士",
                createTime: "2023-08-06 04:00:00"
            },
            {
                userId: 5,
                loginName: "apple",
                userName: "盖亚",
                userType: "1",
                email: "koi@qq.com",
                phone: "18666666666",
                sex: "1",
                avatar: "https://pic2.zhimg.com/v2-430e1a7dd0508a0b4b01dca9b94b22f5_b.webp",
                userStatus: "0",
                remark: "远古时代战士",
                createTime: "2023-08-07 04:00:00"
            },
            {
                userId: 6,
                loginName: "banana",
                userName: "阿古茹",
                userType: "2",
                email: "koi@qq.com",
                phone: "18666666666",
                sex: "2",
                avatar: "https://pic3.zhimg.com/v2-6e8ff25c222b6302cb836c9f6b013e7e_b.webp",
                userStatus: "0",
                remark: "远古时代战士",
                createTime: "2023-08-08 04:00:00"
            },
        ],
        total: 100
      }
      resolve(res)
    }, 1000)
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
        width:'120px',
        switchFunc: switchStatusFunc,
        options: [
            {label: '启用', value: '1'},
            {label: '禁用', value: '0'},
        ]
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

//获取选中的行的键值
const tableSelectedRowKeys = defineModel('tableSelectedRowKeys', {
  type: Array,
  default: () => []
})
// 获取选中的行
const tableSelectedRows = defineModel('tableSelectedRows', {
  type: Array,
  default: () => [
      {
        userId: 3,
        loginName: "YXT",
        userName: "于金金",
        userType: "2",
        email: "koi@qq.com",
        phone: "18666666666",
        sex: "2",
        avatar: "https://pic1.zhimg.com/v2-3cbc889feac057cc7fb85a40c82598dc_b.webp",
        userStatus: "0",
        remark: "管理员",
        createTime: "2023-08-08 04:00:00"
    },
  ]
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