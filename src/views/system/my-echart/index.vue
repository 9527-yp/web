<template>
    <div class="echart-page">
        <div class="echart-box">
            <AnalyseBar />
        </div>
        <div class="echart-box">
            <CarbonEmission />
        </div>
        <div class="echart-box">
            <carbonForecast />
        </div>
    </div>
</template>

<script setup>
import AnalyseBar from './components/AnalyseBar.vue';
import CarbonEmission from './components/carbonEmission.vue';
import carbonForecast from './components/carbonForecast.vue';
</script>

<style lang="less" scoped>
.echart-page{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.echart-box{
    width: 500px;
    height: 300px;
    margin-right: 20px;
    .echart{
        width: 100%;
        height: 100%;
    }
}
</style>