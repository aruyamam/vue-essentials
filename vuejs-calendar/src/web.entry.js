import Vue from 'vue';
import './style.scss';

import moment from 'moment-timezone';
import store from './store';

import App from './components/App.vue';

const events = window.__INITIAL_STATE__.map(event => ({
   description: event.description,
   date: moment(event.date),
}));

const initialState = Object.assign({}, store.state, { events });
store.replaceState(initialState);

moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', {
   get() {
      return this.$root.moment;
   },
});

const app = new Vue({
   components: {
      App,
   },
   data: {
      moment,
   },
   store,
});

app.$mount('#app');
