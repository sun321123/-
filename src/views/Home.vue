<template>
  <div>
    <Topnav />
    <SwTop />
    <IconList />
    <Music />
  </div>
</template>

<script>
import Topnav from "@/components/home/Topnav.vue"
import SwTop from "@/components/home/SwiperTop.vue"
import IconList from "@/components/home/IconList.vue";
import Music from "@/components/home/MusicList.vue"

export default {
  name: 'Home',
  components: {
    Topnav,
    SwTop,
    IconList,
    Music

  }
}
</script>

