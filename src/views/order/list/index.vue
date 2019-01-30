<template>
    <form-template ref="searchForm" :inner-obj="innerObj" v-model="original">
        <order-details ref="orderDetails" slot="dialogs"></order-details>
    </form-template>
</template>

<script>
import { FormTemplate, OrderDetails } from "@/components";
import utils from '@/utils/utils'
export default {
    data() {
        return {
            innerObj: {
                pageTitle: '订单',
                // 所需组件 input搜索框 | date日期选择框 | state查询状态
                condition: {
                    input: true,
                    date: true,
                    excel: true,
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
                // 所需字段
                field: {
                    id: 'orderNo',
                    name: 'orderNo'
                },
                // 倒出excel
                excelData: {
                    jsonData: [],
                    jsonFields: {},
                    fileName: 'order.xls'
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
            this.innerObj.dataList.dataHead = [
                { prop: 'orderNo', label: '订单号', width: 120 },
                { prop: 'orderType', label: '订单类型' },
                { prop: 'orderAmt', label: '原价' },
                { prop: 'orderDisAmt', label: '优惠价' },
                { prop: 'couponAmt', label: '优惠券' },
                { prop: 'integralDeductionAmt', label: '积分抵扣' },
                { prop: 'expressAmt', label: '快递费' },
                { prop: 'payAmt', label: '支付金额' },
                { prop: 'payType', label: '支付类型' },
                { prop: 'expressId', label: '快递单号', width: 90 },
                { prop: 'payTm', label: '支付时间', width: 150 },
                {
                    prop: 'option',
                    label: '操作',
                    operations: [
                        // { label: '详情', func: 'details', type: 'primary', inquiry: false },
                        { label: '删除', func: 'delete', type: 'danger', inquiry: true },
                    ],
                    width: 80
                }
            ];
        },
        getTableBody(data) {
            let arry = [],
                obj = {};
            data.forEach(el => {
                obj = {
                    orderNo: el.orderNo,
                    orderType: el.orderType == '01' ? '堂吃订单' : '外卖订单',
                    orderAmt: utils.formatPrice(el.orderAmt),
                    orderDisAmt: utils.formatPrice(el.orderDisAmt),
                    couponAmt: utils.formatPrice(el.couponAmt),
                    expressAmt: utils.formatPrice(el.expressAmt),
                    payAmt: utils.formatPrice(el.payAmt),
                    payType: el.payType == 'LETPAY' ? '微信支付' : '会员卡支付',
                    payTm: el.payTm,
                    integralDeductionAmt: utils.formatPrice(el.integralDeductionAmt),
                    expressId: el.expressId,
                }
                arry.push(utils.formatTh(obj));
            });
            return arry;
        },
        /**
         * 搜索订单列表
         */
        searchData() {
            let vm = this;
            let params = {
                // ...vm.original.watch,
                // ...vm.original.free,
                orderNo: '10000761'
            }
            vm.$root.commonCall("getOrderList", params, {
                success(res) {
                    vm.innerObj.dataList.dataBody = vm.getTableBody(res);
                    vm.original.pageCount = res.pageCount;
                    vm.original.rowCount = res.rowCount;
                },
                failMes: `获取${vm.pageTitle}列表失败！`
            });
        },
        /**
         * 询问
         */
        needToAsk(row, el) {
            switch (el.func) {
                // 删除 
                case 'delete':
                    this.operationsDelete(row, el.label);
                    break;
                //导出
                case 'export':
                    this.operationsExport(el.label);
                    break;
                default: break;
            }
        },
        /**
         * 不询问
         */
        noNeedToAsk(row, el) {
            switch (el.func) {
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
