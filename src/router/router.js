// 订单
const ORDER = r => require.ensure([], () => r(require('@/views/order/index.vue')), 'order');
// 订单列表
const ORDERINDEX = r => require.ensure([], () => r(require('@/views/order/list/index.vue')), 'order');

// 首页
const HOME = r => require.ensure([], () => r(require('@/views/home/index.vue')), 'index');

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
    {
        path: '/home',
        name: 'home',
        meta: {
            auth: true,
            appLayout: true,
            visit: true,
            title: '首页',
            icon: 'el-icon-star-off'
        },
        component: HOME
    },
    // 订单
    {
        path: '/order',
        name: 'order',
        meta: {
            auth: true,
            appLayout: true,
            title: '订单管理',
            icon: "el-icon-tickets",
            visit: false
        },
        redirect: { name: 'orderlist' },
        component: ORDER,
        children: [
            //订单列表
            {
                path: 'index',
                name: 'orderlist',
                meta: {
                    auth: true,
                    appLayout: true,
                    title: '订单列表',
                    visit: true
                },
                component: ORDERINDEX
            }
        ]
    },
    // 不正确url跳转首页
    {
        path: "*",
        redirect: "/"
    }
];