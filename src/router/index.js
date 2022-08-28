import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home');
const Profile = () => import('../views/profile/Profile');
const Shopcart = () => import('../views/shopcart/Shopcart');
const Category = () => import('../views/category/Category');
const Detail = () => import('../views/detail/Detail');

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {show: true}
  },
  {
    path: '/profile',
    component: Profile,
    meta: {show: true}
  },
  {
    path: '/shopcart',
    component: Shopcart,
    meta: {show: true}
  },
  {
    path: '/category',
    component: Category,
    meta: {show: true}
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {show: false}
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router
