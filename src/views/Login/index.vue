<template>
    <div class="login">
        <el-row class="row-box">
            <el-col :lg="16" :md="12" :sm="0" :xs="0" class="login-r">
                <div class="">
                    <el-image class="w-400px h-360px mb-50px login-img" :src="bg" />
                    <div class="admin-title">欢迎登录 Y_9527 管理平台</div>
                    <div class="text">一个致力于后台系统的搭建</div>
                </div>
                <div class="record">网站备案号：豫ICP备2022022094号-1</div>
            </el-col>
            <el-col :lg="8" :md="12" :sm="24" :xs="24" class="login-l">
                <div class="login-header">
                    <el-image class="login-logo" :src="logo" />
                    <div class="logo-text">Y_9527 管理平台</div>
                </div>
                <div class="login-l-text">
                    <div class="line-l"></div>
                    <div class="login-text1">账号密码登录</div>
                    <div class="line-l"></div>
                </div>
                <!-- 输入框盒子 -->
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
                    <el-form-item prop="userName">
                    <el-input type="text" placeholder="请输入用户名" :suffix-icon="User" v-model="loginForm.loginName" />
                    </el-form-item>
                    <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" show-password :suffix-icon="Lock" v-model="loginForm.password" />
                    </el-form-item>
                    <el-form-item prop="securityCode">
                    <el-input
                        type="text"
                        placeholder="请输入验证码"
                        :suffix-icon="Open"
                        v-model="loginForm.securityCode"
                        @keydown.enter="handleKoiLogin"
                    ></el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-image class="code-img" :src="loginForm.captchaPicture" @click="handleCaptcha" />
                    <el-button text size="small" class="code-button" @click="handleCaptcha">
                        <div class="code-btn">看不清，换一张</div>
                    </el-button>
                    </el-form-item>
                    <!-- 登录按钮 -->
                    <el-form-item>
                    <el-button type="primary" v-if="!loading" class="login-btn" round @click="handleKoiLogin"
                        >登录</el-button
                    >
                    <el-button type="primary" v-if="loading" class="login-btn" round :loading="loading"
                        >登录中</el-button
                    >
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
    import { ref, reactive } from 'vue'
    import type { FormInstance, FormRules } from "element-plus";
    import { User, Lock, Open } from "@element-plus/icons-vue";
    import { initDynamicRouter } from "@/router/modules/dynamicRouter.ts";
    import { getAssets } from '@/utils/index.ts'
    import useUserStore from "@/stores/modules/user.ts";
    import useKeepAliveStore from "@/stores/modules/keepAlive.ts";
    import useTabsStore from "@/stores/modules/tabs.ts";
    import authLogin from './json/authLogin.json'
    
    // import { initDynamicRouter } from "@/routers/modules/dynamicRouter.ts";

    import { useRouter } from "vue-router";

    const bg = getAssets("login/bg.png");
    const logo = getAssets("logo/logo.webp");
    const loginFormRef = ref<FormInstance>();
    const loading = ref(false);

    const router = useRouter()

    const keepAliveStore = useKeepAliveStore();
    const tabsStore = useTabsStore();

    interface loginUser {
        loginName: string;
        password: string | number,
        securityCode: string | number,
        codeKey: string | number,
        captchaPicture: any,
    }

    const loginForm = reactive<loginUser>({
        loginName: "yuadmin",
        password: "123456",
        securityCode: "1234",
        codeKey: "",
        captchaPicture: ""
    })

    const loginRules = reactive<FormRules<loginUser>>({
        loginName: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        securityCode: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
    });

    /** 获取验证码 */
    const handleCaptcha = async () => {
        // try {
        //   const res: any = await getCaptcha();
        //   loginForm.codeKey = res.data.codeKey;
        //   loginForm.captchaPicture = res.data.captchaPicture;
        // } catch (error) {
        //   console.log(error);
        //   koiMsgError("验证码获取失败🌻");
        // }
    };

    /** 登录 */
    const handleKoiLogin = () => {
    if (!loginFormRef.value) return;
    (loginFormRef.value as any).validate(async (valid: any, fields: any) => {
        // @ts-ignore
        const loginName = loginForm.loginName;
        // @ts-ignore
        const password = loginForm.password;
        // @ts-ignore
        const securityCode = loginForm.securityCode;
        // @ts-ignore
        const codeKey = loginForm.codeKey;
        if (valid) {
        loading.value = true;
        try {
            const userStore = useUserStore()
            // 1、执行登录接口
            // const res: any = await koiLogin({ loginName, password, codeKey, securityCode });
            // userStore.setToken(res.data.tokenValue);
            userStore.setToken(authLogin.data.tokenValue);
            // 2、添加动态路由 AND 用户按钮 AND 角色信息 AND 用户个人信息
            await initDynamicRouter();

            // 3、清空 tabs数据、keepAlive缓存数据
            tabsStore.setTab([]);
            keepAliveStore.setKeepAliveName([]);

            // 4、跳转到首页
            loading.value = false;
            router.push('/home/index');
        } catch (error) {
            // 等待1秒关闭loading
            let loadingTime = 1;
            setInterval(() => {
            loadingTime--;
            if (loadingTime === 0) {
                loading.value = false;
            }
            }, 1000);
        }
        } else {
        console.log("登录校验失败", fields);
        }
    });
    };

</script>

<style lang="less" scoped>
    .login{
        min-height: 100vh;
        .row-box{
            min-height: 100vh;
        }
    }
    .login-r{
        display:flex;
        justify-content: center;
        align-items: center;
        background:#1e71ee;
        .login-img{
            width:400px;
            height:360px;
            margin-bottom:50px;
        }
        .admin-title{
            font-size:30px;
            color:#fff;
            margin-bottom:6px;
            line-height:50px;
            font-weight:700;
            text-align: center;
        }
        .text{
            color:rgb(229, 231, 235);
            text-align: center;
            font-size:18px;
        }
        .record{
            position: absolute;
            bottom: 10px;
            left: auto;
            font-size: 12px;
            font-weight: bold;
            color:#fdfdfd;
        }
    }
    .login-l{
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: #f3f4f6;
        .login-header{
            display:flex;
            align-items: center;
            .login-logo{
                width:36px;
                height:36px;
                border-radius:50%;
            }
            .logo-text{
                font-size:20px;
                color:#000;
                font-size:700;
                margin-left:6px;
            }
        }
        .login-l-text{
            display:flex;
            align-items: center;
            margin: 16px 0;
            color:#9ca3af;
            font-size:16px;
            .line-l{
                width: 64px;
                height: 1px;
                background: #d1d5db;
            }
            .login-text1{
                margin: 0 12px;
            }
        }
        .code-img{
            width: 100px;
            height: 30px;
        }
        .code-button{
            margin-left: 6px;
        }
        .code-btn{
            color: #9ca3af;
            user-select: none;
        }
        .code-btn:hover{
            color: #8b5cf6;
        }
        .login-btn{
            width:245px;
            padding: 8px 15px;
            border-radius:var(--el-border-radius-round);
            background-color: var(--el-color-primary)
        }
    }
</style>