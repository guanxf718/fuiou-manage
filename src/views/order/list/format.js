import utils from '../../../utils/utils';
/**
 * 设置表头
 */
const tableHeader = () => {
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
const tableBody = (data) => {
    let obj = {},
        arry = [];
    data.dataList.forEach(el => {
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
            contacterName: el.orderAddressInfo.contacterName,
            contacterphone: el.orderAddressInfo.phone,
            expressId: el.expressId,
            shopName: el.shopInfo.shopName
        }
        arry.push(utils.formatTh(obj));
    });
    return arry;
}

export default {
    tableHeader,
    tableBody
};