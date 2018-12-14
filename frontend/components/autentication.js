
 const Aut = {
    template :  ` 
    <div>   
    <b-modal v-model="modalShow"
             title="Ingreso al sistema"
             :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
             :body-bg-variant="bodyBgVariant"
             :body-text-variant="bodyTextVariant"
             :footer-bg-variant="footerBgVariant"
             :footer-text-variant="footerTextVariant">
       <b-container fluid>   

       <!--Verificar contraseña-->
       <b-alert :show="dismissCountDown"
                dismissible
                variant="danger"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged">
         <p>{{ messageError }}</p>
         <b-progress variant="danger"
                     :max="dismissSecs"
                     :value="dismissCountDown"
                     height="4px">
         </b-progress>
       </b-alert>
       
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
                <b-form-group 
                                label="Confirmación de contraseña:">
                    <b-form-input 
                                type="password"
                                v-model="form.cpasswd"
                                required
                                placeholder="Confirme su contraseña">
                    </b-form-input>        
                </b-form-group>    
                
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
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
            show: false,
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
            show: true,
            dismissSecs: 5,
            dismissCountDown: 0,
            showDismissibleAlert: false
          }
    },
    methods: {
        onSubmit (evt) {
        evt.preventDefault()
        this.clearSession()

        //Validar contraseña
        if( this.form.passwd != this.form.cpasswd ) {
            this.messageError = 'Confirmación de contraseña incorrecta.'
            this.showAlert();
            return
        }

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
                    console.log('correcto')
                    console.log("status", response.data.status)
                    console.log("type", response.data.type)
                    localStorage.session = true
                    console.log('Validar ', localStorage.session)
                    this.$nextTick(() => { 
                        console.log('Pasar a las tareas')
                     })
                   
                }
                else {
                    this.messageError = 'Usuario o Contraseña incorrecto.'
                    this.showAlert();
                }
               
                this.$nextTick(() => { 
                    console.log('abrir tareas')
                    })
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
            localStorage.session = ''
            localStorage.id = 0
            localStorage.type = ''
        }
    },   
    mounted() {
        
    }     
}

export default Aut