const AppLayout = () =>
    import ('./appLayout/index.vue');
const AppMenu = () =>
    import ('./appMenu/index.vue');
const AppHeader = () =>
    import ('./appHeader/index.vue');
const FormTemplate = () =>
    import ('./formTemplate/index.vue');
const AppBreadcrumb = () =>
    import ('./appBreadcrumb/index.vue');

module.exports = {
    AppLayout,
    AppMenu,
    AppHeader,
    FormTemplate,
    AppBreadcrumb
};