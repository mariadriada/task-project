// Component to management tasks

import TaskHttp from '../class/task.js'

const Tasks = {
    template :  
    ` 
    <div class="container" v-show="session">
        <!-- Alert messages -->
        <b-modal id="modalAlert"  v-model="showAlert" title="¡Alerta de vencimiento de tareas!" 
                :header-bg-variant="headerBgAlert"
                :footer-bg-variant="headerBgAlert"  >
            <b-container fluid >   
                <h5>Estas tareas están próximas a vencer</h5><br/>
                <div v-for="t in taskAlert" :key="t.id">                
                    <alert :name="t.name" :days="t.expiration_days"/>
                </div>                
            </b-container>
            <div slot="modal-footer" class="w-100"/>  
        </b-modal>       
        <!-- /Alert messages -->
        
        <!-- Buttons -->
        <br/>
        <b-btn v-b-modal.modalTask  variant="outline-success" size="lg">
            Crear nueva tarea
        </b-btn>       
        <b-btn v-on:click="goToUser" v-if="type==='admin'"  variant="outline-success" size="lg">
            Crear usuario
        </b-btn>
        <b-btn v-on:click="closeSession"  variant="outline-success" size="lg">
            Cerrar sesion
        </b-btn>

        <!-- Modal -->
        <b-modal id="modalTask"  v-model="modalTaskShow"
            title="Crear tarea"
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
            :footer-bg-variant="footerBgVariant"
            :footer-text-variant="footerTextVariant">

            <b-container fluid>   
                <p class="my-4">Crear nueva tarea</p>

                <!-- Task form -->
                <section class="form">
                    <form action="" class="text-center"> 
                        <b-form-input 
                                    type="text"
                                    v-model="name"
                                    required
                                    placeholder="Nombre de la nueva tarea">
                        </b-form-input>  
                        <b-form-input 
                                type="number"
                                v-model="priority"
                                required
                                placeholder="Prioridad de la nueva tarea">
                        </b-form-input> 
                        <!--<b-form-input 
                                type="text"
                                v-model="expiration"
                                required                               
                                placeholder="Vencimiento de la nueva tarea">
                        </b-form-input>-->
                        <div class="row">                            
                            <div class="col-md-12" >
                                Fecha de vencimiento
                                <date-picker v-model="expiration" :config="{format: 'YYYY-MM-DD'}"></date-picker>
                            </div>
                        </div>   

                        <!-- Botón para añadir -->
                        <br/>
                        <input @click="createTask" type="submit" value="Añadir" class="btn btn-success">
                    </form>
                </section>

            </b-container>
            <div slot="modal-footer" class="w-100"/>  
        </b-modal>

        <!-- Data table -->
        <section class="data">
            <br/><h3>Lista de tareas</h3><br/>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre tarea</th>
                        <th scope="col">Priodidad</th>
                        <th scope="col">Vencimiento</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(task, index) in tasks">
                        <td>{{ task.id }}</td>
                        <td>
                            <span v-if="formUpdate && idUpdate == index">
                                <!-- Update form -->
                                <input v-model="nameUpdate" type="text" class="form-control">
                            </span>
                            <span v-else>
                                <!-- Name data -->
                                {{ task.name }}
                            </span>
                        </td>
                        <td>
                            <span v-if="formUpdate && idUpdate == index">
                                <!-- Update form -->
                                <input v-model="priorityUpdate" type="number" class="form-control">
                            </span>
                            <span v-else>
                                <!-- Priority data -->
                                {{ task.priority }}
                            </span>
                        </td>
                        <td>
                            <span v-if="formUpdate && idUpdate == index">
                                <!-- Update form -->
                                <input v-model="expirationUpdate" type="text" class="form-control">
                            </span>
                            <span v-else>
                                <!-- Expiration data -->
                                {{ task.expiration }}
                            </span>
                        </td>
                        <td>
                            <!-- Save updated information -->
                            <span v-if="formUpdate && idUpdate == index">
                                <button @click="saveUpdate(task.id, index)" class="btn btn-success">Guardar</button>
                            </span>
                            <span v-else>
                                <!-- Show update form button -->
                                <button @click="showUpdateForm(index)" class="btn btn-primary">Actualizar</button>
                                <!-- Delee button -->
                                <button @click="deleteTask(task.id, index)" class="btn btn-danger">Eliminar</button>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
   
    `,
    
    data () {
        return {
            session:false,
            show: true,
            // Input name
            name: '',
            // Input priority
            priority: '',
            //input expiration
            expiration: '',
            // Show/Hide update form
            formUpdate: false,
            // Item list for update 
            idUpdate: -1,
            // Name input inside update form
            nameUpdate: '',
            // Priority input inside update form
            priorityUpdate: '',
            // Expiration input inside update form
            expirationUpdate: '',
            // Task list,
            type: '',
            modalTaskShow: false,
            showAlert: false,
            tasks: [],
            taskAlert: [],
            variants: [
                'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'red'
              ],
            headerBgAlert: 'warning',
            headerBgVariant: 'dark',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark',
            footerBgVariant: 'dark',
            footerTextVariant: 'dark',
            title: 'Ingreso al sistema',
            taskObj: ''
        }      
    },
    methods: {            
        // Callback called from createTask after create task in db
        taskListUpdate(response) {
            if ( response.status == 200 )
            {
                if (response.data.status) {
                    // Add item to list
                    this.tasks.push({
                        id: + response.data.idnew,
                        name: this.name,
                        priority: this.priority,
                        expiration: this.expiration                               
                    });                     
                    // Clear add form
                    this.name = '';
                    this.priority = '';
                    this.expiration = '';
                    //Hide modal                   
                    this.modalTaskShow = false;                
                } 
            }
        },
        //Create or update a task
        createTask: function (evt) {
            evt.preventDefault()
            //let taskObj = new Task(localStorage.id)
            this.taskObj.createTask(this.name, this.priority, this.expiration, 0, this.taskListUpdate)
        },
        // Show update form
        showUpdateForm: function (task_id) {
            // Before show form, to fill it fields
            this.idUpdate = task_id;
            this.nameUpdate = this.tasks[task_id].name;
            this.priorityUpdate = this.tasks[task_id].priority;
            this.expirationUpdate = this.tasks[task_id].expiration;
            // Show form
            this.formUpdate = true;
        },
        // Delete a task
        deleteTask: function (task_id, index) {
            console.log('delete id ', task_id)
            this.taskObj.deleteTask(task_id,()=>{
                    console.log('delete success')
                })            
            // delete item of list
            this.tasks.splice(index, 1);
        },
        // Save updated item 
        saveUpdate: function (task_id, index) {
            // Hide form
            this.formUpdate = false;
                      
            //the create function, also updates the element
            this.taskObj.createTask(this.nameUpdate, this.priorityUpdate, 
                                this.expirationUpdate, task_id, () =>{
                                    console.log('stored success')
                                })            
            // Update data
            this.tasks[index].name = this.nameUpdate;
            this.tasks[index].priority = this.priorityUpdate;
            this.tasks[index].expiration = this.expirationUpdate;
        },
        // Set task list when data loaded it from Task class
        setTaskList(response) {
            if ( response.status == 200 )
            {
                if (response.data.status) {
                    this.tasks = response.data.task               
                }   
                // Validate task expiration
                this.taskAlert = this.tasks.filter(function (task) {
                    return task.expiration_days <= 3;
                });
                console.log('alertas', this.taskAlert.length)
                if ( this.taskAlert.length >=1 ) this.showAlert = true
            }
        },
        // Close session
        closeSession() {
            localStorage.clear();
            this.$router.push('/')
        },
        // go to create users
        goToUser() {
            this.$router.push('/user')
        }

    },

    async mounted(){
        this.type = localStorage.getItem('type')
        this.session = localStorage.getItem('session')
        let taskObj = new TaskHttp(localStorage.id)   
        this.taskObj = taskObj    
        // Set task list
        await this.taskObj.selectAll(this.setTaskList)
    }
        
}

export default Tasks