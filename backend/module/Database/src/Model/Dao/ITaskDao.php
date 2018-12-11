<?php

/* 
 * Interface for the Task DAO
 */

namespace Database\Model\Dao;

use Database\Model\Entity\Task;

interface ITaskDao {
    
    public function getAll();
    
    public function getToID($id);
    
    public function save(Task $task);
    
    public function delete($id);
    
}