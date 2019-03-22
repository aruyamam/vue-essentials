import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

Vue.use(VueResource);

const app = new Vue({
   components: {
      MovieList,
      MovieFilter,
   },
   data: {
      genre: [],
      time: [],
      movies: [],
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
