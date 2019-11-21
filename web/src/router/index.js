import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import LogIn from '@/views/LogIn.vue'
import SignUp from '@/views/SignUp.vue'

// ANSWER
import Answer from '@/views/Answer/Answer.vue'
import PollCode from '@/views/Answer/PollCode.vue'
import Poll from '@/views/Answer/Poll.vue'
import Statistics from '@/views/Answer/Statistics.vue'

// CREATE
import Create from '@/views/Create/Create.vue'
import DefinePoll from '@/views/Create/DefinePoll.vue'
import PollInfo from '@/views/Create/PollInfo.vue'

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
        path: 'poll/:code',
        name: 'poll',
        component: Poll
      },
      {
        path: 'statistics/:code',
        name: 'statistics',
        component: Statistics
      }
    ]
  },
  {
    path: '/create',
    component: Create,
    children: [
      {
        path: '',
        name: 'definePoll',
        component: DefinePoll
      },
      {
        path: 'pollInfo',
        name: 'pollInfo',
        component: PollInfo
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
