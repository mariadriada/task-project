<?php

/* 
 * Controller for tasks
 */

namespace Database\Controller;

use Zend\Mvc\Controller\AbstractActionController;

use Zend\Db\Adapter\Adapter;
use Zend\View\Model\JsonModel;
use Database\Model\Entity\Task;
use Database\Model\Dao\ITaskDao;

class TaskController extends AbstractActionController
{
    private $taskDao;
    private $dbAdapter;
    private $header;
 
    public function __construct(ITaskDao $taskDao, Adapter $dbAdapter) {
        $this->taskDao = $taskDao;
        $this->dbAdapter = $dbAdapter;
    }
        
    /*
     * @brief selectAction()
     * Select all tasks
     */
    public function selectAction() {
        
        //Gei id to POST Method
        $id = $this->params()->fromPost('id', 0);
        
        $sql = "call sp_SelectTasks('$id')";        
        $statement = $this->dbAdapter->query($sql);
        $results = $statement->execute();
        $returnArray = array();
        foreach ($results as $result) {
        $returnArray[] = $result;
        }
        
        return new JsonModel(['task' => $returnArray, 'status' => true]);       
    }
    
    /*
     * @brief saveAction()
     * Create an task or update if exists
     */
    public function saveAction() {
            
        $status = false;
        
        if ($this->getRequest()->isPost())
        {   
            $id = $this->params()->fromPost('id', 0);
            $name = $this->params()->fromPost('name', '');
            $priority = $this->params()->fromPost('priority', '');
            $expiration = $this->params()->fromPost('expiration', '');
            $idUser = $this->params()->fromPost('idUser', 0);

            $task = new Task();
            $task->setID($id);
            $task->setName($name);
            $task->setExpiration($expiration);
            $task->setPriority($priority);
            $task->setIdUser($idUser);
                        
            //save
            $this->taskDao->save($task);
        }
        else { return new JsonModel(array('status' => $status)); }
                                  
        // Validate insert       
        if ( $id == 0 && $this->taskDao->lastInsertValue() > 0) {
            $status = true;                
        }            
        else 
        {
            // Validate update
            $row = $this->taskDao->getToID($id);
            if ( $row->getName() == $name ) { $status = true; }
        }
        
        return new JsonModel(array('status' => $status,
                                'idnew' => $this->taskDao->lastInsertValue() ));       
    }
    
    /*
     * @brief deleteAction()
     * Delete an task
     */
    public function deleteAction() {
        
        if ($this->getRequest()->isPost())
        { 
            $id = $this->params()->fromPost('id', 0);  
            if ( $id <= 0 ) { return new JsonModel(array('status' => false)); }
        }        
        
        $this->taskDao->delete($id);

        if ( !$this->taskDao->getToID($id) )
        {
           return new JsonModel(array('status' => true));
        }  
    }
}
