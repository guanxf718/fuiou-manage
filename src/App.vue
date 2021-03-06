<template>
    <div id="app">
        <app-layout v-if="$route.meta && $route.meta.appLayout">
            <transition name="slide-fade" mode="out-in" slot="view">
                <router-view></router-view>
            </transition>
        </app-layout>
        <transition v-else name="slide-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

import { AppLayout } from "@/components";
import { mapActions } from "vuex";
import service from "@/service";

export default {
    name: 'app',
    components: {
        AppLayout
    },
    mounted() {
        this.initStoreAction();
        this.$root.commonCall = this.commonCall;
    },
    methods: {
        ...mapActions(["initStoreAction"]),
        /**
         * 全局ajax方法封装，页面通过 this.$root.commonCall() 调用相关api方法
         * @param {String} serviceName // 接口名
         * @param {Object} params // 接口请求参数
         * @param {Object} callback // 回调配置 {success(res) ,fail(res),failMsg,error(err)}； fail和failMsg二者取其一
         * @param {Boolean} isLoading // 是否显示loading
         */
        commonCall(serviceName, params, callback, isLoading = true) {
            return new Promise((resolve, reject) => {
                isLoading && this.$loading.open();
                service[serviceName](params)
                    .then(
                        res => {
                            if (res.data.respCode) {
                                let code = res.data.respCode;
                                switch (code) {
                                    case 'TK04':
                                        this.$message.warning(
                                            res.data.message ||
                                            (callback ? callback.failMsg : null) ||
                                            "登录已失效，请重新登录！"
                                        );
                                        // this.$router.push({ name: 'login' });
                                        break;
                                    default:
                                        callback && callback.success && callback.success(res.data.data);
                                        resolve();
                                        break;
                                }
                            } else {
                                if (callback && callback.fail) {
                                    callback.fail(res);
                                } else {
                                    this.$message.warning(
                                        res.data.message ||
                                        (callback ? callback.failMsg : null) ||
                                        "获取数据失败！"
                                    );
                                }
                                reject();
                            }
                        },
                        err => {
                            if (callback && callback.error) {
                                callback.error(err);
                            } else {
                                this.$message.error(
                                    (callback ? callback.errorMsg : null) || "服务器错误！"
                                );
                            }
                            reject();
                        }
                    )
                    .finally(() => {
                        isLoading && this.$loading.close();
                    });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
#app {
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-width: 1200px;
}
</style>

