import {
  createStore
} from 'vuex'
import {
  getMusicLyric
} from "@/request/api/item.js"
import {getPhoneLogin} from "@/request/api/home.js"
import {getQRkey2,getQRkey3 } from '@/request/api/home.js'
export default createStore({
  state: {
    playList: [{ //播放列表
      al: {
        id: 89039055,
        name: "雨爱抖音版",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568495"
      },
      id: 1446137141,
      name: "雨爱（抖音版）",
      ar:[{name: "灏灏灏仔"}]
    }],
    playListIndex: 0, //默认下标为0
    isbtnShow: true, //暂停按钮的显示
    detailShow: false, //歌曲详情页的显示
    playList_music:false,//列表显示
    lyricList:{},//歌词
    currentTime:0,//当前时间
    duration:0,//歌曲总时长
    isLogin:false,//判断是否登录
    isFooterMusic:true,//判断底部组件是否需要显示
    token:"",
    user:{},//用户信息
    music:[],//歌曲信息
    url_addre:"",//二维码地址
  },
  mutations: {

    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value
    },
    pushPlayList:function(state,value){
      state.playList.push(value)
    },
    updatePlayList: function (state, value) {
      state.playList = value
      // console.log(state.playList);
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow
    },
    updateMusci:function (state,value){
      state.music.unshift(value)
    },
    popMusic:function (state){
      state.music.splice(state.music.length -1,1)
    }
    ,
    updatePlayList_music: function (state) {
      state.playList_music= !state.playList_music
    },
    updateLyricList:function(state,value){
      state.lyricList=value
    },
    updateCurrentTime:function(state,value){
      // console.log(state.currentTime);
      state.currentTime=value
    },
    updateDuration:function(state,value){
      state.duration=value
    },
    updateIsLogin:function(state,value){
      state.isLogin=true
    },
    updateToken:function(state,value){
      state.token=value
      localStorage.setItem('token',state.token)
    },
    updateUser:function(state,value){
      state.user=value
    },
    updateUrl_addre:function(state,value){
      state.url_addre = value
    }
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      
      context.commit("updateLyricList",res.data.lrc)
    },
    getLogin:async function(context,value){
      let res=await getPhoneLogin(value);
      // console.log(res);
      return res
    },
    getKey2:async function(context,value){
      let res = await getQRkey2(value)
      context.commit("updateUrl_addre",res.data.data.qrurl)
      return res
      
    }
  },
  modules: {}
})