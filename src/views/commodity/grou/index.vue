<template>
    <form-template ref="searchForm" :inner-obj="innerObj" v-model="original"></form-template>
</template>

<script>
import { FormTemplate } from "@/components";
import Format from "./format.js";
export default {
    data() {
        return {
            innerObj: {
                pageTitle: '分组',
                // 所需组件 input搜索框 | date日期选择框 | state查询状态
                condition: {
                    input: true,
                    date: true,
                    add: true,
                    type: 'index'
                },
                // 数据列表
                dataList: {
                    dataHead: {},
                    dataBody: []
                }
            },
            original: {
                watch: {
                    //搜索日期
                    queryDate: [],
                },
                free: {
                    //当前页
                    pageCount: 1,
                    //多少行
                    pageSize: 20,
                    //总行数
                    rowCount: 1,
                    //搜索内容
                    inputValue: '',
                },
            },
        }
    },
    mounted() {
        // 搜索数据列表
        this.searchData();
        this.getTableHeader();
    },
    methods: {
        getTableHeader() {
            this.innerObj.dataList.dataHead = Format.tableHeader();
        },
        /**
         * 搜索订单列表
         */
        searchData() {
            let vm = this,
                params = {
                    ...vm.original.watch,
                    ...vm.original.free
                }
            console.log(params);
            vm.$root.commonCall("commodityGrou", params, {
                success(res) {
                    vm.innerObj.dataList.dataBody = Format.tableBody(res);
                    vm.original.free.pageCount = res.pageCount;
                    vm.original.free.rowCount = res.rowCount;
                },
                failMes: `获取${vm.pageTitle}列表失败！`
            });
        },
        /**
         * 操作分发
         */
        operations(row, func) {
            switch (func) {
                // 编辑
                case 'edit':
                    this.operationsEdit(row);
                    break;
                // 删除 
                case 'delete':
                    this.operationsDelete();
                    break;
                default: break;
            }
        },
        /**
         * 编辑
         */
        operationsEdit(el) {
            let vm = this,
                params = {
                    commodityNo: el.commodityNo
                }
            vm.$root.commonCall("commodityGrou", params, {
                success(res) {
                    console.log(res);
                },
                failMes: `获取${vm.pageTitle}失败！`
            });
        },
        operationsDelete(){
            console.log('删除');
        },
        /**
         * 新增
         */
        add() {
            console.log('新增新增');
        }
    },
    components: {
        FormTemplate
    }
}
</script>
