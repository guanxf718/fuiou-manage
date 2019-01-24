// 用户信息或关于用户操作的接口
export default (axios, config) => {
    return {
        doUserLogin(data = {}) {
            return axios.get('data/login.json', data);
        },
        orderList(data = {}) {
            return axios.get('/data/order.json', data);
        },
        commodityList(data = {}) {
            return axios.get('/data/commodityList.json', data);
        },
        getCommodity(data = {}) {
            return axios.get('/data/commodity.json', data);
        },
        commodityGrou(data = {}) {
            return axios.get('/data/commodityGrou.json', data);
        },
        deleteService(data = {}) {
            return axios.get('/data/commodityGrou.json', data);
        }
    };
};