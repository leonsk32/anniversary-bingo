import Vue from 'vue';
import VueRouter from 'vue-router';
import Create from '@/views/Create.vue';
import Bingo from '@/views/Bingo.vue';
import Admin from '@/views/Admin.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Create',
    component: Create,
  },
  {
    path: '/bingo',
    name: 'Bingo',
    component: Bingo,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
