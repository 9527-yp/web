<template>
    <div class="logo-box">
        <div class="logo-img"><img :src="logo" alt=""></div>
        <div v-if="!globalStore.isCollapse" class="logo-title animate__animated animate__fadeInLeft">Y_9527 ADMIN</div>
    </div>
</template>

<script lang="ts" setup>
    import { getAssets } from '@/utils/index.ts'
    import useGlobalStore from "@/stores/modules/global.ts";

    const globalStore = useGlobalStore()

    const logo = getAssets("logo/logo.webp");
</script>

<style lang="less" scoped>
    .logo-box{
        width:100%;
        height:56px;
        display:flex;
        align-items: center;
        .logo-img{
            width:34px;
            height:34px;
            margin-left:15px;
            margin-right:12px;
            img{
                width:34px;
                height:34px;
                border-radius:50px;
            }
        }
        .logo-title{
            width:160px;
            font-size:18px;
            font-weight:700;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            background: linear-gradient(270deg, rgba(198, 141, 255, 0.9019607843) 8.92%, #5685ff 46.17%, #fa7e23 92.17%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            white-space: nowrap;
            color: transparent;
        }
    }
</style>
