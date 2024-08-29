<template>
    <div>
        <el-input v-model="input" style="width: 240px" placeholder="Please input" />
    </div>
</template>

<script lang="ts" setup>
    import { ref, onActivated, onMounted } from "vue";
    const input = ref('')

    defineOptions({
        name: 'menuPage'
    })
    onActivated(() => {
        // 调用时机为首次挂载
        // 以及每次从缓存中被重新插入时
        console.log('onActivated')
    })

    onMounted(() => {
        console.log('onMounted')
    })
</script>