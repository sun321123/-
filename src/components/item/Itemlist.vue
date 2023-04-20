<template>
    <div class="Top">
        <svg class="icon" aria-hidden="true" @click="backhome()">
        <use xlink:href="#icon-fanhui1-copy"></use>
    </svg>
    </div>
    

    <div class="itemList">
        
      <div class="item" v-for="(item, i) in Musiclist" :key="i">
        
        <div class="itemLeft" @click="playMusic(i)">

          <span class="leftSpan">{{ i + 1 }}</span>

          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="index">{{
              item1.name
            }}</span>
          </div>

        </div>

        <div class="itemRight">

          <svg class="icon bofang" aria-hidden="true" v-if='item.mv !=0'>
            <use xlink:href="#icon-24gl-playSquare"></use>
          </svg>

          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-24gl-playCircle"></use>
          </svg>

        </div>

      </div>

    </div>

</template>
<script>
import {useStore} from 'vuex'
import {computed} from "vue"



export default{

setup(props){
const store = useStore()
function backhome(){
    props.updatePlayList_music()
}
const Musiclist = computed(()=>{

return store.state.music
})

function playMusic(i){
      updatePlayList(Musiclist),
      updatePlayListIndex(i)
    }
    function updatePlayList(value){
      store.commit("updatePlayList",value)
    }
    function updatePlayListIndex(value){
      store.commit("updatePlayListIndex",value)
    }
return {
    backhome,
    Musiclist,
    playMusic

}
},
props:["updatePlayList_music"]
}

</script>

<style lang="less" scoped>
.Top{
    // display: flex;
    width: .6rem;
    height: .6rem;
    margin-left: .2rem;
    margin-top: .2rem;
    .icon{
        fill:#fff
    }
}
    .itemList {
    width: 100%;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 10px;
        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
            width: 4.54rem;
            height: .4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span{
            font-weight: 400;
            font-size: .24rem;
            color: #999;
          }
          margin-left: 0.3rem;
        }
      }
      .itemRight{
        padding: 10px;
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .icon{
          fill: #999;
        }
         .bofang{
            position: absolute;
            left: 0;
          }
         .liebiao{
            position: absolute;
            right: 0;
          }
      }
    }
  }


</style>