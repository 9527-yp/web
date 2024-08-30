<template>
    <el-form :inline="true">
        <el-form-item v-for="item in searchParams" :key="item.fieId" :label="item.label">
            <el-input
                v-if="item.type === 'input'"
                :placeholder="`请输入${item.label}`"
                v-model="form[item.fieId]"
                clearable
                style="width: 200px"
                @keyup.enter.native="handleListPage"
            ></el-input>
            <el-select
                v-if="item.type === 'select'"
                v-model="form[item.fieId]"
                clearable
                placeholder="请选择"
                style="width: 240px"
            >
                <el-option
                v-for="i in item.optionList"
                :key="i.value"
                :label="i.label"
                :value="i.value"
                />
            </el-select>
            <el-date-picker
                v-model="form[item.fieId]"
                v-if="item.type === 'DatePicker'"
                value-format="YYYY-MM-DD"
                type="date"
                placeholder="请选择"
            />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon="search" plain @click="handleSearch">搜索</el-button>
            <el-button type="danger" icon="refresh" plain @click="resetSearch">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface SearchField {
  fieId: string;
  label: string;
  type: 'input' | 'select' | 'date-picker' | string; // 根据需要扩展类型  
  // 可以添加其他字段，如options等
}  

interface SearchForm {  
  [key: string]: string; // 这里可以根据需要指定更具体的类型  
}  

const props = defineProps({
    searchParams: Array as () => SearchField[]
})


const form: SearchForm = reactive({})

props.searchParams.forEach(item => {
    form[item.fieId] = '';
})

// 回车键键盘事件
const handleListPage = async () => {

};

/** 清空表单数据 */
const resetForm = () => {
    for(let key in form){
        // console.log(key, 'key')
        form[key] = ''
    }
};

/** 搜索 */
const handleSearch = () => {
  console.log("搜索", form);
};

/** 重置 */
const resetSearch = () => {
  console.log("重置搜索");
  resetForm()
};
</script>