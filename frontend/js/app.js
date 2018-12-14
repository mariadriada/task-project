import Task from '../class/task.js'
import Aut from '../components/autentication.js'
import Tasks from '../components/task.js'


  const movieCard = {
    props: ['image', 'title'],
    template: `
        <div>
        <img width="100" v-bind:src="image" v-bind:alt="title"/>
        <h2>{{ title }}</h2>  
        </div>
    `,
  }



//Vue.component('movie-card', movieCard)
Vue.component('aut', Aut)
Vue.component('tasks', Tasks)

  const routes = [
    { path: '/task', component: Tasks },
    { path: '/aut', component: Aut }
  ]
  
  const router = new VueRouter({
    routes // short for `routes: routes`
  })


const app = new Vue({
  router,
 
  data() {
    return{
      'title': 'Gestión de tareas',
      'sesion': localStorage.session,      
    }
  },
  mounted() {
    localStorage.session = true
    localStorage.type = ''
    localStorage.id = 0
    if (localStorage.name) {
      this.name = localStorage.name;
    }
  },
  watch: {
    name(newSession) {
      localStorage.session = newSession;
    },
    id(id) {
      localStorage.id = id;
    }
  }

}).$mount('#app')


