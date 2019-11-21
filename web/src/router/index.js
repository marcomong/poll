import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import LogIn from '@/views/LogIn.vue'
import SignUp from '@/views/SignUp.vue'

import Answer from '@/views/Answer/Answer.vue'
import PollCode from '@/views/Answer/PollCode.vue'
import Poll from '@/views/Answer/Poll.vue'
import Statistics from '@/views/Answer/Statistics.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/logIn',
    name: 'logIn',
    component: LogIn
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/answer',
    component: Answer,
    children: [
      {
        path: '',
        name: 'pollCode',
        component: PollCode
      },
      {
        path: 'poll',
        name: 'poll',
        component: Poll
      },
      {
        path: 'statistics/:code',
        name: 'statistics',
        component: Statistics
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
