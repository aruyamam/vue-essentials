import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

const app = new Vue({
   components: {
      MovieList,
      MovieFilter,
   },
   data: {
      genre: [],
      time: [],
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
