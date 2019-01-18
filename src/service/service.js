// 用户信息或关于用户操作的接口
export default (axios, config) => {
    return {
        doUserLogin(data = {}) {
            return axios.get('data/login.json', data);
        },
        orderList(data = {}) {
            return axios.get('/data/order.json', data);
        }
    };
};