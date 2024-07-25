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
</style>
<style lang="less">
/** 菜单悬浮折叠宽度 */
.el-menu--collapse {
  width: 70px !important;
}
</style>