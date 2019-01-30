<template>
    <form-template ref="searchForm" :inner-obj="innerObj" v-model="original">
        <extended-code ref="extendedCode" slot="dialogs"></extended-code>
    </form-template>
</template>

<script>
import { FormTemplate, ExtendedCode } from "@/components";
import utils from '@/utils/utils'
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
                },
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
            quantity: {
                slef: [],
                id: [],
                name: []
            }
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
                { prop: 'no', label: 'ID' },
                { prop: 'commodityNo', label: '商品编号' },
                { prop: 'commodityName', label: '商品名称' },
                { prop: 'price', label: '价格' },
                { prop: 'visit', label: '访问量' },
                { prop: 'stock', label: '库存' },
                { prop: 'sales', label: '总销量' },
                { prop: 'upperLower', label: '上下架' },
                {
                    prop: 'creationTime',
                    label: '创建时间',
                    width: 120
                },
                {
                    prop: 'option',
                    label: '操作',
                    operations: [
                        { label: '编辑', func: 'edit', type: 'success', inquiry: false },
                        { label: '推广', func: 'extension', type: 'primary', inquiry: false },
                        { label: '删除', func: 'delete', type: 'danger', inquiry: true },
                    ],
                    width: 210
                }
            ];
        },
        getTableBody(data) {
            let arry = [],
                obj = {};
            data.dataList.forEach((el, index) => {
                obj = {
                    no: ~~(index + 1),
                    commodityNo: el.commodityNo,
                    commodityName: el.commodityName,
                    price: utils.formatPrice(el.price),
                    visit: el.visit,
                    stock: el.stock,
                    sales: el.sales,
                    upperLower: el.upperLower == '01' ? '已上架' : '未上架',
                    creationTime: el.creationTime
                }
                arry.push(utils.formatTh(obj));
            });
            return arry;
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
            // console.log(params);
            vm.$root.commonCall("getCommodityList", params, {
                success(res) {
                    vm.innerObj.dataList.dataBody = vm.getTableBody(res);
                    vm.original.pageCount = res.pageCount;
                    vm.original.rowCount = res.rowCount;
                },
                failMes: `获取${vm.pageTitle}列表失败！`
            });
        },
        /**
         * 需要询问
         */
        needToAsk(row, el) {
            switch (el.func) {
                // 删除 
                case 'delete':
                    this.operationsDelete(row, el.label);
                    break;
                // 上架
                case 'onShelf':
                    this.operationsShelf('01', el.label);
                    break;
                // 下架
                case 'offShelf':
                    this.operationsShelf('00', el.label);
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
        noNeedToAsk(row, el) {
            switch (el.func) {
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
        operationsShelf(type, label) {
            let vm = this;
            let params = {
                quantityId: this.quantity.id
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
