<template>
    <el-menu class="el-menu-vertical-demo"
    :default-active="activeMenu"
    :collapse="globalStore.isCollapse"
    :collapse-transition="false"
    :uniqueOpened="true"
    :router="false"
    :class="menuAnimate">
      <MenuList :menuList="menuList" />
    </el-menu>
</template>

<script lang="ts" setup>
import MenuList from './MenuList.vue'
import {ref, computed} from 'vue'
import { useRoute } from "vue-router";
import useGlobalStore from "@/stores/modules/global.ts";
import useAuthStore from "@/stores/modules/auth.ts";

const route = useRoute()
const authStore = useAuthStore()
const globalStore = useGlobalStore()

const menuList = computed(() => authStore.showMenuList);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);

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