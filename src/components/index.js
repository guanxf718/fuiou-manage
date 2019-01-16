const AppLayout = () =>
    import ('./appLayout/index.vue');
const AppMenu = () =>
    import ('./appMenu/index.vue');
const AppHeader = () =>
    import ('./appHeader/index.vue');

module.exports = {
    AppLayout,
    AppMenu,
    AppHeader
};