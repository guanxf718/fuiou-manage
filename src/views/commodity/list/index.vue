<template>
    <form-template ref="searchForm" :inner-obj="innerObj" v-model="original">
        <extended-code ref="extendedCode" slot="dialogs"></extended-code>
    </form-template>
</template>

<script>
import { FormTemplate, ExtendedCode } from "@/components";
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
                    { label: '上架', func: 'onShelf', type: 'primary', inquiry: true },
                    { label: '下架', func: 'offShelf', type: 'primary', inquiry: true },
                    { label: '分组', func: 'grou', type: 'warning', inquiry: true },
                ],
                // 所需展示字段
                field: {
                    id: 'commodityNo',
                    name: 'commodityName'
                }
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
            let vm = this,
                params = {
                    ...vm.original.watch,
                    ...vm.original.free
                }
            console.log(params);
            vm.$root.commonCall("getCommodityList", params, {
                success(res) {
                    vm.innerObj.dataList.dataBody = Format.tableBody(res);
                    vm.original.pageCount = res.pageCount;
                    vm.original.rowCount = res.rowCount;
                },
                failMes: `获取${vm.pageTitle}列表失败！`
            });
        },
        /**
         * 需要询问
         */
        needToAsk(row, func, label) {
            switch (func) {
                // 删除 
                case 'delete':
                    this.operationsDelete(row, label);
                    break;
                // 上架
                case 'onShelf':
                    this.operationsShelf('01', label);
                    break;
                // 下架
                case 'offShelf':
                    this.operationsShelf('00', label);
                    break;
                // 分组
                case 'grou':
                    this.operationsGrou();
                    break;
                default: break;
            }
        },
        /**
         * 不需要需要询问
         */
        noNeedToAsk(row, func, label) {
            switch (func) {
                // 编辑
                case 'edit':
                    this.operationsEdit(row);
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
            this.$router.push({ name: 'commodityAdd' });
        },
        /**
         * 删除
         */
        operationsDelete(row, label) {
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
         * 上架
         */
        operationsShelf(quantity, label) {
            let vm = this;
            let params = {
                quantityId: this.quantityId
            };
            return this.$root.commonCall("deleteService", params, {
                success() {
                    vm.$message.success(`${label}成功！`);
                    vm.searchData();
                },
                failMsg: `${label}失败！`
            });
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
            this.$refs.extendedCode.dialogVisible = true;
        },
        /**
         * 新增
         */
        add() {
            this.operationsEdit();
        }
    },
    components: {
        FormTemplate, ExtendedCode
    }
}
</script>
