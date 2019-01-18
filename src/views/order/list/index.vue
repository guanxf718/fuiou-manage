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
                pageTitle:'订单',
                // 所需组件 input搜索框 | date日期选择框 | state查询状态
                condition: {
                    input: true,
                    date: true,
                    state: true,
                },
                // 状态列表
                state: [
                    { value: '', label: '全部' },
                    { value: '01', label: '堂吃订单' },
                    { value: '02', label: '外卖订单' }
                ],
                // 数据列表
                dataList: {},
            },
            original: {
                //当前页
                pageCount: 1,
                //多少行
                pageSize: 20,
                //总行数
                rowCount: 1,
                //搜索内容
                inputValue: '',
                //搜索日期
                queryDate: [],
                //状态
                stateValue: '',
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
            this.innerObj.dataList.dataHead = Format.TableHeader();
        },
        /**
         * 搜索订单列表
         */
        searchData() {
            let vm = this;
            let params = {
                ...vm.original
            }
            console.log("搜索了", params);
            vm.$root.commonCall("orderList", params, {
                success(res) {
                    vm.innerObj.dataList.dataBody = Format.FormatOrderList(res);
                    vm.original.pageCount = res.pageCount;
                    vm.original.rowCount = res.rowCount;
                },
                failMes: `获取${vm.pageTitle}列表失败！`
            });
        },
        /**
         * 操作分发
         */
        operations(row, func) {
            switch (func) {
                // 详情
                case 'details':
                    this.orderDetails(row);
                    break;
                // 删除 
                case 'delete':
                    this.orderDelete(row);
                    break;
                default: break;
            }
        },
        /**
         * 订单详情
         */
        orderDetails(el) {
            console.log('查看订单详情', el);
        },
        /**
         * 删除订单
         */
        orderDelete(el) {
            console.log('删除订单', el);
        }

    },
    components: {
        FormTemplate
    }
}
</script>
