import { createRouter, createWebHashHistory } from 'vue-router'
import App                                    from '../App.vue'

import Login    from '../components/Login.vue'
import SignUp   from '../components/SignUp.vue'
import Home     from '../components/Home.vue'
import View     from '../components/View.vue'
import Insert   from '../components/Insert.vue'
import Consult  from '../components/Consult.vue'
import InsertPersona from '../components/InsertPersona.vue'


const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/user/login',
    name: "login",
    component: Login
  },
  {
    path: '/user/signUp',
    name: "signUp",
    component: SignUp
  },
  {
    path: '/user/home',
    name: "home",
    component: Home
  },
  {
    path: '/user/view',
    name: "View",
    component: View
  },
  {
    path: '/user/insert',
    name: "Insert",
    component: Insert
  },
  {
    path: '/user/consult',
    name: "Consult",
    component: Consult
  },
  {
    path: '/persona/insert',
    name: "InsertPersona",
    component: InsertPersona
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router