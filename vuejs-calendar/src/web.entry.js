import Vue from 'vue';
import './style.scss';

import moment from 'moment-timezone';

import App from './components/App.vue';

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
});

app.$mount('#app');
