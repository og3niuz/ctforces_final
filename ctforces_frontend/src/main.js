import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

/* axios configuration */

import { apiUrl } from '@/config';
import axios from 'axios';
axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

axios.interceptors.response.use(
    response => response,
    error => {
        const ret = error;
        if (!ret.response) {
            ret.response = { data: { detail: 'Api server is down' } };
        } else if (ret.response.status === 500) {
            ret.response.data = { detail: 'Api server is down' };
        }
        return Promise.reject(ret);
    }
);

/* utils injection */

import lodash from 'lodash';
import parse from '@/utils/errorParser';
import {
    isArray,
    isBoolean,
    isFunction,
    isNull,
    isNumber,
    isObject,
    isRegExp,
    isString,
    isUndefined,
} from '@/utils/types';

Vue.prototype._ = lodash;
Vue.prototype.$http = axios;
Vue.prototype.$parse = parse;
Vue.prototype.$types = {
    isArray,
    isBoolean,
    isFunction,
    isNull,
    isNumber,
    isObject,
    isRegExp,
    isString,
    isUndefined,
};
store.$http = axios;

/* external components */

import Toasted from 'vue-toasted';
import VueSimplemde from 'vue-simplemde';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import Paginate from 'vuejs-paginate';
import VueCountdown from '@chenfengyuan/vue-countdown';

Vue.use(Toasted, {
    position: 'bottom-right',
    duration: 2000,
    keepOnHover: true,
});
Vue.component('vue-simplemde', VueSimplemde);
Vue.component('datetime', VueCtkDateTimePicker);
Vue.component('paginate', Paginate);
Vue.component(VueCountdown.name, VueCountdown);

/* internal components */

import Card from '@/components/Card/Index';
import FDetail from '@/components/Form/Detail';
import User from '@/components/User/Index';
import Master from '@/layouts/Master';
import Full from '@/layouts/Full';

Vue.component('card', Card);
Vue.component('f-detail', FDetail);
Vue.component('user', User);
Vue.component('master-layout', Master);
Vue.component('full-layout', Full);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');