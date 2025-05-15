<template>
    <div ref="analyseBarRef" class="echart"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

onMounted(() => {
    analyseBarRef.value && getEchart();
})

const analyseBarRef = ref(null);
let myChart = null;
const getEchart = () => {

    myChart = echarts.init(analyseBarRef.value);

    const titleName = [
        {
            name: '建筑碳汇',
            value: 0.12
        },
        {
            name: '暖通空调',
            value: -0.2
        },
        {
            name: '照明插座',
            value: 0.22
        },
        {
            name: '动力系统',
            value: 0.35
        },
        {
            name: '生活用水',
            value: -0.45
        },
        {
            name: '其他',
            value: 0.55
        },
        {
            name: '可再生能源',
            value: 0.12
        },
    ];
    const color = ['#F772D1', '#015EEA', '#F7CB6B', '#43EA80', '#5A00FF', '#FFD800', '#F92929'];
    const seriesData = titleName.map((item, index) => {
        let dataArr = new Array(index+1);
        dataArr[index] = {value: item.value}
        let newData = {
            name: item.name,
            type: 'bar',
            stack: 'Total',
            label: {
                formatter: '{b}'
            },
            itemStyle: {
                color: color[index],
            },
            data: dataArr
        }
        return newData
    })
    let option = {
        backgroundColor:'#222',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        legend: {
            orient: 'vertical',
            right: 20,
            top: 'center',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            top: 40,
            bottom: 30,
            right: 120
        },
        yAxis: {
            type: 'value',
            name: '单位/tCO2e',
            nameTextStyle: {
                color: '#fff',
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#19C0FD'
                }
            },
            axisLabel: {
                color: '#fff',
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        xAxis: {
            type: 'category',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#19C0FD'
                }
            },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: [
            'ten',
            'nine',
            'eight',
            'seven',
            'six',
            'five',
            'four'
            ]
        },
        series: seriesData
    };

    myChart.setOption(option);
}
</script>

<style lang="less" scoped>
.echart{
    width: 100%;
    height: 100%;
}
</style>