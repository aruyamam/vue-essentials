import Vue from 'vue';
import './style.scss';
import Vuex from 'vuex';
import moment from 'moment-timezone';

import App from './components/App.vue';

Vue.use(Vuex);

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
   store: {
      state: {
         currentYear: 2019,
         currentMonth: 4,
      },
   },
});

app.$mount('#app');
