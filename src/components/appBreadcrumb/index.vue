<template>
    <el-breadcrumb>
        <el-breadcrumb-item v-for="el  in levelList" :key="el.index">
            <router-link :to="el.redirect||el.path">{{el.meta.title}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
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
        }
    }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
    padding-bottom: $spacing-x;
}
</style>

