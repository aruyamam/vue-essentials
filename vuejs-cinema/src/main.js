import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import moment from 'moment-timezone';

import Overview from './components/Overview.vue';

import routes from './util/routes';
import { checkFilter } from './util/bus';

moment.tz.setDefault('UTC');

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
   components: {
      Overview,
   },
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
   },
   router,
});

app.$mount('#app');
