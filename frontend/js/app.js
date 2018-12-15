// Main app

import Aut from '../components/autentication.js'
import Tasks from '../components/task.js'
import User from '../components/user.js'
import Alert from '../components/alert.js'

//Registry components
Vue.component('aut', Aut)
Vue.component('tasks', Tasks)
Vue.component('alert', Alert)
Vue.component('date-picker', VueBootstrapDatetimePicker);

// Routes
const routes = [   
  { path: '/', component: Aut },
  { path: '/task', component: Tasks },
  { path: '/user', component: User },
]
const router = new VueRouter({
  routes
})

// Load app
const app = new Vue({
  router,
 
  data() {
    return{
      'title': 'Gestión de tareas',        
    }
  }

}).$mount('#app')


