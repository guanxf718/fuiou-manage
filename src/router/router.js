const HOUSE = r => require.ensure([], () => r(require('@/views/house/index/index.vue')), 'house');
const HOUSELIST = r => require.ensure([], () => r(require('@/views/house/list/index.vue')), 'house');

const CHANNEL = r => require.ensure([], () => r(require('@/views/channel/index/index.vue')), 'channel');
const CHANNELLIST = r => require.ensure([], () => r(require('@/views/channel/list/index.vue')), 'channel');
const CHANNELORDER = r => require.ensure([], () => r(require('@/views/channel/order/index.vue')), 'channel');

const USER = r => require.ensure([], () => r(require('@/views/user/index/index.vue')), 'user');
const USERLIST = r => require.ensure([], () => r(require('@/views/user/list/index.vue')), 'user');

const INDEX = r => require.ensure([], () => r(require('@/views/index/index.vue')), 'index');

/**
 * 路由meta参数配置说明
 *  auth  是否需要用户登录验证
 *  title 改变浏览器标题名称
 *  template 使用模版名称
 *  menuTag 左侧栏菜单项激活
 */

export default [
    // 缺省页面重定向主页面
    {
        path: '/',
        redirect: { name: 'index' }
    },
    {
        path: '/index',
        name: 'index',
        component: INDEX
    },
    // 房产
    {
        path: '/house',
        name: 'house',
        meta: {
            auth: false,
            appLayout: true,
            title: '房产管理',
            icon: "el-icon-menu"
        },
        children: [{
            path: 'list',
            name: 'houseList',
            title: '房产列表',
            component: HOUSELIST
        }],
        component: HOUSE
    },
    // 渠道
    {
        path: '/channel',
        name: 'channel',
        meta: {
            auth: false,
            appLayout: true,
            title: '渠道管理',
            icon: "el-icon-menu"
        },
        children: [{
                path: 'list',
                name: 'channelList',
                title: '渠道列表',
                component: CHANNELLIST
            },
            {
                path: 'order',
                name: 'channelOrder',
                title: '渠道订单',
                component: CHANNELORDER
            }
        ],
        component: CHANNEL
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            auth: false,
            appLayout: true,
            title: '用户中心',
            icon: "el-icon-menu"
        },
        component: USER,
        children: [{
            path: 'list',
            name: 'userlist',
            title: '用户列表',
            component: USERLIST
        }]
    },
];