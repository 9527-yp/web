<template>
    <div ref="carbonForecastRef" class="echart"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const carbonForecastRef = ref(null);

let myChart = null;
const getEchart = () => {
    myChart = echarts.init(carbonForecastRef.value);

    let data1 = ["计划", '实际'];
    let data2 = ["11", "22", "33", "44", "55", "66", "77"];
    let data3 = [4000, 6000, 7000, 2000, 5000, 7000, 9000];
    let data4 = [1000, 4000, 5000, 6000, 3000, 8000, 7000];
    let option = {
        backgroundColor:'#222',
        tooltip: {
            show: true,
            trigger: "axis",
            textStyle: {
                color: "#000"
            },
            axisPointer: {
                lineStyle: {
                    color: "#4681C2"
                }
            },
        },
        grid: {
                left: "2%",
                right: "5%",
                bottom: "5%",
                top: "70px",
                containLabel: true
        },
        legend: {
            show: true,
            top: "15px",
            left: "15%",
            itemWidth: 20,
            itemHeight: 2,
            formatter: ["{a|{name}}"].join("\n"),
            textStyle: {
            fontSize: 12,
            color: "#fff",
            height: 8,
            rich: {
                a: {
                verticalAlign: "bottom"
                }
            }
            },
            data: data1
        },
        xAxis: {
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#04BBFF',
                    width: '1', //坐标线的宽度
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#fff', //底部文字颜色
                fontSize: 12,
            },
            data: data2
        },
        yAxis: {
            name: "单位/t",
            nameTextStyle: {
                align: 'right',
                fontSize: 11,
                color: '#fff',
            },
            type: 'value',
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'transparent', //左边框颜色
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#04BBFF',
                    width: '0.5',
                    type: 'dashed'
                }
            },
            axisTick: { show: false },
            axisLabel: {
                show: true,
                fontSize: 12,
                color: '#fff', //左文字颜色
            },
        },
        series: [
            {
                type: "line",
                symbol: "none",
                smooth: true,
                name: '计划', // 图例对应类别
                data: data3, // 纵坐标数据
                lineStyle: {
                    width: 2
                },
                emphasis: {
                    focus: 'series', // 高亮状态是否淡出其他图形
                },
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: 'rgba(29, 241, 250, 1)' },
                    { offset: 1, color: 'rgba(247, 147, 29, 1)' }
                ]),
            },
            {
                type: "line",
                symbol: "none",
                smooth: true,
                name: '实际', // 图例对应类别
                data: data4, // 纵坐标数据
                lineStyle: {
                    width: 2
                },
                emphasis: {
                    focus: 'series', // 高亮状态是否淡出其他图形
                },
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(106, 130, 241, 1)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(101, 212, 250, 1)'
                    }
                ]),
                
            }
        ]
    };

    myChart.setOption(option);
}

onMounted(() => {
    getEchart();
})
</script>

<style lang="less" scoped>
.echart{
    width: 100%;
    height: 100%;
}
</style>