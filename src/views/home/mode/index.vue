<template>
    <div>
        <h3>选择您心仪的店铺模版：</h3>
        <div class="alook">
            <ul>
                <li
                    v-for="el in alookList"
                    :key="el.index"
                    @click="userClick(el.id)"
                    :class="active==el.id?'active':''"
                >
                    <img v-if="active==el.id" class="active-img" src="/img/page/iPhone X.png" alt>
                    <img class="look-img" :src="el.url" alt>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 1,
            alookList: [
                {
                    id: 1,
                    url: '/img/page/page1.jpeg'
                },
                {
                    id: 2,
                    url: '/img/page/page2.jpeg'
                },
                {
                    id: 3,
                    url: '/img/page/page3.jpeg'
                },
            ]
        }
    },
    methods: {
        userClick(id) {
            if (this.active != id) {
                this.$confirm(`您确定选择当前模版吗？`, `模版`).then(
                    confirm => {
                        this.active = id;
                    },
                    cancel => {
                        this.$loading.close();
                    }
                );
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.alook {
    > ul {
        @include flex-nowrap;
        justify-content: space-around;
        padding: 40px;
        li {
            width: 21%;
            box-sizing: border-box;
            overflow: hidden;
            padding: 1% 1.2%;
            .look-img {
                border: 1px solid $color-gray-e;
            }
            &.active {
                position: relative;
                .active-img {
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                .look-img {
                    border: 1px solid transparent;
                }
            }
        }
    }
}
</style>

