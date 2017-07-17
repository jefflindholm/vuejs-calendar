import VueCalendar from './entry';
import './style.scss';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

let events = window.__INITIAL_STATE__;
if (events) {
    events = events.map(event => ({
        description: event.description,
        date: moment(event.date),
    }));
}
VueCalendar(events).$mount('#app');
