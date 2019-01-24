import utils from '../../../utils/utils';
/**
 * 设置表头
 */
const tableHeader = () => {
    let array = [
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
                { label: '编辑', func: 'edit', type: 'warning', inquiry: false },
                { label: '推广', func: 'extension', type: 'primary', inquiry: false },
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
}

export default {
    tableHeader,
    tableBody
};