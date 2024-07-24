<template>
    <!-- 有下级，用el-sub-menu，无下级用el-menu-item -->
    <template v-for="item in menuList" :key="item.path">
        <!-- 非叶子节点 v-show：true(显示)false(隐藏)，v-if反之。 -->
        <el-sub-menu v-if="item.children?.length" :index="item.path">
            <template #title>
                <el-icon><component :is="item.icon"></component></el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <MenuList :menuList="item.children" />
        </el-sub-menu>
        <!-- 叶子节点[功能节点] -->
        <el-menu-item>
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.meta.title }}</span>
        </el-menu-item>
    </template>
</template>

<script lang="ts" setup>
    // 获取父组件传递过来的数据
    defineProps(["menuList"]);

    import MenuList from '@/layout/components/MenuList.vue'
</script>