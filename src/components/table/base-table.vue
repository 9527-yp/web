<template>
    <div class="custom-table">
        <div class="">
            <el-row :gutter="10">
                <slot name="tableOperation"></slot>
                <TableOperate v-model:showSearch="showSearch" :busKey="busKey" />
            </el-row>
        </div>
        <el-table
            v-loading="loading"
            border
            :data="tableList"
            empty-text="暂时没有数据哟🌻"
        >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" prop="userId" width="80px" align="center" type="index"></el-table-column>
            <el-table-column
            label="登录账号"
            prop="loginName"
            width="120px"
            align="center"
            :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column label="头像" prop="avatar" width="80px" align="center">
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
            <el-table-column
            label="用户名称"
            prop="userName"
            width="120px"
            align="center"
            :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column label="邮箱" prop="email" width="220px" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="手机号" prop="phone" width="150px" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="用户类型" prop="userType" width="100px" align="center">
            <template #default="scope">
                <BaseTag :tagOptions="userTypeOptions" :value="scope.row.userType"></BaseTag>
            </template>
            </el-table-column>
            <el-table-column label="用户性别" prop="sex" width="100px" align="center">
            <template #default="scope">
                <BaseTag :tagOptions="userSexOptions" :value="scope.row.sex"></BaseTag>
            </template>
            </el-table-column>
            <!-- 注意：如果后端数据返回的是字符串"0" OR "1"，这里的active-value AND inactive-value不需要加冒号，会认为是字符串，否则：后端返回是0 AND 1数字，则需要添加冒号 -->
            <el-table-column label="用户状态" prop="userStatus" width="100px" align="center">
            <template #default="scope">
                <!-- {{ scope.row.userStatus }} -->
                <el-switch
                v-model="scope.row.userStatus"
                active-text="启用"
                inactive-text="停用"
                active-value="0"
                inactive-value="1"
                :inline-prompt="true"
                @change="handleSwitch(scope.row)"
                >
                </el-switch>
            </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" width="180px" align="center"></el-table-column>
            <el-table-column label="备注" prop="remark" width="200px" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column
            label="操作"
            align="center"
            width="150"
            fixed="right"
            v-auth="['system:role:update', 'system:role:delete']"
            >
            <template #default="{ row }">
                <el-tooltip content="修改🌻" placement="top">
                <el-button
                    type="primary"
                    icon="Edit"
                    circle
                    plain
                    @click="handleUpdate(row)"
                    v-auth="['system:role:update']"
                ></el-button>
                </el-tooltip>
                <el-tooltip content="删除🌻" placement="top">
                <el-button
                    type="danger"
                    icon="Delete"
                    circle
                    plain
                    @click="handleDelete(row)"
                    v-auth="['system:role:delete']"
                ></el-button>
                </el-tooltip>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import TableOperate from '@/components/table/table-operate.vue'
import BaseTag from '@/components//tag/base-tag.vue'

import { ref } from 'vue';

defineProps({
    busKey: {
        type: String,
        default: ''
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

// 翻译数据[用户类型]
const userTypeOptions = ref();
/** 字典翻译tag */
const handleDict1 = async () => {
  try {
    userTypeOptions.value = [
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
    ];
  } catch (error) {
    console.log(error);
  }
};

// 翻译数据[用户性别]
const userSexOptions = ref();
/** 字典翻译tag */
const handleDict2 = async () => {
  try {
    userSexOptions.value = [
      { dictLabel: "男", dictValue: "1", dictTag: "primary", dictColor: "" },
      { dictLabel: "女", dictValue: "2", dictTag: "danger", dictColor: "" },
      { dictLabel: "未知", dictValue: "3", dictTag: "info", dictColor: "" }
    ];
  } catch (error) {
    console.log(error);
  }
};
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

/** 编辑 */
const handleUpdate = () => {

}

/** 删除 */
const handleDelete = () => {

}


</script>