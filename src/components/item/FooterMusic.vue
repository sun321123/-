<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon liebiao" aria-hidden="true" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-24gl-playCircle"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="updatePlayList_music">
        <use xlink:href="#icon-music_playlist"></use>
      </svg>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>

    <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%', width: '100%' }">
      <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"
        :Updatetime="updateTime" :repeatPlay="repeatPlay" />
    </van-popup>

    <van-popup v-model:show="playList_music" position="bottom" :style="{ height: '70%' }">
      <Itemlist  :updatePlayList_music="updatePlayList_music"/>
    </van-popup>
  </div>
</template>
<script>
import { watch, ref, computed } from "vue"

import { onUpdated } from "vue"
import { onMounted } from "vue"
import { useStore } from "vuex"
import MusicDetail from "@/components/item/MusicDetail.vue"
import Itemlist from "./Itemlist.vue"
export default {
  setup() {

    const interVal = ref(0)
    const audio = ref(null)

    const store = useStore()

    const playList = computed(() => {
      return store.state.playList
    })
    const playListIndex = computed(() => {
      return store.state.playListIndex
    })
    const isbtnShow = computed(() => {
      return store.state.isbtnShow
    })
    const detailShow = computed(() => {
      return store.state.detailShow
    })
    const playList_music = computed(() => {
      return store.state.playList_music
    })
    function play() {
      // 判断音乐是否播放
      if (audio.value.paused) {//暂停音乐返回true
        audio.value.play();//播放
        updateIsbtnShow(false)
        updateTime() //播放就调用函数进行传值
      } else {
        audio.value.pause();
        updateIsbtnShow(true)
        clearInterval(interVal) //暂停清除定时器
      }
    }
    function repeatPlay() {

      if (audio.value.paused) {
        audio.value.play();//播放
        updateTime()
      }
      else {
        audio.value.currentTime = 0
      }

    }
    function addDuration() {
      updateDuration(audio.value.duration)
    }

    function updateTime() {
      interVal.value = setInterval(() => {
        updateCurrentTime(audio.value.currentTime);
      }, 100);
    }

    onMounted(() => {
      store.dispatch("getLyric", playList.value[playListIndex.value].id)
      updateTime()
    })
    onUpdated(
      () => {
        store.dispatch("getLyric", playList.value[playListIndex.value].id)
        addDuration()
      }
    )

    function updateIsbtnShow(value) {

      store.commit("updateIsbtnShow", value)
    }

    function updateDetailShow() {

      store.commit("updateDetailShow")

    }
    function updatePlayList_music() {

      store.commit("updatePlayList_music")

    }
    function updateCurrentTime(value) {

      store.commit("updateCurrentTime", value)

    }
    function updateDuration(value) {

      store.commit("updateDuration", value)

    }

    watch(playListIndex, () => {
      audio.value.autoplay = true;
      if (audio.value.paused) {
        //如果是暂停状态，改变图标
        updateIsbtnShow(false)

      }
    })
    watch(playList, () => {
      if (isbtnShow) {
        audio.value.autoplay = true;
        updateIsbtnShow(false);
      }
    })

    return {
      audio,
      playList,
      playListIndex,
      isbtnShow,
      detailShow,
      play,
      addDuration,
      updateDetailShow,
      updateTime,
      repeatPlay,
      updatePlayList_music,
      playList_music



    }

  },
  components: {
    MusicDetail,
    Itemlist
  },
}
</script>
<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;

  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }

  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>