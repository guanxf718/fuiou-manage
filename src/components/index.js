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

const OrderDetails = () =>
    import ('./appDialogs/orderDetails/index.vue');
const AddGroup = () =>
    import ('./appDialogs/addGroup/index.vue');
const ExtendedCode = () =>
    import ('./appDialogs/extendedCode/index.vue');

module.exports = {
    AppLayout,
    AppMenu,
    AppHeader,
    FormTemplate,
    AppBreadcrumb,
    OrderDetails,
    AddGroup,
    ExtendedCode
};