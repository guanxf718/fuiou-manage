<template>
    <el-container>
        <el-header>
            <app-header></app-header>
        </el-header>
        <el-container>
            <el-aside>
                <app-menu></app-menu>
            </el-aside>
            <el-main>
                <slot></slot>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { AppMenu, AppHeader } from "@/components";
export default {
    components: {
        AppMenu, AppHeader
    },
}
</script>

<style lang="scss" scoped>
.el-container {
    height: 100%;
}
.el-header {
    padding-left: 0;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
}
.el-aside {
    background-color: $color-nav-bg;
    width: auto !important;
}
</style>

