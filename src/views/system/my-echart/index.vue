<template>
    <div class="echart-page">
        <div class="echart-box">
            <AnalyseBar />
        </div>
        <div class="echart-box">
            <CarbonEmission />
        </div>
        <div class="echart-box">
            <CarbonForecast />
        </div>
        <div class="echart-box">
            <Atlas />
        </div>
        <div class="echart-box">
            <BrokenLine />
        </div>
        <div class="echart-box">
            <City />
        </div>
    </div>
</template>

<script setup>
import AnalyseBar from './components/AnalyseBar.vue';
import CarbonEmission from './components/carbonEmission.vue';
import CarbonForecast from './components/carbonForecast.vue';
import Atlas from './components/Atlas.vue';
import BrokenLine from './components/BrokenLine.vue';
import City from './components/City.vue';
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
    margin-bottom: 20px;
    .echart{
        width: 100%;
        height: 100%;
    }
}
</style>