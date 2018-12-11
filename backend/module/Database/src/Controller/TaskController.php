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
 
    public function __construct(ITaskDao $taskDao, Adapter $dbAdapter) {
        $this->taskDao = $taskDao;
        $this->dbAdapter = $dbAdapter;
    }
        
    /*
     * @brief selectAction()
     * Select all tasks
     */
    public function selectAction() {
        
        //Gei id to GET Method
        $id = $this->params()->fromRoute('id', 0);
        
        $sql = "call sp_SelectTasks('$id')";        
        $statement = $this->dbAdapter->query($sql);
        $results = $statement->execute();
        $returnArray = array();
        foreach ($results as $result) {
        $returnArray[] = $result;
        }
        
        return new JsonModel(['task' => $returnArray, 'idtask' => $id]);
    }
    
    /*
     * @brief saveAction()
     * Create an task or update if exists
     */
    public function saveAction() {
        
        $status = false;
        
        if ($this->getRequest()->isPost())
        {   
            $id = $this->params()->fromQuery('id', 0);
            $name = $this->params()->fromQuery('name', '');
            $priority = $this->params()->fromQuery('priority', '');
            $expiration = $this->params()->fromQuery('expiration', '');
            $idUser = $this->params()->fromQuery('idUser', 'task');

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
        
        return new JsonModel(array('status' => $status));       
    }
    
    /*
     * @brief deleteAction()
     * Delete an task
     */
    public function deleteAction() {
        
        if ($this->getRequest()->isPost())
        { 
            $id = $this->params()->fromQuery('id', 0);  
            if ( $id <= 0 ) { return new JsonModel(array('status' => false)); }
        }        
        
        $this->taskDao->delete($id);

        if ( !$this->taskDao->getToID($id) )
        {
           return new JsonModel(array('status' => true));
        }  
    }
}
