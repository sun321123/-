import {Button,Swipe,SwipeItem,Popup,Progress } from "vant"

let plu = [
    Button,Swipe,SwipeItem,Popup,Progress
]

export default function results(app){
    plu.forEach((item)=>{return app.use(item)})
}