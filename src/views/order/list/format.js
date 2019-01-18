/**
 * 设置表头
 */
const TableHeader = () => {
    let array = [
        { prop: 'orderNo', label: '订单号', width: 90 },
        { prop: 'orderType', label: '订单类型' },
        { prop: 'orderAmt', label: '原价' },
        { prop: 'orderDisAmt', label: '优惠价' },
        { prop: 'couponAmt', label: '优惠券' },
        { prop: 'integralDeductionAmt', label: '积分抵扣' },
        { prop: 'expressAmt', label: '快递费' },
        { prop: 'payAmt', label: '支付金额' },
        { prop: 'payType', label: '支付类型' },
        { prop: 'contacterName', label: '用户名', },
        { prop: 'contacterphone', label: '用户手机', width: 110 },
        { prop: 'expressId', label: '快递单号', width: 90 },
        { prop: 'shopName', label: '门店名称', width: 180 },
        { prop: 'payTm', label: '支付时间', width: 150 },
        {
            prop: 'option',
            label: '操作',
            operations: [
                { label: '详情', func: 'details', type: 'primary' },
                { label: '删除', func: 'delete', type: 'danger' },
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
const FormatOrderList = (data) => {
    let obj = {},
        arry = [];
    data.dataList.forEach(el => {
        obj = {
            orderNo: el.orderNo,
            orderType: el.orderType == '01' ? '堂吃订单' : '外卖订单',
            orderAmt: FormatPrice(el.orderAmt),
            orderDisAmt: FormatPrice(el.orderDisAmt),
            couponAmt: FormatPrice(el.couponAmt),
            expressAmt: FormatPrice(el.expressAmt),
            payAmt: FormatPrice(el.payAmt),
            payType: el.payType == 'LETPAY' ? '微信支付' : '会员卡支付',
            payTm: el.payTm,
            integralDeductionAmt: FormatPrice(el.integralDeductionAmt),
            contacterName: el.orderAddressInfo.contacterName,
            contacterphone: el.orderAddressInfo.phone,
            expressId: el.expressId,
            shopName: el.shopInfo.shopName
        }
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = obj[key] || '-';
            }
        }
        arry.push(obj);
    });
    return arry;
}

/**
 * 格式化价格
 */
const FormatPrice = el => el ? (el / 100 * 1).toFixed(2) : 0;

export default {
    FormatOrderList,
    TableHeader
};