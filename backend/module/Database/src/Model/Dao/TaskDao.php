<?php

/* 
 * Data Object Access(DAO) for Task
 */

namespace Database\Model\Dao;

use Zend\Db\TableGateway\TableGateway;
use Database\Model\Entity\Task;
use RuntimeException;

class TaskDao implements ITaskDao {
    
    protected $tableGateway;
    
    public function __construct(TableGateway $tableGateway) {
        $this->tableGateway = $tableGateway;
    }
    
    public function getAll() {
        $resultSet = $this->tableGateway->select();
        return $resultSet;
    }
    
    public function getToID($id) {
        $rowset = $this->tableGateway->select(['id_task'=> (int)$id]);
        $row = $rowset->current();
        if (!$row) {
            $row = false;
        }
        return $row;
    }
    
    public function save(Task $task) {    
        
        $data = [
            'id_task' => $task->getId(),
            'name_task' => $task->getName(),
            'priority_task' => $task->getPriority(),
            'expiration_task' => $task->getExpiration(),
            'id_user' => $task->getIdUser(),
        ];
        
        $id = (int) $task->getId();
        
        if ( $id == 0 ) {
            // Insert new task
            $this->tableGateway->insert($data);
        }
        else {
            // Update exist data task 
            if ($this->getToID($id)) {
                $this->tableGateway->update($data, ['id_task' => $id]);
            }
            else {
                throw new RuntimeException("Task id not exists: $id");
            }
        }
    }
    
    public function delete($id) {
        if ($id > 0)
        { $this->tableGateway->delete(['id_task' => (int)$id]); }
    }
    
    public function lastInsertValue() {
        return $this->tableGateway->lastInsertValue;
    }   
            
}
