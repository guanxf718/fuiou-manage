<template>
    <div>
        <el-menu
            :default-active="activeTag"
            :collapse="changeMenu"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-submenu v-for="el in menuList" :key="el.index" :index="el.name">
                <template slot="title">
                    <i :class="el.meta.icon"></i>
                    <span>{{el.meta.title}}</span>
                </template>
                <el-menu-item
                    v-for="_el in el.children"
                    v-if="!_el.meta.none"
                    :key="_el.index"
                    :index="_el.name"
                    @click="pathTo(_el.name)"
                >{{_el.meta.title}}</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import routerList from '@/router/router';

export default {
    data() {
        return {
            //列表
            menuList: [],
            activeTag: ''
        }
    },
    mounted() {
        // 获取路由列表
        this.getRouter();
    },
    methods: {
        /**
         * 从路由配置获取列表并过滤
         */
        getRouter() {
            this.menuList = routerList.filter(el => el.meta && el.meta.appLayout);
            this.initMenuActive();
        },
        /**
         *  初始化菜单激活状态
         */
        initMenuActive() {
            let curMenuTag = this.$route.name;
            if (curMenuTag !== this.activeTag) {
                this.activeTag = curMenuTag;
            }
        },
        /**
         * 页面跳转
         */
        pathTo(name) {
            this.$router.push({ name: name, params: {}, query: {} });
        },
    },
    watch: {
        $route(to, from) {
            this.activeTag = to.name;
        }
    },
    computed: {
        ...mapGetters(['changeMenu']),
    }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: $menu-weight;
}
.el-menu {
    border: 0;
}
</style>

