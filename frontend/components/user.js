// Component to management users

const User = {
    template: `
        <div class="container" v-if="type=='admin'">
            <br/><h1>Administración de usuarios</h1>
            <p>Unicamente los administradores pueden ingresar en esta sección</p>

            <!-- Messages -->
            <b-alert :show="dismissCountDown"
                        dismissible
                        :variant="typeMessage"
                        @dismissed="dismissCountDown=0"
                        @dismiss-count-down="countDownChanged">
                <p>{{ message }}</p>
                <b-progress :variant="typeMessage"
                        :max="dismissSecs"
                        :value="dismissCountDown"
                        height="4px">
                </b-progress>
            </b-alert>
            

            <!-- Formulario para crear usuarios -->
            <section>
            <div class="form2-container">     
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group 
                                label="Email"
                                label-for="input_email"
                                description="Por favor escriba su dirección de correo">
                    <b-form-input id="input_email"
                                type="email"
                                v-model="form.email"
                                required
                                placeholder="e-mail@example.com">
                    </b-form-input>
                </b-form-group>

                <b-form-group 
                                label="Tipo de usuario"
                                label-for="input_type">
                                <b-form-select v-model="selected" required :options="options" class="mb-3" size="sm" />
                   
                </b-form-group>

                <b-form-group 
                                label="Contraseña:">
                    <b-form-input 
                                type="password"
                                v-model="form.passwd"
                                required
                                placeholder="Ingrese su contraseña">
                    </b-form-input>        
                </b-form-group>
                <b-form-group 
                                label="Confirmación de contraseña:">
                    <b-form-input 
                                type="password"
                                v-model="form.cpasswd"
                                required
                                placeholder="Confirme su contraseña">
                    </b-form-input>        
                </b-form-group>    
                
                <b-button type="submit" variant="primary">Crear</b-button>
                <b-button type="reset" variant="danger">Limpiar</b-button>
                <b-button v-on:click="goToHome" variant="success">Ingresar</b-button>
               
            </b-form>
            </div>
            </section>

        </div>
    `,
    data () {
        return {
            idUser: 0,
            type:'',
            show: true,
            selected: null,
            options: [
              { value: null, text: 'Seleccionar' },
              { value: 'admin', text: 'Administrador' },
              { value: 'task', text: 'Gestor de tareas' },
            ],
            session: false,
            message: '',
            form: {
                email: '',
                name: ''                        
            },
            typeMessage: 'danger',
            dismissSecs: 5,
            dismissCountDown: 0,
            showDismissibleAlert: false
          }
    },
    methods: {
        // Crate a user
        create(response) {
            console.log(response.data)               
            if ( response.status == 200 )
            {
                if (response.data.status) {
                    localStorage.session = true
                    localStorage.id = response.data.id
                    localStorage.type = response.data.type 
                    
                    this.form.email = ''
                    this.form.passwd = ''
                    this.form.cpasswd = ''
                    this.selected = null
                
                    this.typeMessage = 'success'
                    this.message = 'Usuario creado correctamente!'
                    this.showAlert();
                }
                else {
                    this.message = 'Hubo un error al crear el usuario. Por favor intente de nuevo.'
                    this.showAlert();
                }
            }
        },
        onSubmit (evt) {
            evt.preventDefault()

            //Validar contraseña
            if( this.form.passwd != this.form.cpasswd ) {
                this.message = 'Confirmación de contraseña incorrecta.'
                this.showAlert();
                return
            }

            //Parameters
            const param = new URLSearchParams()
            param.append('email', this.form.email)
            param.append('passwd', this.form.passwd)
            param.append('type', this.selected)

            const url = 'http://localhost/task-project/backend/public/user/save'
            axios.post(url, param)
            .then(this.create).catch((error) => {
                console.log('Error', error)
            })  
        },
        onReset (evt) {
            evt.preventDefault()
            /* Reset our form values */
            this.form.email = ''
            this.form.passwd = ''
            this.form.cpasswd = null
            /* Trick to reset/clear native browser form validation state */
            this.show = false;
            this.$nextTick(() => { this.show = true })
        },  
        countDownChanged (dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert () {
        this.dismissCountDown = this.dismissSecs
        },
        clearSession() {
            localStorage.session = ''
            localStorage.id = 0
            localStorage.type = ''
        },
        goToHome() {
            this.$router.push('/')
        }
    },
    create() {
        this.idUser = localStorage.id
    },
    mounted() {
        this.type = localStorage.getItem('type')
    }     

}
export default User