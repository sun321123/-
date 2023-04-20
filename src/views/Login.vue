<template>
  <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <!-- <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号码"
      />
      <input
        type="password"
        name="passworld"
        class="passworld"
        v-model="password"
        placeholder="请输入密码"
      /> -->

      <button class="btn" @click="Login()">显示二维码</button> 
      <button class="btn" @click="static1()">查看二维码状态</button> 
      <div id="qrcode" ref="qrcode">{{qrvalue}}
      </div>
    </div>
  </div>
</template>
<script>

import {getQRkey,getQRkey2,getQRkey3} from "@/request/api/home.js"

import QRCode from "qrcodejs2";
import { ref,watch} from "vue";

import { useStore } from "vuex";
export default{
    
  setup(){
    const store = useStore()
    const qrcode = ref(null)
    // function GetKey2(value){
    //   store.dispatch("getKey2",value)
    // }

    const url = ref("")
    const cookies = ref("")
    const code = ref(null)
    async function Login(){
      let res = await getQRkey()
          // console.log(res);
          url.value = (await getQRkey2(res.data.data.unikey)).data.data.qrurl
          // console.log(url.value)
          
    }
   async function static1(){
      let res = await getQRkey()
      let url_static = (await getQRkey3(res.data.data.unikey))
      cookies.value = url_static.data.cookie
      code.value = url_static.data.code
      console.log(url_static)
   }
   watch(url,()=>{
    qr()
   })
   watch(cookies,()=>
   {if (cookies.value !== ""){
    console.log("cookies",cookies.value)
   }
  }
   )
   watch(code,()=>{
    console.log("code",code.value)
   })
    function qr(){
      if (qrcode.value){
        console.log(qrcode.value)
        qrcode.value.innerHTML = ""
      }
      new QRCode("qrcode", {
      width: 200, // 二维码宽度
      height: 200, // 二维码高度
      text: url.value
    });
    }
    return {
      Login,
      url,
      qrcode,
      static1
    }
   
  }
   

}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(195, 189, 189);
  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }
  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .btn{
      margin: 0 auto;
        width: 4rem;
        height: .6rem;
    }
  }
}
</style>
