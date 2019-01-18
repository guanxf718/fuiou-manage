<template>
    <div class="table-wrapper full">
        <div class="search-header clear">
            <div>
                <el-input
                    v-if="innerObj.condition.input"
                    placeholder="请输入内容"
                    v-model="paging.inputValue"
                    @keyup.enter.native="searchData"
                >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-date-picker
                    v-if="innerObj.condition.date"
                    v-model="paging.queryDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
                <el-select
                    v-if="innerObj.condition.state"
                    v-model="paging.stateValue"
                    placeholder="状态"
                >
                    <el-option
                        v-for="item in innerObj.state"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-button type="primary" @click="searchData">搜索</el-button>
            </div>
            <div>
                <el-button
                    v-if="innerObj.condition.add"
                    type="primary"
                    @click="add"
                >新增{{innerObj.pageTitle}}</el-button>
            </div>
        </div>
        <div class="search-content">
            <el-table slot="table" :data="innerObj.dataList.dataBody" height="100" stripe>
                <el-table-column type="index" label="ID"></el-table-column>
                <template v-for="v in innerObj.dataList.dataHead">
                    <el-table-column
                        v-if="v.operations"
                        :prop="v.prop"
                        :label="v.label"
                        :width="v.width"
                    >
                        <template slot-scope="scope">
                            <el-button
                                v-for="o in v.operations"
                                :key="o.index"
                                size="small"
                                @click="operations(scope.row,o.func)"
                                :type="o.type"
                            >{{o.label}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column v-else :prop="v.prop" :label="v.label" :min-width="v.width"></el-table-column>
                </template>
            </el-table>
        </div>
        <div>
            <el-pagination
                :page-size="paging.pageSize"
                @current-change="currentChange"
                background
                layout="prev, pager, next"
                :total="paging.rowCount"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            required: true
        },
        innerObj: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            paging: this.value,
        }
    },
    watch: {
        'paging.stateValue'() {
            this.searchData();
        },
    },
    methods: {
        /**
         * 分页
         */
        currentChange(val) {
            this.paging.pageCount = val;
            this.searchData();
        },
        /**
         * 操作按钮
         */
        operations(row, func) {
            this.$parent.operations(row, func);
        },
        /**
         * 新增
         */
        add() {
            this.$parent.add();
        },
        /**
         * 搜索
         */
        searchData() {
            this.$parent.searchData();
        },
    },
}
</script>

<style lang="scss" scoped>
.table-wrapper {
    @include flex-column;
    > div {
        &.search-header {
            min-height: 40px;
            @include flex-nowrap;
            > div:nth-child(1) {
                flex-grow: 1;
                .el-input {
                    width: 300px;
                }
                & > * {
                    margin: 0 $spacing-s $spacing-s 0;
                }
            }
        }
        &.search-content {
            flex-grow: 1;
            height: 80%;
            .el-table {
                height: 100% !important;
            }
        }
    }
}
</style>

