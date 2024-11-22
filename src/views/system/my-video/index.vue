<template>
    <div>
        <h1>视频组件</h1>

        <div class="video">
            <video-player
                ref="videoPlayRef"
                :options="playerOptions"
                @timeupdate="handleTimeUpdate"
                @play="handlePlay"
                
            />
        </div>
    </div>
</template>

<script setup>
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import notFout from '@/assets/images/not-found.jpg';
import video from '@/assets/images/firm.mp4'
import { ref, onMounted, nextTick } from 'vue';

const playerOptions = ref({
  language: "zh-CN", // 语言
  playbackRates: [0.5, 1.0, 1.5],  // 倍速可选项 可自定义
  playsinline: true,
  width: '600',
  height: '400',
  mirror: false,
  controls: true, // 是否展示控制栏
//   poster: notFout,  // 封面图
  sources: [
    {
      // type为视频资源类型 application/x-mpegURL在总结着重介绍
      type: "video/mp4", 
      src: video
    },
  ],
});

const videoPlayRef = ref(null);
const playVideo = ref();
let watchMaxTime = ref(0); //当前可快进到的最大时长	单位为s
let copyCurrentTime = ref(0); //下次进入时继续播放的时长  单位为s

function handleTimeUpdate(player) {
    // console.log(player, 'play')
    // 当前播放时间
    let currentTime = player.target.player.cache_.currentTime
    // console.log(' onPlayerTimeupdate!', currentTime)

    var num = parseFloat(currentTime) - parseFloat(watchMaxTime.value)
    // console.log(num, 'numnumnum')
    if (num < 1) {	//正常播放时，记录当前播放时间
        watchMaxTime.value = currentTime < watchMaxTime.value ? watchMaxTime.value : currentTime // 如果播放时间小于 watchMaxTime 证明是后退了，最大时长 还是 watchMaxTime
        copyCurrentTime.value = currentTime
    } else {	// 差值大于1s时，视为拖动，将上一次记录的播放时间赋值给当前播放器的播放时间
        console.log(1111111111)
        playVideo.value.currentTime(watchMaxTime.value)
        copyCurrentTime.value = currentTime
    }

    // if(player.target.player.cache_.currentTime > 10) {
    //     playVideo.value.currentTime(2)
    // }
}

// 开始播放
function handlePlay(play) {
    // console.log(play,'play')
}
onMounted(() => {
    playVideo.value = videoPlayRef.value.$el.player
    // console.log(playVideo.value ,'playVideo.value ')
    // console.log(playVideo.value.currentTime(10) ,'playVideo.value ')
    
})

</script>

<style lang="less" scoped>
.video .vjs-big-play-button{
    top: 50%;
    height: 50%;
}
</style>

<style scoped>
/deep/ .vjs-big-play-button{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
