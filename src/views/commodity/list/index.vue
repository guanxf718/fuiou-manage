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
                pageTitle: '商品',
                // 所需组件 input搜索框 | date日期选择框 | state查询状态
                condition: {
                    input: true,
                    date: true,
                    add: true,
                    type: 'selection'
                },
                // 状态列表
                stateList: [
                    {
                        bind: 'commodityType',
                        // 订单类型
                        option: [
                            { value: '', label: '全部' },
                            { value: '01', label: '菜品' },
                            { value: '02', label: '饮品' },
                        ],
                    },
                    {
                        bind: 'commodityGrou',
                        // 订单类型
                        option: [
                            { value: '', label: '全部' },
                            { value: '01', label: '食品' },
                            { value: '02', label: '限量' },
                            { value: '03', label: '优惠' }
                        ],
                    },
                ],
                // 数据列表
                dataList: {
                    dataHead: {},
                    dataBody: []
                },
                // 批量操作按钮
                buttonList: [
                    { label: '上架', func: 'onShelf', type: 'primary' },
                    { label: '下架', func: 'offShelf', type: 'primary' },
                    { label: '分组', func: 'grou', type: 'success' },
                    { label: '删除', func: 'delete', type: 'danger' },
                ]
            },
            original: {
                watch: {
                    //商品类型
                    commodityType: '',
                    //商品分组
                    commodityGrou: '',
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
            // 批量操作选中列表
            quantity: [],
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
            vm.$root.commonCall("commodityList", params, {
                success(res) {
                    vm.innerObj.dataList.dataBody = Format.tableBody(res);
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
            console.log(this.quantity);
            switch (func) {
                // 编辑
                case 'edit':
                    this.operationsEdit(row);
                    break;
                // 删除 
                case 'delete':
                    this.operationsDelete();
                    break;
                // 上架
                case 'onShelf':
                    this.operationsShelf('01');
                    break;
                // 下架
                case 'offShelf':
                    this.operationsShelf('00');
                    break;
                // 分组
                case 'grou':
                    this.operationsGrou();
                    break;
                // 推广
                case 'extension':
                    this.operationsExtension(row);
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
            vm.$root.commonCall("getCommodity", params, {
                success(res) {
                    console.log(res);
                },
                failMes: `获取${vm.pageTitle}失败！`
            });
        },
        /**
         * 删除
         */
        operationsDelete() {
            console.log('删除订单');
        },
        /**
         * 上架
         */
        operationsShelf(v) {
            console.log('上下架');
        },
        /**
         * 分组
         */
        operationsGrou() {
            console.log('分组');
        },
        /**
         * 推广
         */
        operationsExtension(el) {
            console.log('推广');
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
