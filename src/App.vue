<template>
    <div id="app">
        <transition name="slide-fade" mode="out-in">
            <app-layout>
                <router-view></router-view>
            </app-layout>
        </transition>
    </div>
</template>

<script>

import { AppLayout } from "@/components";
export default {
    name: 'app',
    components: {
        AppLayout
    }
}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
}
</style>
