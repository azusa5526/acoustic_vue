import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/views/Index';
import Products from '@/views/Products';
import News from '@/views/News';
import Appointment from '@/views/Appointment';
import SingleProduct from '@/views/SingleProduct';
import Login from '@/views/Login';

import Dashboard from '@/views/Dashboard';
import DashboardProducts from '@/views/DashboardProducts';
import DashboardOrder from '@/views/DashboardOrder';
import DashboardCoupon from '@/views/DashboardCoupon';
import DashboardOthers from '@/views/DashboardOthers';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/'
  },
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
    path: '/products/:productID',
    name: 'SingleProduct',
    component: SingleProduct
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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'products',
        name: 'DashboardProducts',
        component: DashboardProducts,
        meta: { requiresAuth: true }
      },
      {
        path: 'order',
        name: 'DashboardOrder',
        component: DashboardOrder,
        meta: { requiresAuth: true }
      },
      {
        path: 'coupon',
        name: 'DashboardCoupon',
        component: DashboardCoupon,
        meta: { requiresAuth: true }
      },
      {
        path: 'others',
        name: 'DashboardOthers',
        component: DashboardOthers,
        meta: { requiresAuth: true }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
