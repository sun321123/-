<template>
  <ItemMusicTop :playlist="state.playlist" />
  <ItemMusicList
    :itemList="state.itemList"
    :subscribedCount="state.playlist.subscribedCount"
  />
  
</template> 
<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList, getItemList } from "@/request/api/item.js";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import ItemMusicList from "@/components/item/ItemMusicList.vue";
import {useStore} from "vuex"
export default {
  setup() {
    const state = reactive({
      playlist: {}, //歌单的详情页的数据
      itemList: [], //歌单的歌曲
    });
    const store = useStore()
    // function updateMusci(value){
    //   store.commit("updateMusci",value)
    // }
    onMounted(async () => {
      let id = useRoute().query.id;
      
      //   获取歌单详情页
      let res = await getMusicItemList(id);
      // console.log("awa",res);
      state.playlist = res.data.playlist;
      //   获取歌单的歌曲
      let result = await getItemList({ id, limit: 20, offset: 0 });
      // console.log("result",result);
      state.itemList = result.data.songs

      // updateMusci(state.itemList)
      // //   防止页面刷新，数据丢失，将数据保存到sessionStorage中，不需要，只需要申明即可
      // sessionStorage.setItem("itemDetail", JSON.stringify(state));
    });
    return { state };
  },
  components: {
    ItemMusicTop,
    ItemMusicList,
    
  },
};
</script>