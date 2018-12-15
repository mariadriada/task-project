// Component to login

 const Aut = {
    template :  ` 
    <div>   
    <b-modal v-model="modalShow" no-close-on-backdrop no-close-on-esc 
             title="Ingreso al sistema"
             :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
             :body-bg-variant="bodyBgVariant"
             :body-text-variant="bodyTextVariant"
             :footer-bg-variant="footerBgVariant"
             :footer-text-variant="footerTextVariant">
       <b-container fluid>   
     
        <section v-if="session===false">      
        <p>{{ description }}</p> 
        <p>{{ admin }}</p> 
        <div class="form-container">     
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
                                label="Contraseña:">
                        <b-form-input 
                                type="password"
                                v-model="form.passwd"
                                required
                                placeholder="Ingrese su contraseña">
                        </b-form-input>   
                         
                </b-form-group>               
                
                <b-button type="submit" variant="primary">Ingresar</b-button>
                <b-button type="reset" variant="danger">Limpiar</b-button>
            </b-form>
        </div>
        </section>    
       </b-container>
       <div slot="modal-footer" class="w-100">  
       </div>       
    </b-modal>   
  </div>
    `,
    
    data () {
        return {
            show: true,
            variants: [
              'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'
            ],
            headerBgVariant: 'dark',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark',
            footerBgVariant: 'dark',
            footerTextVariant: 'dark',
            title: 'Ingreso al sistema',
            description: 'Para administrar sus tareas debe iniciar sesion',
            admin: 'Para administrar usuarios debe tener permisos en el sistema',            
            modalShow: true,
            session: false,
            messageError: 'error',
            form: {
                email: '',
                name: ''                        
            },        
          }
    },
    methods: {
        onSubmit (evt) {
        evt.preventDefault()
        this.clearSession()
      
        //Parameeters
        const param = new URLSearchParams()
        param.append('email', this.form.email)
        param.append('passwd', this.form.passwd)

        const url = 'http://localhost/task-project/backend/public/user/validate'
        axios.post(url, param)
        .then((response) => {
            console.log(response.data)               
            if ( response.status == 200 )
            {
                if (response.data.status) {
                    localStorage.setItem('session', true)
                    localStorage.setItem('id', response.data.id)
                    localStorage.setItem('type', response.data.type)

                    //Open task page
                    this.$router.push('/task')                  
                }
                else {
                    this.messageError = 'Usuario o Contraseña incorrecto.'
                    this.showAlert();
                }
            }
            }).catch((error) => {
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
            localStorage.session = false
            localStorage.id = 0
            localStorage.type = ''
        }
    },   
    mounted() {
        
    }     
}

export default Aut