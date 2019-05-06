import Vue from 'vue';
import Router from 'vue-router';
import App from './components/HelloWorld';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'HelloWorld',
      component: App,
    }
  ]
});

export default router
