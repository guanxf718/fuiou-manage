<template>
    <div class="content">
        <div class="left">管理平台</div>
        <div class="right">
            <div>
                <i
                    class="el-icon-menu hamburger"
                    :class="{'active':isCollapse}"
                    @click="changeMenu"
                ></i>
            </div>
            <div>
                <el-dropdown @command="dropdownCommand">
                    <span class="el-dropdown-link">
                        <i class="el-icon-more-outline"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="loginOut">
                            <i class="el-icon-share"></i>
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
export default {
    data() {
        return {
            isCollapse: false
        }
    },
    methods: {
        ...mapMutations(['CHANGEMENU']),
        ...mapMutations(["CLEAR_USER_INFO"]),
        ...mapActions(["doUserLoginoutAction"]),
        /**
         * 改变左侧导航栏
         */
        changeMenu() {
            this.isCollapse = !this.isCollapse;
            this['CHANGEMENU'](this.isCollapse);
        },
        /**
         * 退出登录
         */
        loginOut() {
            this.$confirm("是否确认退出登录？", "退出登录").then(
                confirm => {
                    this.doUserLoginoutAction().then(() => {
                        this.$router.push({ name: "login" });
                    });
                },
                cancel => { }
            );
        },
        /**
         * 下拉列表
         */
        dropdownCommand(command) {
            this[command] && this[command]();
        },
    }
}
</script>

<style lang="scss" scoped>
.content {
    @include flex-nowrap;
    .left {
        width: $menu-weight;
        font-size: $text-xxl;
        background-color: $color-gray-3;
        color: $color-white;
        text-align: center;
    }
    .right {
        flex-grow: 1;
        padding-left: $spacing-x;
        @include flex-nowrap;
        div:first-child {
            i {
                font-size: $text-xxl;
                line-height: $lineHeight-ml;
                cursor: pointer;
            }
            .hamburger {
                -webkit-transform-origin: 50% 50%;
                transform-origin: 50% 50%;
                transition: 0.38s;
                &.active {
                    -webkit-transform: rotate(90deg);
                    transform: rotate(90deg);
                    transition: 0.38s;
                }
            }
        }
        div:last-child {
            flex-grow: 1;
            text-align: right;
        }
    }
}
</style>

