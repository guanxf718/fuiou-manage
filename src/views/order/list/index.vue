<template>
    <form-template ref="searchForm" :inner-obj="innerObj" v-model="original">
        <order-details ref="orderDetails" slot="dialogs"></order-details>
    </form-template>
</template>

<script>
import { FormTemplate, OrderDetails } from "@/components";
import Format from "./format.js";
export default {
    data() {
        return {
            innerObj: {
                pageTitle: '订单',
                // 所需组件 input搜索框 | date日期选择框 | state查询状态
                condition: {
                    input: true,
                    date: true,
                    type: 'index',
                },
                // 数据列表
                dataList: {
                    dataHead: {},
                    dataBody: []
                },
                // 状态列表
                stateList: [
                    {
                        bind: 'orderType',
                        // 订单类型
                        option: [
                            { value: '', label: '全部' },
                            { value: '01', label: '堂吃订单' },
                            { value: '02', label: '外卖订单' }
                        ]
                    },
                    {
                        bind: 'orderState',
                        // 订单状态
                        option: [
                            { value: '', label: '全部' },
                            { value: '01', label: '待付款' },
                            { value: '02', label: '待发货' },
                            { value: '03', label: '已发货' },
                            { value: '04', label: '已完成' },
                            { value: '05', label: '已关闭' },
                            { value: '06', label: '退款中' },
                        ]
                    },
                    {
                        bind: 'orderPayType',
                        // 付款方式
                        option: [
                            { value: '', label: '全部' },
                            { value: '01', label: '微信支付' },
                            { value: '02', label: '会员卡支付' }
                        ]
                    },
                ],
                // 批量操作按钮
                buttonList: [
                    { label: '导出EXCEL', func: 'export', type: 'primary', inquiry: true },
                ],
                // 所需字段
                field: {
                    id: 'orderNo',
                    name: 'orderNo'
                }
            },
            original: {
                watch: {
                    //订单类型
                    orderType: '',
                    //订单状态
                    orderState: '',
                    //订单支付类型 
                    orderPayType: '',
                    //搜索日期
                    queryDate: [],
                },
                free: {
                    //当前页
                    pageCount: 1,
                    //多少行
                    pageSize: 20,
                    //总行数
                    rowCount: 100,
                    //搜索内容
                    inputValue: '',
                },
            },
            quantityId: [],
            quantityName: []
        }
    },
    mounted() {
        // 搜索数据列表
        this.searchData();
        this.getTableHeader();
    },
    methods: {
        /**
         * 获取表头
         */
        getTableHeader() {
            this.innerObj.dataList.dataHead = Format.tableHeader();
        },
        /**
         * 搜索订单列表
         */
        searchData() {
            let vm = this;
            let params = {
                ...vm.original.watch,
                ...vm.original.free
            }
            console.log(params);
            vm.$root.commonCall("getOrderList", params, {
                success(res) {
                    vm.innerObj.dataList.dataBody = Format.tableBody(res);
                    vm.original.pageCount = res.pageCount;
                    vm.original.rowCount = res.rowCount;
                },
                failMes: `获取${vm.pageTitle}列表失败！`
            });
        },
        /**
         * 询问
         */
        needToAsk(row, func, label) {
            switch (func) {
                // 删除 
                case 'delete':
                    this.operationsDelete(row, label);
                    break;
                //导出
                case 'export':
                    this.operationsExport(label);
                    break;
                default: break;
            }
        },
        /**
         * 不询问
         */
        noNeedToAsk(row, func) {
            switch (func) {
                // 详情
                case 'details':
                    this.operationsDetails(row);
                    break;
                default: break;
            }
        },
        /**
         * 详情
         */
        operationsDetails(el) {
            this.$refs.orderDetails.dialogVisible = true;
        },
        /**
         * 删除
         */
        operationsDelete(label) {
            let vm = this;
            let params = {};
            return this.$root.commonCall("deleteService", params, {
                success() {
                    vm.$message.success(`${label}成功！`);
                    vm.searchData();
                },
                failMsg: `${label}失败！`
            });
        },
        /**
         * 导出
         */
        operationsExport(label) {
            let vm = this;
            let params = {};
            return this.$root.commonCall("deleteService", params, {
                success() {
                    vm.$message.success(`${label}成功！`);
                    vm.searchData();
                },
                failMsg: `${label}失败！`
            });
        }
    },
    components: {
        FormTemplate, OrderDetails
    }
}
</script>
