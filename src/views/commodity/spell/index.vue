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
                pageTitle: '拼团',
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
                // 所需展示字段
                field: {
                    id: 'spellId',
                    name: 'spellName'
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
                { prop: 'spellName', label: '活动名称' },
                { prop: 'state', label: '活动状态' },
                { prop: 'startTime', label: '起始时间' },
                { prop: 'endTime', label: '结束时间' },
                {
                    prop: 'option',
                    label: '操作',
                    operations: [
                        { label: '编辑', func: 'edit', type: 'success', inquiry: false },
                        { label: '推广', func: 'extension', type: 'primary', inquiry: false },
                        { label: '失效', func: 'invalid', type: 'warning', inquiry: true },
                        { label: '删除', func: 'delete', type: 'danger', inquiry: true },
                    ],
                    width: 280
                }
            ];
        },
        getTableBody(data) {
            let arry = [],
                obj = {};
            data.dataList.forEach(el => {
                obj = {
                    spellName: el.spellName,
                    state: el.state,
                    startTime: el.startTime,
                    endTime: el.endTime
                }
                arry.push(utils.formatTh(obj));
            });
            return arry;
        },
        /**
         * 搜索拼团列表
         */
        searchData() {
            let vm = this,
                params = {
                    ...vm.original.watch,
                    ...vm.original.free
                }
            vm.$root.commonCall("getSpellList", params, {
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
                    this.operationsDelete(this.quantityId, label);
                    break;
                // 失效
                case 'invalid':
                    this.operationsInvalid();
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
        operationsInvalid() {
            console.log('失效');
        },
        /**
         * 编辑
         */
        operationsEdit(el) {
            // this.$router.push({ name: 'commodityAdd' });
        },
        /**
         * 删除
         */
        operationsDelete(quantity, label) {
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
