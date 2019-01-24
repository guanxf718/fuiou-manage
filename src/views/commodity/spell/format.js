import utils from '../../../utils/utils';
/**
 * 设置表头
 */
const tableHeader = () => {
    let array = [
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
            spellName: el.spellName,
            state: el.state,
            startTime: el.startTime,
            endTime: el.endTime
        }
        arry.push(utils.formatTh(obj));
    });
    return arry;
}

export default {
    tableHeader,
    tableBody
};