import service  from "..";
// 获取首页轮播图的数据
export function getBanner(){
    return service({
        method:"GET",
        url:"/banner?type=2",
    })
}
//获取发现好歌单
export function getMusicList(){
    return service({
        method:"GET",
        url:"/personalized?limit=10"
        // url:"/personalized/newsong?limit=10"
    })
}
//搜索
export function getSearchMusic(data){
    return service({
        method:"GET",
        url:`/cloudsearch?keywords=${data}`
    })
}
//登录
export function getPhoneLogin(data){
    return service({
        method:"GET",
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
//获取用户详情
export function getLoginUser(data){
    return service({
        method:"GET",
        url:`/user/detail?uid=${data}`
    })
}

// /login/qr/key
//二维码登录

export function getQRkey(){
    return service({
        method:"GET",
        url:`/login/qr/key`
    })
}

export function getQRkey2(key){
    return service({
        method:"GET",
        url:`/login/qr/create?key=${key}`
    })
}

export function getQRkey3(key){
    return service({
        method:"GET",
        url:`/login/qr/check?key=${key}`
    })
}
