import {
    CHANGEMENU,
    UPDATE_USER_INFO,
    CLEAR_USER_INFO
} from './matationsTypes'

export default {
    [CHANGEMENU](state, v) {
        state.changeMenu = v;
    },
    [UPDATE_USER_INFO](state, value = {}) {
        if (!state.userInfo) {
            state.userInfo = {};
        }
        for (let key in value) {
            state.userInfo[key] = value[key];
        }
    },
    [CLEAR_USER_INFO](state) {
        state.userInfo = null;
    }
}