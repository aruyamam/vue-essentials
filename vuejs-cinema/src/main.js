import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

console.log(genres);

const app = new Vue({
   components: {
      'movie-list': {
         template: `
            <div id="movie-list">
               <div v-for="movie in movies" class="movie">{{ movie.title }}</div>
            </div>
         `,
         data() {
            return {
               movies: [
                  { title: 'Pulp Fiction' },
                  { title: 'Home Alone' },
                  { title: 'Autstin Powers' },
               ],
            };
         },
      },
      'movie-filter': {
         data() {
            return { genres };
         },
         template: `
            <div id="movie-filter">
               <h2>Filter results</h2>
               <div className="filter-group">
                  <check-filter v-for="genre in genres"></check-filter>
               </div>
            </div>
         `,
         components: {
            'check-filter': {
               template: `
                  <div>Filter</div>
               `,
            },
         },
      },
   },
});

app.$mount('#app');
