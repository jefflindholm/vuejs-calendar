import Vue from 'vue';
import App from 'components/app.vue';
import './style.scss';

// create $moment
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment; }})

new Vue({
    el: '#app',
    data: {
        moment,
    },
    components: {
        App,
    },
});
