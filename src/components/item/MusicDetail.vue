<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg" />
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-xitongfanhui"></use>
      </svg>
      <div class="leftMarquee">
        <Vue3Marquee style="color: #fff">{{ musicList.al.name }}</Vue3Marquee>
        <span v-for="item in musicList.ar" :key="item">
          {{ item.name }}
        </span>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-fenxiang_o"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow">
    <img
      src="@/assets/needle-ab.png"
      alt=""
      class="img_needle"
      :class="{ img_needle_active: !isbtnShow }"
    />
    <img src="@/assets/cd.png" alt="" class="img_cd" />
    <img
      :src="musicList.al.picUrl"
      alt=""
      class="img_ar"
      @click="isLyricShow = true"
      :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }"
    />
  </div>
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
    <p
      v-for="item in lyric"
      :key="item"
      :class="{
        active:
          currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinle1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liuyan"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xuanzhuan"></use>
      </svg>
    </div>
    <div class="footerContent" >
      
      <span class="footspan1">{{currentTime.toFixed(1)+"秒"}}</span>
      
      <input ref="input" type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05"  />
      <span class="footspan2">{{duration.toFixed(1) + "秒"}}</span>
  
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true" v-if="!isRepeat" @click="repeat()">
        <use xlink:href="#icon-24gl-repeat2"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="repeat()">
        <use xlink:href="#icon-24gl-repeatOnce2"></use>
      </svg>
      <svg class="icon icon_upper " aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishou_huaban"></use>
      </svg>
      <svg
        class="icon bofang"
        aria-hidden="true"
        v-if="isbtnShow"
        @click="play"
      >
        <use xlink:href="#icon-24gl-playCircle"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon icon_upper" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayishou_huaban"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-music_playlist"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee"
import "vue3-marquee/dist/style.css"
import { useStore } from "vuex"
import {ref,watch,computed} from "vue"
import { onMounted, onUpdated } from "vue";
import { useRouter } from "vue-router";

export default {
  setup(props){
    const isLyricShow = ref(false)
    const isRepeat = ref(false)
    const store = useStore()
    const musicLyric = ref(null)
    const router = useRouter()
    //计算属性
    const lyricList = computed(()=>{
      return store.state.lyricList
    })
    // const currentTime = computed(()=>{
    //   return store.state.currentTime
    // })
    let currentTime = computed({

      get(){
        return store.state.currentTime

      },
      set(newValue){
        currentTime = newValue
      }
    })
    const playListIndex = computed(()=>{
      return store.state.playListIndex
    })
    const playList = computed(()=>{
      return store.state.playList
    })
    const duration = computed(()=>{
      return store.state.duration
    })
    //计算属性
    const lyric = computed(()=>{
      let arr;
      if (lyricList.value.lyric) {
        arr = lyricList.value.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);//parseInt将字符串转整数，也可以指定几进制
          }
          return { min, sec, mill, lrc, time }
        })
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        })
      }
      
      return arr

    })

    //回调函数
    onMounted(()=>{
      
      props.addDuration()
    })
    onUpdated(
  ()=>{
    
    props.addDuration()

  }
  )
    //函数
    function backHome(){
      isLyricShow.value = false
      updateDetailShow()
      // router.go(-1)

    }
    //函数
    function goPlay(num){
      if(!isRepeat.value){

        if (playList.value.length ===1){
        props.repeatPlay()
      }
      else{
        let index = playListIndex.value + num;
        
      if (index < 0) {
        index = playList.value.length - 1;
      } else if (index == playList.value.length) {
        index = 0;
      }
        updatePlayListIndex(index);
      }
        
    
      
      }
      else{
        // updatePlayListIndex(playListIndex.value)
        props.repeatPlay()
      }
      
      
    }
    //引用了store的mutations
    function updateDetailShow(value){
      store.commit("updateDetailShow",value)
    }
    function updatePlayListIndex(value){
      store.commit("updatePlayListIndex",value)
    }
    //侦听
    watch(currentTime,(newValue)=>{
      let p = document.querySelector("p.active");
      if (p) {
        if (p.offsetTop > 300) {
         musicLyric.value.scrollTop = p.offsetTop - 300;
          
        }
      }
      if(!(isRepeat.value)){
        
        if(newValue===duration.value){
       
       if(playListIndex.value===playList.value.length-1){
         updatePlayListIndex(0);
         props.play()
       }
       else{
          updatePlayListIndex(playListIndex.value+1);
          
       }
     }
    }
     else{
      
      if(newValue === duration.value){
        
          props.repeatPlay()
        
     }
      }
   

    })
    //管理单曲循环
    function repeat(){
        isRepeat.value = !isRepeat.value

    }

    return{isLyricShow,
      lyricList,
      currentTime,
      playListIndex,
      playList,
      duration,
      lyric,
      goPlay,
      backHome,
      musicLyric,
      isRepeat,
      repeat
      


    }
  },
  components: {
    Vue3Marquee,
  },
  props: {musicList:Object, 
    isbtnShow:Boolean, 
    play:Function,
    addDuration:Function,
    Updatetime:Function,
    repeatPlay:Function}
};
</script>
<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #fff;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #fff;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  p {
    color: rgb(190, 181, 181);
    margin-bottom: 0.3rem;
  }
  .active {
    color: #fff;
    font-size: 0.5rem;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .footerContent{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .footspan1{
      width: 10%;
      font-size: 10px;
      
    }
      
    }
    .range {
    width: 75%;
    height: 0.06rem;
    // margin-left: 5%;
    // margin-right: 5%;
   
  }
  .footspan2{
      width: 12%;
      font-size: 10px;
      // margin-right: 10%;
   
  }

  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: white
    }
    .icon_upper{
      width: 1rem;
      height: 0.8rem;
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>