<template>
    <form-template ref="searchForm" :inner-obj="innerObj" v-model="original">
        <add-group ref="addGroup" slot="dialogs"></add-group>
    </form-template>
</template>

<script>
import { FormTemplate, AddGroup } from "@/components";
import utils from '@/utils/utils'
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
                },
                // 所需字段
                field: {
                    id: 'grouId',
                    name: 'grouName'
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
            this.innerObj.dataList.dataHead = [
                { prop: 'grouId', label: '分组编号' },
                { prop: 'grouName', label: '分组名称' },
                { prop: 'commodityNumber', label: '商品数' },
                { prop: 'creationTime', label: '创建时间', width: 120 },
                {
                    prop: 'option',
                    label: '操作',
                    operations: [
                        { label: '编辑', func: 'edit', type: 'success', inquiry: false },
                        { label: '删除', func: 'delete', type: 'danger', inquiry: true },
                    ],
                    width: 150
                }
            ];
        },
        getTableBody(data) {
            let arry = [],
                obj = {};
            data.dataList.forEach(el => {
                obj = {
                    grouId: el.grouId,
                    grouName: el.grouName,
                    commodityNumber: el.commodityNumber,
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
            vm.$root.commonCall("getCommodityGrou", params, {
                success(res) {
                    vm.innerObj.dataList.dataBody = vm.getTableBody(res);
                    vm.original.free.pageCount = res.pageCount;
                    vm.original.free.rowCount = res.rowCount;
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
                    this.operationsDelete(row);
                    break;
                default: break;
            }
        },
        /**
         * 不询问
         */
        noNeedToAsk(row, el) {
            switch (el.func) {
                // 编辑
                case 'edit':
                    this.operationsEdit(row);
                    break;
                default: break;
            }
        },
        /**
         * 编辑
         */
        operationsEdit(el) {
            this.$refs.addGroup.dialogVisible = true;
        },
        operationsDelete() {
            let vm = this;
            let params = {};
            return this.$root.commonCall("deleteService", params, {
                success() {
                    vm.$message.success(`删除成功！`);
                    vm.searchData();
                },
                failMsg: `删除失败！`
            });
        },
        /**
         * 新增
         */
        add() {
            this.operationsEdit();
        }
    },
    components: {
        FormTemplate, AddGroup
    }
}
</script>
