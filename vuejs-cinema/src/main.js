import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import moment from 'moment-timezone';

import routes from './util/routes';
import { checkFilter, setDay } from './util/bus';
import tooltip from './util/tooltip';

moment.tz.setDefault('UTC');

Vue.use(tooltip);
Vue.use(VueRouter);
Vue.use(VueResource);
Object.defineProperty(Vue.prototype, '$moment', {
   get() {
      return this.$root.moment;
   },
});

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {
   get() {
      return this.$root.bus;
   },
});

const router = new VueRouter({ routes });

const app = new Vue({
   data: {
      bus,
      day: moment(),
      genre: [],
      movies: [],
      moment,
      time: [],
   },
   created() {
      this.$http.get('/api').then((response) => {
         this.movies = response.data;
      });
      this.$bus.$on('check-filter', checkFilter.bind(this));
      this.$bus.$on('set-day', setDay.bind(this));
   },
   router,
});

app.$mount('#app');
