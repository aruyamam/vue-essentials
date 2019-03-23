import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
import moment from 'moment-timezone';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

moment.tz.setDefault('UTC');

Vue.use(VueResource);
Object.defineProperty(Vue.prototype, '$moment', {
   get() {
      return this.$root.moment;
   },
});

const app = new Vue({
   components: {
      MovieList,
      MovieFilter,
   },
   data: {
      genre: [],
      time: [],
      movies: [],
      moment,
   },
   created() {
      this.$http.get('/api').then((response) => {
         this.movies = response.data;
      });
   },
   methods: {
      checkFilter(category, title, checked) {
         if (checked) {
            this[category].push(title);
         }
         else {
            const index = this[category].indexOf(title);
            if (index > -1) {
               this[category].splice(index, 1);
            }
         }
      },
   },
});

app.$mount('#app');
