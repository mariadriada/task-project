 // Component of alert that shows to when the task is about to expire

 const Alert = {
    template :  `
    <div>       
       <b-alert show variant="warning">
        {{ name }}, vence en {{ days }} dias.
       </b-alert>
    </div>
    `,
    props:['name', 'days']

}

export default Alert