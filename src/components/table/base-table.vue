<template>
    <div class="custom-table">
        <div class="">
            <el-row :gutter="10">
                <slot name="tableOperation"></slot>
                <TableOperate v-model:showSearch="showSearch" :busKey="busKey" />
            </el-row>
        </div>
        <el-table v-loading="loading" border :data="tableList" empty-text="暂时没有数据哟🌻">
            <el-table-column type="selection" width="55" align="center" />
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
                            class="rounded-full w-36px h-36px"
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
                        active-text="启用"
                        inactive-text="停用"
                        active-value="0"
                        inactive-value="1"
                        :inline-prompt="true"
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

import { ref, onMounted } from 'vue';

defineProps({
    busKey: {
        type: String,
        default: ''
    },
    tableColumns: {
        type: Array,
        default: []
    }
})

const showSearch = defineModel('showSearch', {
    type: Boolean,
    default: true
})

// 数据表格加载页面动画
const loading = ref(false);

// 数据表格数据
const tableList = ref<any>([
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
]);

/** 状态switch */
const handleSwitch = (row: any) => {
  let text = row.userStatus === "0" ? "启用" : "停用";
//   koiMsgBox("确认要[" + text + "]-[" + row.userName + "]吗？")
//     .then(async () => {
//       resetForm();
//       if (!row.userId || !row.userStatus) {
//         koiMsgWarning("请选择需要修改的数据🌻");
//         return;
//       }
//       try {
//         await updateStatus(row.userId, row.userStatus);
//         koiNoticeSuccess("修改成功🌻");
//       } catch (error) {
//         console.log(error);
//         koiNoticeError("修改失败，请刷新重试🌻");
//         handleTableData();
//       }
//     })
//     .catch(() => {
//       koiMsgError("已取消🌻");
//     });
};


</script>