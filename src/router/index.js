import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/views/Index';
import Products from '@/views/Products';
import News from '@/views/News';
import Appointment from '@/views/Appointment';
import SingleProduct from '@/views/SingleProduct';
import Login from '@/views/Login';
import Dashboard from '@/views/Dashboard';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/appointment',
    name: 'Appointment',
    component: Appointment
  },
  {
    path: '/singleProduct',
    name: 'SingleProduct',
    component: SingleProduct
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
];

const router = new VueRouter({
  routes
});

export default router;
