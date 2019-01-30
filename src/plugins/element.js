import Vue from 'vue'
import {
    Button,
    ButtonGroup,
    Container,
    Checkbox,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Input,
    InputNumber,
    Message,
    MessageBox,
    Loading,
    Table,
    TableColumn,
    Pagination,
    DatePicker,
    Select,
    Option,
    OptionGroup,
    Breadcrumb,
    BreadcrumbItem,
    Dialog,
    Form,
    FormItem
} from 'element-ui'

Vue.use(Button)
    .use(ButtonGroup)
    .use(Container)
    .use(Checkbox)
    .use(Header)
    .use(Aside)
    .use(Main)
    .use(Menu)
    .use(Submenu)
    .use(MenuItem)
    .use(MenuItemGroup)
    .use(Dropdown)
    .use(DropdownMenu)
    .use(DropdownItem)
    .use(Input)
    .use(InputNumber)
    .use(Table)
    .use(TableColumn)
    .use(Pagination)
    .use(DatePicker)
    .use(Select)
    .use(Option)
    .use(OptionGroup)
    .use(Loading)
    .use(Breadcrumb)
    .use(BreadcrumbItem)
    .use(Dialog)
    .use(Form)
    .use(FormItem);
Vue.component(Message.name, Message);
Vue.component(MessageBox.name, MessageBox);

Vue.prototype.$loading = {
    loading: null,
    normal(settings) {
        this.loading = Loading.service(settings);
    },
    open(txt) {
        this.loading = Loading.service({
            text: txt || '加载中...'
        });
    },
    close() {
        this.loading && this.loading.close();
        this.loading = null;
    }
};
Vue.prototype.$message = {
    _base(tip, type) {
        return Message({
            message: tip,
            type: type || ''
        });
    },
    normal(tip) {
        return this._base(tip);
    },
    success(tip) {
        return this._base(tip, 'success');
    },
    warning(tip) {
        return this._base(tip, 'warning');
    },
    error(tip) {
        return this._base(tip, 'error');
    }
};
Vue.prototype.$confirm = MessageBox.confirm;