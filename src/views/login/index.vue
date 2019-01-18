<template>
    <div class="login-container">
        <div class="login-box">
            <header>欢迎登录</header>
            <section>
                <ul class="input-section-box">
                    <li>
                        <el-input placeholder="请输入登录账号" v-model="loginInfo.username">
                            <template slot="prepend">
                                <i class="icon-shuaqia iconfont"></i>
                            </template>
                        </el-input>
                    </li>
                    <li>
                        <el-input
                            type="password"
                            placeholder="请输入登录密码"
                            v-model="loginInfo.password"
                        >
                            <template slot="prepend">
                                <i class="icon-yuechi iconfont"></i>
                            </template>
                        </el-input>
                    </li>
                </ul>
            </section>
            <footer>
                <el-button @click="doLogin" type="success">登 录</el-button>
            </footer>
        </div>
    </div>
</template>

<script>
import service from "@/service";
import { mapActions } from "vuex";
export default {
    data() {
        return {
            // 登录后访问路径
            redirectInfo: {
                name: this.$route.query.redirect || "orderindex",
                query: this.$route.query.query || "{}",
                params: this.$route.query.params || "{}"
            },
            // 登录账号密码
            loginInfo: {
                username: "guanxiufeng",
                password: "123123",
            },
            // 回车登录
            isEnterLogin: false
        };
    },
    methods: {
        ...mapActions(["setUserInfoAction"]),
        // 参数信息验证
        paramCheck() {
            let res = { status: false, msg: "" };
            res.status = !(
                (!this.loginInfo.username && (res.msg = "账号信息为空！")) ||
                (!this.loginInfo.password && (res.msg = "密码为空！"))
            );
            return res;
        },
        // 登录操作
        doLogin() {
            let paramCheck = this.paramCheck();
            if (!paramCheck.status) {
                return this.$message.warning(paramCheck.msg);
            }
            service
                .doUserLogin({ ...this.loginInfo })
                .then(
                    res => {
                        if (res.data && res.data.resultCode == "000000") {
                            this.setUserInfoAction(res.data.data);
                            this.$router.replace({
                                name: this.redirectInfo.name,
                                query: JSON.parse(this.redirectInfo.query),
                                params: JSON.parse(this.redirectInfo.params)
                            });
                        } else {
                            this.$message.warning(res.data.message || "账号或密码错误！");
                        }
                    },
                    err => {
                        this.$message.error("服务器错误！");
                    }
                )
                .finally(() => {
                    this.$loading.close();
                });
        },
    },
    mounted() {
        this.isEnterLogin = true;
        document.onkeydown = event => {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) {
                this.isEnterLogin && this.doLogin();
            }
        };
    },
    beforeDestroy() {
        this.isEnterLogin = false;
    }
};
</script>

<style lang="scss" scoped>
.login-container {
    width: 100%;
    height: 100%;
    background-image: url("../../../public/img/login-bg.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: $color-gray-f8;
    @include flex-center(center, center);
    .login-box {
        width: 320px;
        height: auto;
        padding: $spacing-xx;
        background-color: rgba(255, 255, 255, 0.5);
        border: 1px solid $color-gray-e;
        border-radius: 6px;
        > header {
            margin-bottom: $spacing-xx;
            font-size: $text-xl;
            color: $color-gray-6;
            text-shadow: 0 1px 1px $color-white;
            text-align: center;
        }
        .input-section-box {
            padding: 0;
            li {
                margin-top: $spacing-x;
            }
        }
        > footer {
            margin-top: $spacing-xx;
            text-align: center;
            .el-button {
                min-width: 180px;
            }
        }
    }
}
</style>
