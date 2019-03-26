import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
import moment from 'moment-timezone';

import Overview from './components/Overview.vue'

import { checkFilter } from './util/bus';

moment.tz.setDefault('UTC');

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
});

app.$mount('#app');
