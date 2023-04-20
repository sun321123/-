<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-xitongfanhui"></use>
    </svg>
    <input
      type="text"
      :placeholder="placeholder"
      v-model="searchKey"
      @keydown.enter="enterKey"
    />
  </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span
      v-for="item in keyWorldList"
      :key="item"
      class="spanKey"
      @click="searchHistory(item)"
    >
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
     <div class="itemList">
      <div class="item" v-for="(item, i) in searchList" :key="i">
        <div class="itemLeft" @click="updateIndex(item);updateMusci(item)">
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
import { getSearchMusic } from "@/request/api/home.js";
import { onMounted } from "vue";
import { ref ,computed} from "vue";
import { useStore } from "vuex";
export default {
  setup(){
    const keyWorldList = ref([])
    const searchKey = ref("") 
    const searchList =  ref([])
    const placeholder = ref("陈奕迅")
    const store = useStore()
    const Musiclist = computed(()=>{
      return store.state.music
    })
    onMounted(()=>{
      keyWorldList.value = JSON.parse(localStorage.getItem("keyWorldList")) ? JSON.parse(localStorage.getItem("keyWorldList")):[]
    })
    function popMusic() {
      store.commit("popMusic")
    }
    function updateMusci(value) {
      if (!Musiclist.value.includes(value)) {
        store.commit("updateMusci", value)
        if (Musiclist.value.length > 20) {
          popMusic()
        }
      }

    }
    async function enterKey(){
      if (this.searchKey !== "") {
        keyWorldList.value.unshift(searchKey.value);
        //   去重
        keyWorldList.value = [...new Set(keyWorldList.value)];
        // 固定长度
        if (keyWorldList.value.length > 10) {
          keyWorldList.value.splice(keyWorldList.value.length - 1, 1);//从哪个位置开始，删除几个
        }
        localStorage.setItem("keyWorldList", JSON.stringify(keyWorldList.value))
        let res = await getSearchMusic(searchKey.value);
        // console.log(res);
        searchList.value = res.data.result.songs;
        searchKey.value = ""
      }
      else{
        keyWorldList.value.unshift(placeholder.value);
        //   去重
        keyWorldList.value = [...new Set(keyWorldList.value)];
        // 固定长度
        if (keyWorldList.value.length > 10) {
          keyWorldList.value.splice(keyWorldList.value.length - 1, 1);//从哪个位置开始，删除几个
        }
        localStorage.setItem("keyWorldList", JSON.stringify(keyWorldList.value))
        let res = await getSearchMusic(placeholder.value);
        console.log(res)
        searchList.value = res.data.result.songs;
       
      }
    }
    function delHistory(){
      localStorage.removeItem("keyWorldList")
      keyWorldList.value = [];
    }
    async function searchHistory(item){
      let res = await getSearchMusic(item);

      searchList.value = res.data.result.songs;
    }
    function  updateIndex(item){
      // item.al=item.album
      // item.al.picUrl=item.album.artist.img1v1Url
      store.commit("pushPlayList",item)
      store.commit("updatePlayListIndex",store.state.playList.length-1)
    }
   
  
        
    return {
      keyWorldList,
      searchKey,
      searchList,
      enterKey,
      delHistory,
      searchHistory,
      updateIndex,
      placeholder,
      updateMusci


    }
  }
};
</script>
<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(185, 169, 169);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}
 .itemList {
    width: 100%;
    padding: .2rem;
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