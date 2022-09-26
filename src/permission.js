import router from '@/router'
import store from '@/store'

const whitlist = ['/404', '/login']

router.beforeEach(async(to, from, next) => {
  if (store.getters.token) {
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whitlist.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
