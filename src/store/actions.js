import utils from '@/utils';
import VueCookie from 'vue-cookie';

export default {
    // 设置用户信息数据
    setUserInfoAction({ commit }, userInfo) {
        if (userInfo) {
            VueCookie.set('userName', userInfo.userName, 'HTTPOnly', 1000);
            VueCookie.set('userToken', userInfo.token, 'HTTPOnly', 1000);
            utils.setStore('userInfo', userInfo);
            commit('UPDATE_USER_INFO', userInfo);
        }
    },
    // 用于页面刷新时候的vuex状态的丢失，这里做重新赋值
    initStoreAction({ commit }) {
        let userInfo = utils.getStore('userInfo');
        let userToken = utils.getStore('userToken');
        userInfo && commit('UPDATE_USER_INFO', userInfo);
        userToken && commit('UPDATE_USER_INFO', { userToken });
    },
    // 用户登出
    doUserLoginoutAction({ commit }) {
        return new Promise(resolve => {
            commit('CLEAR_USER_INFO');
            VueCookie.set('userName', '', null, '-1');
            utils.removeStore('userInfo');
            utils.removeStore('userToken');
            utils.removeStore('tokenExpire');
            resolve();
        });
    },
    // 获取用户toke
    getUserTokenAction({ commit }) {
        const USER_INFO = utils.getStore('userInfo');
        let now = new Date().getTime();
        let diff = 1 * 60 * 60 * 1000; // 一小时过期
        utils.setStore('userToken', USER_INFO.token);
        utils.setStore('tokenExpire', (diff + now));
        commit('UPDATE_USER_INFO', { userToken: USER_INFO.token });
    },
};