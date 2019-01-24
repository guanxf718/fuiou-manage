<template>
    <el-container class="full">
        <el-header>
            <app-header></app-header>
        </el-header>
        <el-container>
            <el-aside>
                <app-menu></app-menu>
            </el-aside>
            <el-main>
                <div>
                    <section>
                        <app-breadcrumb v-if="$route.name!=='home'"></app-breadcrumb>
                    </section>
                    <section>
                        <slot name="view"></slot>
                    </section>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { AppMenu, AppHeader, AppBreadcrumb } from "@/components";
export default {
    components: {
        AppMenu, AppHeader, AppBreadcrumb
    },
}
</script>

<style lang="scss" scoped>
.el-header {
    padding-left: 0;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    height: $lineHeight-ml!important;
    line-height: $lineHeight-ml!important;
}
.el-aside {
    background-color: $color-nav-bg;
    width: auto !important;
}
.el-main {
    > div {
        height: 100%;
        @include flex-column;
        > section {
            &:nth-child(2) {
                flex-grow: 1;
                height: 80%;
            }
        }
    }
}
</style>

