<?php

/* 
 * Controller for users
 */

namespace Database\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Database\Model\Dao\IUserDao;


use Zend\Db\Adapter\Adapter;
use Zend\View\Model\JsonModel;
use Zend\Mvc\Controller\ActionController;
use Zend\Http;
use Zend\Http\Request;

use Database\Model\Entity\User;
use Database\Model\Dao\UserDao;


class UserController extends AbstractActionController
{
    private $userDao;
      
    public function __construct(IUserDao $userDao) {
        $this->userDao = $userDao;       
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
     * @brief createAction()
     * Create an user or update if exists
     */
    public function saveAction() {
        
        $status = false;
        
        if ($this->getRequest()->isPost())
        {   
            $id = $this->params()->fromQuery('id', 0);
            $email = $this->params()->fromQuery('email', '');
            $passwd = $this->params()->fromQuery('passwd', '');
            $type = $this->params()->fromQuery('type', 'task');

            $user = new User();
            $user->setId($id);
            $user->setEmail($email);
            $user->setPasswd($passwd);
            $user->setType($type);

            $this->userDao->save($user);            
        }
        else { return new JsonModel(array('status' => $status)); }
        
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
            $id = $this->params()->fromQuery('id', 0);  
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
            $id = $this->params()->fromQuery('id', 0);  
            $connected = $this->params()->fromQuery('connected', 0);    
            
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
}
