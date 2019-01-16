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
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            isCollapse: false
        }
    },
    methods: {
        ...mapMutations(['CHANGEMENU']),
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
            console.log('退出登录');
        },
        /**
         * 
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
    & > div {
        height: $lineHeight-l;
        line-height: $lineHeight-l;
    }
    .left {
        max-width: $menu-weight;
        font-size: $text-xxl;
        background-color: $color-gray-3;
        color: $color-white;
        text-align: center;
    }
    .right {
        padding-left: $spacing-x;
        @include flex-nowrap;
        div:first-child {
            i {
                font-size: $text-xxl;
                line-height: $lineHeight-l;
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
            text-align: right;
        }
    }
}
</style>

