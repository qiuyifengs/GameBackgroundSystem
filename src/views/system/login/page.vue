<template>
<div class="page-login">
    <main style="width: 386px; margin: 0 auto">
        <!-- style="background-color: #fff; padding: 0px 24px 4px; border-radius: 4px" -->
        <a-form id="formLogin" ref="formLogin" :form="form" @submit="handleSubmit">
            <h1 style="font-size: 50px; margin-bottom: 0">你好！</h1>
            <p style="font-size: 26px">欢迎来到地球人联盟</p>

            <a-form-item>
                <a-input size="large" type="text" placeholder="账号" v-decorator="['user_name', {rules: [{ required: true, message: '请输入账号名' }]}]">
                    <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
            </a-form-item>

            <a-form-item>
                <a-input-password size="large" type="password" autocomplete="false" placeholder="密码" v-decorator="['password', {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}]">
                    <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input-password>
            </a-form-item>

            <!-- <a-row :gutter="8">
                <a-col class="gutter-row" :span="16">
                    <a-form-item>
                        <a-input size="large" type="text" placeholder="验证码" ref="captcha" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                            <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                        </a-input>
                    </a-form-item>
                </a-col>
                <a-col class="gutter-row" :span="8">
                    <img :src="imgHtml" @click.prevent="changeCaptcha" style="width: 100%; height: 40px; cursor: pointer; border: 1px solid #ddd; border-radius: 4px">
                </a-col>
            </a-row> -->

            <!-- <a-form-item style="margin-bottom: 12px">
                        <a-checkbox>自动登录</a-checkbox>
                    </a-form-item> -->

            <a-form-item>
                <a-button style="margin-top: 12px" size="large" type="primary" htmlType="submit" class="login-button" :loading="state.loginBtn" :disabled="state.loginBtn" block>登陆</a-button>
            </a-form-item>
        </a-form>
    </main>
</div>
</template>

<script>
import dayjs from 'dayjs'
import {
    mapActions
} from 'vuex'

export default {
    data() {
        return {
            imgHtml: '',
            loginBtn: false,
            form: this.$form.createForm(this),
            state: {
                loginBtn: false,
                loginType: 0,
            },
            timeInterval: null,
            time: dayjs().format('HH:mm:ss'),
        }
    },
    mounted() {
        this.timeInterval = setInterval(() => {
            this.refreshTime()
        }, 1000)
        this.changeCaptcha()
    },
    beforeDestroy() {
        clearInterval(this.timeInterval)
    },
    methods: {
        ...mapActions('d2admin/account', [
            'login'
        ]),
        changeCaptcha() {
            this.$api.CAPTCHA_CHECK().then(res => {
                this.imgHtml = 'data:image/png;base64,' + btoa(
                    new Uint8Array(res)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
            })
        },
        handleSubmit(e) {
            e.preventDefault()
            this.state.loginBtn = true
            const {
                form: {
                    validateFields
                },
                state,
                login
            } = this
            validateFields(['user_name', 'password'], {
                force: true
            }, (err, values) => {
                if (!err) {
                    console.log('login form', values)
                    login(values)
                        .finally(res => {
                            this.changeCaptcha()
                            state.loginBtn = false
                            this.$refs.captcha.select()
                        })
                } else {
                    setTimeout(() => {
                        state.loginBtn = false
                        this.$refs.captcha.select()
                    }, 600)

                }

            })
        },
        refreshTime() {
            this.time = dayjs().format('HH:mm:ss')
        },
    }
}
</script>

<style lang="scss">
.getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
}

.page-login {

    // 时间
    .page-login--layer-time {
        font-size: 24em;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.03);
        overflow: hidden;
    }
}
</style>
