//Class TaskHttp
class TaskHttp {

    constructor(idUser ) {
      this.idUser = idUser
      this.baseUrl = 'http://localhost/task-project/backend/public/task/'
      console.log('Estoy en el contructor de task id: ', idUser)
    }

    // Http petition for getting task list from database
    async selectAll(callback) {
      
      const param = new URLSearchParams()
      param.append('id', this.idUser)
      
      axios.post(this.baseUrl.concat("select"), param)
        .then(callback).catch((error) => {
                console.log('Error', error)
            })  
    }

    // Http pettition to create a task in database
    createTask(name, priority, expiration, id_task, callback ) {
      const param = new URLSearchParams()
      param.append('id', id_task)
      param.append('name', name)
      param.append('priority', priority)
      param.append('expiration', expiration)
      param.append('idUser', this.idUser)
      
      axios.post(this.baseUrl.concat("save"), param)
        .then(callback).catch((error) => {
                console.log('Error', error)
            })  
    }

    // Http petition to delete a task in database
    deleteTask(id_task, callback){
      const param = new URLSearchParams()
      param.append('id', id_task)
      axios.post(this.baseUrl.concat("delete"), param)
      .then(callback).catch((error) => {
              console.log('Error', error)
          })  
    }

    
  }
export default  TaskHttp