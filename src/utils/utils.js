/**
 * 格式化价格
 */
const formatPrice = el => el ? (el / 100 * 1).toFixed(2) : 0;

/**
 * 表格补充
 */
const formatTh = obj => {
    for (const key in obj) { if (obj.hasOwnProperty(key)) obj[key] = obj[key] || '-'; }
    return obj;
}


export default {
    formatPrice,
    formatTh
}