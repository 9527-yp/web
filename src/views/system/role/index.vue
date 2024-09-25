<template>
    <div class="role-box">
        <div class="title">列表拖拽示例</div>
        <ul>
            <TransitionGroup name="list" tag="li" class="container">
                <li v-for="(item, index) in state.list" :key="item.id"
                class="item-list"
                :draggable="true"
                @dragstart="dragStart($event, index)"
                @dragend="dragend"
                @dragover="dragover"
                @dragenter="dragEnter($event, index)">
                {{ item.title }}
                </li>
            </TransitionGroup>
        </ul>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

defineOptions({
    name: 'rolePage'
})

const state = reactive({
      list: [
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
        { id: 3, title: 'Item 3' },
        { id: 4, title: 'Item 4' },
        { id: 5, title: 'Item 5' }
      ],
      dragIndex: null, // 拖拽的数据下标
    });
    
    // 开始拖拽
    const dragStart = (e, index) => {
        e.stopPropagation()
        console.log('index', index);
        state.dragIndex = index;
        setTimeout(() => {
            e.target.classList.add('moveing')
        },0)
    }

    const dragEnter = (e, index) => {
        console.log(index, 'index');
        e.preventDefault()
        if (state.dragIndex !== null && state.dragIndex !== index) {
            // 计算拖拽元素和目标元素的位置关系
            const dragItem = state.list[state.dragIndex];
        
            // 更新列表顺序
            state.list.splice(state.dragIndex, 1);
            state.list.splice(index, 0, dragItem);
            state.dragIndex = index;
        }
    };

    const dragend = (e) => {
        e.target.classList.remove('moveing')
    };

    const dragover = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

</script>

<style lang="less" scoped>
.role-box{
    padding: 20px;
    border-radius: 6px;
    border: 1px solid #e4e7ed;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
}
.title{
    width: 100%;
    height: 60px;
    line-height:60px;
    font-size: 16px;
    font-weight: 700;
}
.item-list{
    width: 200px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-bottom: 10px;
    background: skyblue;
}
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
    transition: all 0.2s ease;
}
</style>