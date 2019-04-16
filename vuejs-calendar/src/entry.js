import Vue from 'vue';

import moment from 'moment-timezone';
import store from './store';

import App from './components/App.vue';

export default function (events) {
   const initialState = Object.assign({}, store.state, { events });
   store.replaceState(initialState);

   moment.tz.setDefault('UTC');
   Object.defineProperty(Vue.prototype, '$moment', {
      get() {
         return this.$root.moment;
      },
   });

   return new Vue({
      components: {
         App,
      },
      data: {
         moment,
      },
      store,
      render(createElement) {
         return createElement('div', { attrs: { id: 'app' } }, [createElement('app')]);
      },
   });
}
