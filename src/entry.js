import Vue from 'vue';
import Axios from 'axios';
import App from 'components/app.vue';
import store from 'store';

// create $moment
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment; }})

export default function(events) {
    return new Vue({
        data: {
            moment,
        },
        components: {
            App,
        },
        store,
        // this won't work with serverside rendering
        // created() {
        //     Axios.get('/events')
        //     .then(res => res.data)
        //     .then(events => {
        //         store.replaceState({...store.state, events })
        //     });
        // },
        created() {
            if (events) {
                store.replaceState({ ...store.state, events })
            }
        },
        render(createElement) {
            return createElement('div', { attrs: { id: 'app' } }, [
                createElement('app'),
            ])
        }
    });
}

