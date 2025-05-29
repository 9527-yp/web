<template>
    <div>
        <el-input v-model="input" style="width: 240px" placeholder="Please input" />
        <div>
            <el-button type="primary" @click="acrossTabs">跨标签页发送消息</el-button>
        </div>
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

    // 1. 创建 Broadcast Channel（通道名称需一致）
    const channel = new BroadcastChannel('my_channel');
    const acrossTabs = () => {
        if(!input.value) return;
        const text = input.value;
        // channel.postMessage(text); // 简单用法

        // 发送结构化消息
        channel.postMessage({
            type: 'SYNC_DATA',  // 消息类型
            payload: {          // 消息内容
                msg: text
            }
        });
        
    }
</script>