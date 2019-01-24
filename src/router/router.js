/**
 * 订单
 * @param {*} r 
 */
const ORDER = r => require.ensure([], () => r(require('@/views/order/index.vue')), 'order');
// 订单列表
const ORDER_LIST = r => require.ensure([], () => r(require('@/views/order/list/index.vue')), 'order');

/**
 * 商品
 * @param {*} r 
 */
const COMMODITY = r => require.ensure([], () => r(require('@/views/commodity/index.vue')), 'commodity');
// 商品列表
const COMMODITY_LIST = r => require.ensure([], () => r(require('@/views/commodity/list/index.vue')), 'commodity');
// 商品分组
const COMMODITY_GROU = r => require.ensure([], () => r(require('@/views/commodity/grou/index.vue')), 'commodity');
// 多人拼团
const COMMODITY_SPELL = r => require.ensure([], () => r(require('@/views/commodity/spell/index.vue')), 'commodity');
// 发布商品
const COMMODITY_ADD = r => require.ensure([], () => r(require('@/views/commodity/add/index.vue')), 'commodity');

/**
 * 商铺
 * @param {*} r 
 */
const HOME = r => require.ensure([], () => r(require('@/views/home/index.vue')), 'index');
// 商铺
const HOME_MODE = r => require.ensure([], () => r(require('@/views/home/mode/index.vue')), 'index');

/**
 * 设置
 * @param {*} r 
 */
const SETUP = r => require.ensure([], () => r(require('@/views/setup/index.vue')), 'setup');
// 商铺信息
const SETUP_INFO = r => require.ensure([], () => r(require('@/views/setup/info/index.vue')), 'setup');

/**
 * 登录
 * @param {*} r 
 */
// 登录
const LOGIN = r => require.ensure([], () => r(require('@/views/login/index.vue')), 'login');

/**
 * 路由meta参数配置说明
 *  auth  是否需要用户登录验证
 *  title 改变浏览器标题名称
 *  appLayout 是否显示在左侧栏
 *  visit url是否可以访问
 */

export default [
    // 重定向主页面
    {
        path: '/',
        redirect: { name: 'home' }
    },
    // 不正确url跳转首页
    {
        path: "*",
        redirect: "/"
    },
    // 登录
    {
        path: '/login',
        name: 'login',
        meta: {
            auth: false,
            appLayout: false,
            visit: true
        },
        component: LOGIN
    },
    // 首页
    {
        path: '/home',
        name: 'home',
        meta: {
            auth: true,
            appLayout: true,
            visit: false,
            title: '商铺',
            icon: 'el-icon-star-off'
        },
        redirect: { name: 'homeMode' },
        children: [
            //订单列表
            {
                path: 'list',
                name: 'homeMode',
                meta: {
                    auth: true,
                    appLayout: true,
                    title: '店铺模版',
                    visit: true
                },
                component: HOME_MODE
            }
        ],
        component: HOME_MODE
    },
    // 商品
    {
        path: '/commodity',
        name: 'commodity',
        meta: {
            auth: true,
            appLayout: true,
            title: '商品',
            icon: "el-icon-goods",
            visit: false
        },
        redirect: { name: 'commodityList' },
        children: [
            //商品列表
            {
                path: 'list',
                name: 'commodityList',
                meta: {
                    auth: true,
                    appLayout: true,
                    title: '商品列表',
                    visit: true
                },
                component: COMMODITY_LIST
            },
            //发布商品
            {
                path: 'add',
                name: 'commodityAdd',
                meta: {
                    auth: true,
                    appLayout: true,
                    title: '新增商品',
                    visit: true,
                    none: true
                },
                component: COMMODITY_ADD
            },
            //商品分组
            {
                path: 'grou',
                name: 'commodityGrou',
                meta: {
                    auth: true,
                    appLayout: true,
                    title: '商品分组',
                    visit: true
                },
                component: COMMODITY_GROU
            },
            //多人拼团
            {
                path: 'spell',
                name: 'commoditySpell',
                meta: {
                    auth: true,
                    appLayout: true,
                    title: '多人拼团',
                    visit: true
                },
                component: COMMODITY_SPELL
            }
        ],
        component: COMMODITY
    },
    // 订单
    {
        path: '/order',
        name: 'order',
        meta: {
            auth: true,
            appLayout: true,
            title: '订单',
            icon: "el-icon-tickets",
            visit: false
        },
        redirect: { name: 'orderList' },
        component: ORDER,
        children: [
            //订单列表
            {
                path: 'list',
                name: 'orderList',
                meta: {
                    auth: true,
                    appLayout: true,
                    title: '订单列表',
                    visit: true
                },
                component: ORDER_LIST
            }
        ]
    },
    // 设置
    {
        path: '/setup',
        name: 'setup',
        meta: {
            auth: true,
            appLayout: true,
            visit: false,
            title: '设置',
            icon: 'el-icon-setting'
        },
        redirect: { name: 'setupInfo' },
        children: [
            //商铺信息
            {
                path: 'info',
                name: 'setupInfo',
                meta: {
                    auth: true,
                    appLayout: true,
                    title: '店铺信息',
                    visit: true
                },
                component: SETUP_INFO
            }
        ],
        component: SETUP
    },
];