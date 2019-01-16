import {
    CHANGEMENU,
} from './matationsTypes'

export default {
    [CHANGEMENU](state, v) {
        state.changeMenu = v;
    },
}