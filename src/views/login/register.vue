<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'

const data = ref({
    username: '',
    password: '',
    confirm_password: '',
    email: '',
    verification_code: '',
})

// ---------- 验证码 ----------
const captchaText = ref('获取验证码')
const captchaState = ref(false)
const captchaIndex = ref(30)
const captchaBtn = async () => {
    // 开始发送验证码
    ElMessage.success("发送成功！")
    captchaState.value = true
    captchaText.value = `${captchaIndex.value} 秒`
    const countdownInterval = setInterval(() => {
        captchaIndex.value--
        captchaText.value = `${captchaIndex.value} 秒`
        // 当倒计时结束
        if (captchaIndex.value <= 0) {
            clearInterval(countdownInterval)  // 停止倒计时
            captchaText.value = "重新获取验证码"  // 恢复按钮文本
            captchaState.value = false  // 重新启用按钮
            captchaIndex.value = 30  // 重置倒计时
        }
    }, 1000)
}

const registerBtn = async () => {
    ElMessage.success('注册成功！')
    router.push('/login')
}
</script>

<template>
    <div class="login">
        <div class="box">
            <h2 class="title">MXH-REGISTER</h2>
            <input class="username" v-model="data.username" type="username" placeholder="用户名">
            <input class="password" v-model="data.password" type="password" placeholder="密码">
            <input class="password" v-model="data.confirm_password" type="password" placeholder="确认密码">
            <input class="email" v-model="data.email" type="email" placeholder="邮箱">
            <input class="text" v-model="data.verification_code" type="text" placeholder="邮箱验证码">
            <button class="textBtn" :disabled="captchaState" @click="captchaBtn">{{ captchaText }}</button>
            <button class="btnLogin" @click="registerBtn">注册</button>
            <div class="account">
                <span>已有账号？<button @click="router.push('/login')">返回登录</button></span>
            </div>
            <div class="copyright">
                Copyright © 2024-2024
                <a href="/" style="color: #409eff;">喵星汇</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;

    .box {
        padding: 20px;
        width: 400px;
        min-width: 300px;
        background-color: #88888850;

        .title {
            margin: 10px 0;
            text-align: center;
            font-size: 20px;
        }

        .username,
        .password,
        .email {
            margin: 10px 0;
            padding: 0 10px;
            width: 100%;
            height: 40px;
            font-size: 12px;
            border: none;
            outline: none;
        }

        .text {
            float: left;
            margin: 10px 0;
            padding: 0 10px;
            width: 68%;
            height: 40px;
            font-size: 12px;
            border: none;
            outline: none;
        }

        .textBtn {
            float: right;
            margin: 10px 0;
            padding: 0 10px;
            width: 30%;
            height: 40px;
            font-size: 12px;
            border: none;
            transition: .2s;
            cursor: pointer;
        }

        .btnLogin {
            margin: 20px 0;
            width: 100%;
            height: 40px;
            font-size: 12px;
            background-color: #f0f0f0;
            border: none;
            transition: .2s;
            cursor: pointer;
        }

        .btnLogin:hover {
            background-color: #fcfcfc;
        }

        .account {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;

            button {
                color: #1f75cb;
                font-size: 12px;
                background-color: #ffffff00;
                border: none;
                cursor: pointer;
            }
        }

        .copyright {
            margin-top: 20px;
            width: 100%;
            color: #6c757d;
            font-size: 12px;
            text-align: center;
        }
    }
}
</style>