// 用户信息或关于用户操作的接口
export default (axios, config) => {
    return {
        doUserLogin(data = {}) {
            // return axios.get(`data/login.json`, data);
            return axios.post(`/api/login.fuiou`, data, { requestType: 'payload' });
        },
        getOrderList(data = {}) {
            // return axios.get('/data/order.json', data);
            return axios.post('/api/order/query.fuiou', data);
        },
        getCommodityList(data = {}) {
            return axios.get('/data/commodityList.json', data);
        },
        getCommodity(data = {}) {
            return axios.get('/data/commodity.json', data);
        },
        getCommodityGrou(data = {}) {
            return axios.get('/data/commodityGrou.json', data);
        },
        getSpellList(data = {}) {
            return axios.get('/data/spellList.json', data);
        },
        deleteService(data = {}) {
            return axios.get('/data/delete.json', data);
        }
    };
};