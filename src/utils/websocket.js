import store from '@/store'
import { _ } from 'core-js';
import { from } from 'core-js/fn/array';
import { construct } from 'core-js/fn/reflect';
import { Notification } from 'element-ui';
import { Message } from 'element-ui'
import { baseWsUrl} from '../main'
// var baseUrl = baseUrl;

//部署到定边的时候将url改为'ws://+"定边服务器地址"+:8692/dbznyt/socket/'

var ws;
var tt;
var lockReconnect = false;//避免重复连接
var userId;

export const unRead =parseInt(window.sessionStorage.getItem("unRead"));


var websocket = {
    Init: function () {
        var _self = this;
        this.userId = JSON.parse(window.sessionStorage.getItem("user")).userId//缓存中取出用户id
        if ("WebSocket" in window) {
            ws = new WebSocket(baseWsUrl + this.userId);
        } else if ("MozWebSocket" in window) {
            ws = new MozWebSocket(baseWsUrl + this.userId);
        } else {
            console.log("您的浏览器不支持 WebSocket!");
            return;
        }

        ws.onmessage = function (e) {
            console.log("接收消息:" + e.data)
            var time = new Date().getTime();
            var userId = JSON.parse(window.sessionStorage.getItem("user")).userId;
            //将接收到的消息存储在localStorage
            var string = "{\"Title\":\"欢迎\",\"Message\":\"欢迎" + userId + "加入聊天\"}";
            var string1 = "心跳检测正常" + userId;
            if (string != e.data && string1 != e.data) {
                console.log("将接收到的消息存储在localStorage");
                console.log(this.UnReadQuantity);
                this.UnReadQuantity = parseInt( sessionStorage.getItem("unRead"));
                var unRead =parseInt( sessionStorage.getItem("unRead"));
                localStorage.setItem("historyMessage" + userId + time, e.data);
                this.UnReadQuantity = this.UnReadQuantity+1;
                this.unRead = this.unRead +1;
                unRead = unRead+1;
                sessionStorage.setItem("unRead",unRead);
                console.log(this.UnReadQuantity);
            }
            Message({
                message: '收到新的通知，请查看！',
                type: 'success',
                duration: 800,
            });
        }

        ws.onclose = function () {
            console.log("连接已关闭")
            Message({
                message: '连接已关闭',
                type: 'error',
            });
            reconnect(userId);
        }

        ws.onopen = function () {
            console.log("连接成功")
            Message({
                message: 'webSocket连接成功',
                type: 'success',
                duration: 800,
            });
            heartCheck.start();
        }

        ws.onerror = function (e) {
            console.log("数据传输发生错误");
            Message({
                message: '数据传输发生错误',
                type: 'error',
            });
            reconnect(userId)
        }
    },
    Send: function (toUserId, message) {
        var user = JSON.parse(window.sessionStorage.getItem("user"));
        let data = {
            fromUserId: user.userId,
            fromUserName: user.userName,
            toUserId: toUserId,
            time: new Date(),
            message: message
        }
        let msg = JSON.stringify(data)
        console.log("发送消息：" + msg)
        ws.send(msg)
    },
    getWebSocket() {
        return ws;
    },
    getStatus() {
        if (ws.readyState == 0) {
            return "未连接";
        } else if (ws.readyState == 1) {
            return "已连接";
        } else if (ws.readyState == 2) {
            return "连接正在关闭";
        } else if (ws.readyState == 3) {
            return "连接已关闭";
        }
    }
}

export default websocket

//根据消息标识做不同的处理
function messageHandle(message) {
    let msg = JSON.parse(message)
    switch (msg.flag) {
        case 'command':
            console.log("指令消息类型")
            break;
        case 'inform':
            console.log("通知")
            break;
        default:
            console.log("未知消息类型")
    }
}

function reconnect(sname) {
    if (lockReconnect) {
        return;
    };
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    tt && clearTimeout(tt);
    tt = setTimeout(function () {
        console.log("执行断线重连...")
        websocket.Init(sname);
        lockReconnect = false;
    }, 4000);
}

//心跳检测
var heartCheck = {
    timeout: 1000 * 60 * 3,
    timeoutObj: null,
    serverTimeoutObj: null,
    start: function () {
        console.log('开始心跳检测');
        var self = this;
        var userId = JSON.parse(window.sessionStorage.getItem("user")).userId;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            console.log('心跳检测...');
            ws.send("HeartBeat:" + userId);
            self.serverTimeoutObj = setTimeout(function () {
                if (ws.readyState != 1) {
                    ws.close();
                }
                // createWebSocket();
            }, self.timeout);

        }, this.timeout)
    }
}





