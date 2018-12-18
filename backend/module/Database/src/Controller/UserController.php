<?php

/* 
 * Controller for users
 */

namespace Database\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Database\Model\Dao\IUserDao;
use Zend\View\Model\JsonModel;
use Database\Model\Entity\User;
use Zend\Db\Adapter\Adapter;


class UserController extends AbstractActionController
{
    private $userDao;
    private $dbAdapter;
      
    public function __construct(IUserDao $userDao, Adapter $dbAdapter) {
        $this->userDao = $userDao;  
        $this->dbAdapter = $dbAdapter;
    }    
        
    /*
     * @brief selectAction()
     * Select all users
     */
    public function selectAction() {
        $this->userDao->getAll();
        return new JsonModel($this->userDao->getAll());     
    }
    
    /*
     * @brief saveAction()
     * Create an user or update if exists
     */
    public function saveAction() {
        
        $status = false;
        
        if ($this->getRequest()->isPost())
        {   
            $id = $this->params()->fromPost('id', 0);
            $email = $this->params()->fromPost('email', '');
            $passwd = $this->params()->fromPost('passwd', '');
            $type = $this->params()->fromPost('type', 'task');

            $user = new User();
            $user->setId($id);
            $user->setEmail($email);
            $user->setPasswd($passwd);
            $user->setType($type);

            $exists = $this->userDao->save($user);  
        }
        else { return new JsonModel(array('status' => $status)); }  
        
        // Validate exists user
        if ( $exists == 'exists' ) {
            return new JsonModel(array('status' => $status, 
                                        'msj' => 'El email ya se encuentra registrado'));     
        }
               
        // Validate insert       
        if ( $id == 0 && $this->userDao->lastInsertValue() > 0) {
            $status = true;                
        }            
        else 
        {
            // Validate update
            $row = $this->userDao->getToID($id);
            if ( $row->getEmail() == $email ) { $status = true; }
        }
        
        return new JsonModel(array('status' => $status));       
    }
    
    /*
     * @brief deleteAction()
     * Delete an user
     */
    public function deleteAction() {
        
        if ($this->getRequest()->isPost())
        { 
            $id = $this->params()->fromPost('id', 0);  
            if ( $id <= 0 ) { return new JsonModel(array('status' => false)); }
        }        
        
        $this->userDao->delete($id);

        if ( !$this->userDao->getToID($id) )
        {
           return new JsonModel(array('status' => true));
        }  
    }
    
    /*
    * @brief connectedAction()
    * Update connection status of user
    */
    public function connectedAction() {
                
        if ($this->getRequest()->isPost())
        { 
            $id = $this->params()->fromPosty('id', 0);  
            $connected = $this->params()->fromPost('connected', 0);    
            
            $user = new User();
            $user->setId($id);
            $user->setConnected($connected);
        }
        else {
            return new JsonModel(array('status' => false));
        }
        
        $this->userDao->updateSesionUser($user);
        
        // Validate update
        $row = $this->userDao->getToID($id);
        if ( $row->getConnected() == $connected ) 
        {
            return new JsonModel(array('status' => true)); 
        }
    }
    
    /*
    * @brief connectedAction()
    * Validate use session
    */
    public function validateAction() {        
       
        if ($this->getRequest()->isPost())
        { 
            $email = $this->params()->fromPost('email', 0);  
            $passwd = $this->params()->fromPost('passwd', '');    
        }
        else {
            return new JsonModel(array('status' => false));
        }
        
        $sql = "call sp_ValidateUser('$email', '$passwd')"; 
        
        $statement = $this->dbAdapter->query($sql);
        $results = $statement->execute();
        $returnArray = array();
        foreach ($results as $result) {
            $returnArray[] = $result;
        }
        
        if (!$returnArray)
        {
            return new JsonModel(array('status' => false));
        }
        
        return new JsonModel(array('status' => true, 
                                    'id' => $returnArray[0]['id_user'], 
                                    'type' => $returnArray[0]['type_user']));
    }
}
