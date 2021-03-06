import store from '@/store'
import { _ } from 'core-js';

import router from "../router";

// import { from } from 'core-js/fn/array';
// import { construct } from 'core-js/fn/reflect';
// import { Notification } from 'element-ui';
import { Alert } from 'element-ui'
import { confirm } from 'element-ui'
import { MessageBox } from 'element-ui';
import { Message } from 'element-ui'
import { baseWsUrl } from '../main' //ws通信地址
// var baseUrl = baseUrl;

//部署到定边的时候将url改为'ws://+"定边服务器地址"+:8692/dbznyt/socket/'

var ws;
var tt;
var lockReconnect = false;//避免重复连接
var userId;
var userName;



var websocket = {
    Init: function () {
        var _self = this;
        this.userId = JSON.parse(window.sessionStorage.getItem("user")).userId//缓存中取出用户id
        this.userName = JSON.parse(window.sessionStorage.getItem("user")).userName//缓存中取出用户id
        if ("WebSocket" in window) {
            ws = new WebSocket(baseWsUrl + this.userId);
        } else if ("MozWebSocket" in window) {
            ws = new MozWebSocket(baseWsUrl + this.userId);
        } else {
            console.log("您的浏览器不支持 WebSocket!");
            return;
        }

        ws.onmessage = function (e) {
            console.log("接收消息:" + JSON.parse(e.data))
            var time = new Date().getTime();
            var userId = JSON.parse(window.sessionStorage.getItem("user")).userId;
            //接收消息时弹出消息弹窗
            var string = "{\"Title\":\"欢迎\",\"Message\":\"欢迎" + userId + "加入聊天\"}";
            var string1 = "心跳检测正常" + userId;
            if (string != e.data && string1 != e.data) {
                var resu = JSON.parse(e.data);
                console.log(resu);
                if (null != resu.type && "" != resu.type) {
                    // console.log(resu.content);
                    console.log(resu.content.length);
                   MessageBox.confirm('当前'+ resu.content.length +'口井存在异常！', '异常报警', {
                        confirmButtonText: '查看详情',
                        cancelButtonText: '已收到！',
                        type: 'error'
                      }).then(() => {
                          console.log("跳转页面");
                        router.push({ path: "/diagnosis/alarmpush/alarmpush" });
                      }).catch(() => {
                        Message({
                          type: 'info',
                          message: '收到异常信息！'
                        });          
                      });

                } else {
                    Message({
                        message: '收到新的通知，请查看！',
                        type: 'success',
                        duration: 800,
                    });
                }
            }
            //处理心跳测试成功消息
            else if (string1 == e.data) {
                console.log("心跳检测正常！");
                heartCheck.start();
            }
        }

        ws.onclose = function () {
            console.log("连接已关闭")
            Message({
                message: '连接已关闭',
                type: 'error',
            });
            // reconnect(userId);
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

export default websocket;

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
    //没连接上会一直重连，设置延迟避免请求过多，延迟设置两分钟。
    tt && clearTimeout(tt);
    tt = setTimeout(function () {
        console.log("执行断线重连...")
        websocket.Init(sname);
        lockReconnect = false;
    }, 120000);
}

//心跳检测
var heartCheck = {
    //每三分钟进行一次心跳检测
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
            }, self.timeout);
        }, this.timeout)

    }
}





