<template>
    <div>
        <section>
            <el-breadcrumb>
                <el-breadcrumb-item v-for="el  in levelList" :key="el.index">
                    <router-link :to="el.redirect||el.path">{{el.meta.title}}</router-link>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </section>
        <section>
            <i class="el-icon-back" @click="routerBack"></i>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            levelList: null
        }
    },
    mounted() {
        this.getBreadcrumb();
    },
    methods: {
        getBreadcrumb() {
            let matched = this.$route.matched.filter(el => el.name);
            const first = matched[0];
            if (first && first.name !== 'home') {
                matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched);
            }
            this.levelList = matched;
        },
        routerBack(){
            this.$router.go(-1);
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    }
}
</script>

<style lang="scss" scoped>
div {
    line-height: 18px;
    @include flex-nowrap;
    > section:first-child {
        flex-grow: 1;
    }
    > section:last-child {
        text-align: right;
        cursor: pointer;
        font-size: $text-l;
        color: $color-gray-9;
    }
    .el-breadcrumb {
        padding-bottom: $spacing-x;
    }
}
</style>

