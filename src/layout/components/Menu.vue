<template>
    <el-menu class="el-menu-vertical-demo" 
    default-active="/"
    :collapse="globalStore.isCollapse"
    :collapse-transition="false"
    :uniqueOpened="true"
    :router="true"
    :class="menuAnimate">
        <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="1">
        <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
        </template>
            <el-menu-item index="/login">
            <template #title>
                <el-icon><User /></el-icon>
                <span>用户管理</span>
            </template>
            </el-menu-item>
            <el-menu-item index="1-2">
            <template #title>
                <el-icon><Camera /></el-icon>
                <span>角色管理</span>
            </template>
            </el-menu-item>
            <el-menu-item index="1-3">
            <template #title>
                <el-icon><Menu /></el-icon>
                <span>菜单管理</span>
            </template>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import useGlobalStore from "@/stores/modules/global.ts";

const globalStore = useGlobalStore()

const menuAnimate = ref('animate__animated animate__fadeInLeft')
</script>


<style lang="less" scoped>
.el-menu{
    border-right:none;
}
/** el-menu鼠标悬停和点击代码 */
// 父节点
.el-menu-item {
  height: 40px !important;
  margin-bottom: 3px;
  font-weight: 500;
  // color: #000000;

  /* 设置用户禁止选中 */
  user-select: none;
  border-left: 6px solid transparent;
  border-radius: 6px;

  // @apply dark:c-#E5E3FA;
  color: var(--el-menu-text-color);
  i {
    transform: translate(-8px); // 图标偏移
  }
  span {
    transform: translate(-8px); // 文字偏移
  }

  // 设置鼠标悬停时el-menu-item的样式
  &:hover {
    // color: var(--el-color-primary);
    color: #fa7e23;
    // background: var(--el-color-primary-light-8);
    background: #fee5d3;
    border-left: 6px solid #fa7e23;

    // & 含义 .el-menu-item
    border-radius: 6px;

    // 实现鼠标悬停时icon变色
    i {
      // color: var(--el-color-primary);
      color: #fa7e23;
    }
  }

  // 设置选中el-menu-item时的样式
  &.is-active {
    // color: var(--el-color-primary);
    color: #fa7e23;
    // background: var(--el-color-primary-light-8);
    background: #fee5d3;
    // border-left: $aside-menu-border-left solid var(--el-color-primary);
    border-left: 6px solid #fa7e23;
  }
}
:deep(.el-sub-menu__title) {
  height: 40px;
  padding-right: 0; // 去除collapse缩小多余的边框
  margin-bottom: 3px;
  font-weight: 500;

  /* 设置用户禁止选中 */
  user-select: none;
  border-left: 6px solid transparent;
  border-radius: 6px;

  // @apply dark:c-#E5E3FA;
//   color: #fa7e23;
  i {
    transform: translate(-8px); // 图标偏移
  }
  span {
    transform: translate(-8px); // 文字偏移
  }
  &:hover {
    // color: var(--el-color-primary);
    color: #fa7e23;
    // background: var(--el-color-primary-light-8);
    background: #fee5d3;
    // border-left: $aside-menu-border-left solid var(--el-color-primary);
    border-left: 6px solid #fa7e23;
  }
  &:active {
    // color: var(--el-color-primary);
    color: #fa7e23;
    // background: var(--el-color-primary-light-8);
    background: #fee5d3;
    // border-left: $aside-menu-border-left solid var(--el-color-primary);
    border-left: 6px solid #fa7e23;
  }
}

</style>
<style lang="less">
.el-sub-menu.is-active > .el-sub-menu__title {
  // color: var(--el-color-primary) !important;
  color: #fa7e23 !important;
}

/* icon图标也跟着变 */
.el-sub-menu.is-active > .el-sub-menu__title i {
  // color: var(--el-color-primary) !important;
  color: #fa7e23 !important;
}
</style>