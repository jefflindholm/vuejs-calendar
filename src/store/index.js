import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

import Axios from 'axios';

export default new Vuex.Store({
    state: {
        currentYear: 2017,
        currentMonth: 7,
        eventPos: {
            x: 0,
            y: 0,
        },
        eventFormActive: false,
        events: [],
        eventFormDate: moment(),
    },
    actions: {
        addEvent(context, payload) {
            return new Promise((resolve, reject) => {
                const event = {
                    description: payload,
                    date: context.state.eventFormDate,
                };
                Axios.post('/event', event)
                .then(res => {
                    if (res.status === 200) {
                        context.commit('addEvent', event);
                        resolve();
                    } else {
                        reject();
                    }
                })
            })
        }
    },
    mutations: {
        setCurrentMonth(state, payload) {
            state.currentMonth = payload;
        },
        setCurrentYear(state, payload) {
            state.currentYear = payload;
        },
        eventFormPos(state, payload) {
            state.eventPos = payload;
        },
        eventFormActive(state, payload) {
            state.eventFormActive = payload;
        },
        addEvent(state, payload) {
            state.events.push(payload);
        },
        eventFormDate(state, payload) {
            state.eventFormDate = payload;
        }
    }
});
