<template>
    <div class="table-wrapper full">
        <div class="search-header clear">
            <div>
                <el-input
                    v-if="innerObj.condition.input"
                    placeholder="请输入内容"
                    v-model="originalFree.inputValue"
                    @keyup.enter.native="searchData"
                >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-date-picker
                    v-if="innerObj.condition.date"
                    v-model="originalWatch.queryDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
                <el-select
                    v-model="originalWatch[el.bind]"
                    v-for="(el,index) in innerObj.stateList"
                    :key="index"
                >
                    <el-option
                        v-for="_el in el.option"
                        :key="_el.index"
                        :label="_el.label"
                        :value="_el.value"
                    ></el-option>
                </el-select>
                <el-button type="primary" @click="searchData">搜索</el-button>
            </div>
            <div>
                <el-button
                    v-for="el in innerObj.buttonList"
                    :key="el.index"
                    :type="el.type"
                    @click="operations('',el.func,el.label,el.inquiry)"
                >{{el.label}}</el-button>
                <el-button
                    v-if="innerObj.condition.add"
                    type="primary"
                    @click="add"
                >新增{{innerObj.pageTitle}}</el-button>
            </div>
        </div>
        <div class="search-content">
            <el-table
                slot="table"
                :data="innerObj.dataList.dataBody"
                @selection-change="handleSelectionChange"
                height="100"
                stripe
            >
                <el-table-column :type="innerObj.condition.type" label="ID"></el-table-column>
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
                                @click="operations(scope.row,o.func,o.label,o.inquiry)"
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
                :page-size="originalFree.pageSize"
                @current-change="currentChange"
                background
                layout="prev, pager, next"
                :total="originalFree.rowCount"
            ></el-pagination>
        </div>
        <slot name="dialogs"></slot>
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
            originalWatch: this.value.watch,
            originalFree: this.value.free,
        }
    },
    methods: {
        /**
         * 分页
         */
        currentChange(val) {
            this.originalFree.pageCount = val;
            this.$parent.searchData();
        },
        /**
         * 按键分发
         */
        operations(row, func, label, inquiry) {
            if (this.fileterSelection(row)) {
                if (inquiry) {
                    console.log(this.$parent.quantityName);
                    this.$confirm(`确定${label} 「${this.$parent.quantityName.join('，')}」 ${this.innerObj.pageTitle}？`, `${label}`).then(
                        confirm => {
                            this.$parent.needToAsk(row, func, label);
                        },
                        cancel => {
                            this.$loading.close();
                        }
                    );
                } else {
                    this.$parent.noNeedToAsk(row, func);
                }
            }
        },
        /**
         * 是否选择批量操作的数据
         */
        fileterSelection(row) {
            if (row) {
                this.$parent.quantityId = [row[this.innerObj.field.id]];
                this.$parent.quantityName = [row[this.innerObj.field.name]];
                return true;
            } else {
                if (this.$parent.quantity.length) {
                    // 批量数据处理
                    this.setQuantity(row);
                    return true;
                } else {
                    this.$message.warning(`请选择需要操作的${this.innerObj.pageTitle}！`);
                    return false;
                }
            }
        },
        /**
         * 数组处理
         */
        setQuantity(row) {
            let field = this.innerObj.field,
                id = this.$parent.quantityId = [],
                name = this.$parent.quantityName = [];
            this.$parent.quantity.forEach((el, index, slef) => {
                for (const key in el) {
                    if (el.hasOwnProperty(key)) {
                        if (key == field.id) {
                            id.push(el[key]);
                        }
                        if (key == field.name) {
                            name.push(el[key]);
                        }
                    }
                }
            });
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
        /**
         * 选择框
         */
        handleSelectionChange(val) {
            this.$parent.quantity = val;
        }
    },
    watch: {
        originalWatch: {
            handler() {
                this.$parent.searchData();
            },
            deep: true
        }
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
            }
            > div {
                > * {
                    margin: 0 $spacing-s $spacing-s 0;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
        &.search-content {
            flex-grow: 1;
            height: 50%;
            .el-table {
                height: 100% !important;
            }
        }
    }
}
</style>

