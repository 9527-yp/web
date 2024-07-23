<template>
    <div class="header">
            <div class="header-left">
                <el-icon class="header-icon" size="20" @click="changeCollapseIcon">
                    <Fold v-if="!globalStore.isCollapse" style="width:20px; height:20px;"/>
                    <Expand v-if="globalStore.isCollapse" style="width:20px; height:20px;"/>
                </el-icon>
                <div class="header-bread">
                    <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="header-right">
                <el-image class="user-image" :src="avatar">
                    <template #error>
                    <el-image class="w-34px h-34px rounded-full select-none user-avatar" :src="errorAvatar"></el-image>
                    </template>
                </el-image>
                <el-dropdown class="dropdown" :hide-on-click="false" @command="handleCommand">
                    <div class="koi-dropdown">
                        <div class="line-clamp-1">王将(管理员)</div>
                        <el-icon><arrow-down /></el-icon>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="koiMine">个人中心</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { ref } from 'vue'

import useGlobalStore from "@/stores/modules/global.ts";

const globalStore = useGlobalStore()

// 用户头像
const avatar = ref(
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fae90b4c7-98b6-4a47-b1b3-9ee8bc71acf6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692146441&t=6fca60f3a0d323869b81d8fb53b5dd1b"
);
const errorAvatar = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";

const changeCollapseIcon = () => {
    // 定义图标切换变量(true-折叠，false-展开)
    globalStore.isCollapse = globalStore.setCollapse(globalStore.isCollapse);
}
// 下拉折叠
const handleCommand = (command: string | number) => {
  switch (command) {
    case "koiMine":
    //   router.push("/system/personage");
      break;
    case "logout":
    //   handleLayout();
      break;
  }
};
</script>

<style lang="less" scoped>
.header{
    display:flex;
    align-items: center;
    justify-content: space-between;
    height:100%;
    .header-left{
        display:flex;
        align-items: center;
        height:100%;
        .header-icon{
            cursor: pointer;
            &:hover{
                color: #fa7e23;
            }
        }
        .header-bread{
            margin-left:20px;
        }
    }
    .header-right{
        height:100%;
        display:flex;
        align-items: center;
        .user-image{
            width:34px;
            height:34px;
            border-radius:50%;
        }
        .dropdown{
            margin-left:10px;
        }
        .koi-dropdown {
            color: #fa7e23;
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            display: flex;
            align-items: center;
            .line-clamp-1 {
                margin-right:6px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                line-clamp: 1;
            }
        }
    }
}
</style>