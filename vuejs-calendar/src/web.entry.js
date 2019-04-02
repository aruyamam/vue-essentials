import Vue from 'vue';
import './style.scss';

import App from './components/App.vue';

const app = new Vue({
   components: {
      App,
   },
});

app.$mount('#app');
