import utils from '../../../utils/utils';
/**
 * 设置表头
 */
const tableHeader = () => {
    let array = [
        { prop: 'grouId', label: '分组编号' },
        { prop: 'grouName', label: '分组名称' },
        { prop: 'commodityNumber', label: '商品数' },
        { prop: 'creationTime', label: '创建时间', width: 120 },
        {
            prop: 'option',
            label: '操作',
            operations: [
                { label: '编辑', func: 'edit', type: 'warning', inquiry: false },
                { label: '删除', func: 'delete', type: 'danger', inquiry: true },
            ],
            width: 150
        }
    ];
    return array;
};
/**
 * 格式数据
 * @param {*} data 
 */
const tableBody = (data) => {
    let obj = {},
        arry = [];
    data.dataList.forEach((el, index) => {
        obj = {
            grouId: el.grouId,
            grouName: el.grouName,
            commodityNumber: el.commodityNumber,
            creationTime: el.creationTime
        }
        arry.push(utils.formatTh(obj));
    });
    return arry;
}

export default {
    tableHeader,
    tableBody
};