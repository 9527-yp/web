<template>
    <div class="header-tabs">
        <el-tabs
            v-model="editableTabsValue"
            type="card"
            class="demo-tabs"
            @edit="handleTabsEdit"
        >
            <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            :closable="item.closeIcon"
            >
                <!-- 加载图标 -->
                <template #label>
                    <div class="tabs-icon">
                    <el-icon class="m-r-2px" v-show="item.icon">
                        <component v-if="item.icon" :is="item.icon"></component>
                    </el-icon>
                    <div>
                        {{ item.title }}
                    </div>
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
      </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'

let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    icon:'HomeFilled',
    content: 'Tab 1 content',
    closeIcon:true,
  },
  {
    title: 'Tab 2',
    name: '2',
    icon:'HomeFilled',
    content: 'Tab 2 content',
    closeIcon:true,
  },
])
const handleTabsEdit = (
  targetName: TabPaneName | undefined,
  action: 'remove'
) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  
}

</script>

<style lang="less" scoped>
.header-tabs{
    width:100%;
    height:42px;
    display:flex;
    align-items: center;
    background:#fff;
    border-bottom:1px solid #e4e2e2;
}
.tabs-icon {
    display:flex;
    align-items: center;
    justify-content: center;
}
/** tabs选项卡的css开始 */
.demo-tabs {
  @apply dark:border-#313233;
  // 色弱模式
  background-color: var(--el-bg-color);
}
:deep(.el-tabs__item:first-child) {
  margin-left: 16px;
}
:deep(.el-tabs__item:nth-child(n)) {
  // 选中/未选中边框
  border: 1px solid #e0e0e6 !important;
}
:deep(.el-tabs__item:not(:active)) {
  // 设置未选中的边框
  border: 1px solid #e0e0e6;
}
:deep(.el-tabs__item) {
  height: 28px;
  margin-top: 1px;
  margin-left: 6px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  border: 1px solid #e0e0e6;
  border-radius: 4px;
  .is-top {
    border-bottom: none !important;
  }

  // 设置鼠标悬停时的样式
  &:hover {
    background: #fee5d3;
    color: #fa7e23;
    border: none;
  }

  // 设置鼠标选中的样式[可用来定制不同配色的主题]
  &.is-active {
    color: #fa7e23;
    background: #fee5d3;

    // 边框选中颜色
    border: 1px solid #fa7e23 !important;
  }
}
:deep(.el-tabs__header) {
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: none !important;
//   border-top: 1px solid var(--el-color-info-light-7); // 选项卡边框实线
//   border-bottom: 1px solid var(--el-color-info-light-7); // 选项卡边框实线
}
:deep(.el-tabs__nav.is-top) {
  height: 32px; // 高度越高，可以调整tab卡距离底部的高度
  border: none; //  去除左侧tabs边框
  border-radius: 4px;
}

// 覆盖多余边框
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.el-tabs__nav-prev) {
  // 标签页多了左侧图标
  line-height: 35px;
}
:deep(.el-tabs__nav-next) {
  // 标签页多了右侧图标
  line-height: 35px;
}
.el-tabs--card {
  height: 40px !important;
}

/** tabs选项卡的css结束 */
</style>