<?php

/* 
 * User class to management the database tasks from ITaskDao
 */

namespace Database\Model\Entity;

class Task {
    
    private $id_task;
    private $name_task;
    private $priority_task;
    private $expiration_task;
    private $id_user;
    
    public function getId() {
        return $this->id_task;
    }
    
    public function setID($value) {
        $this->id_task = $value;
    }
    
    public function getName() {
        return $this->name_task;
    }
    
    public function setName($value) {
        $this->name_task = $value;
    }
    
    public function getPriority() {
        return $this->priority_task;
    }
    
    public function setPriority($value) {
        $this->priority_task = $value;
    }
    
    public function getExpiration() {
        return $this->expiration_task;
    }
    
    public function setExpiration($value) {
        $this->expiration_task = $value;
    }
    
    public function getIdUser() {
        return $this->id_user;
    }
    
    public function setIdUser($value) {
        $this->id_user = $value;
    }
    
    public function exchangeArray($data) {
        $this->id_task = (isset($data['id']) ? $data['id'] : null);
        $this->name_task = (isset($data['name_task']) ? $data['name_task'] : null);
        $this->priority_task = (isset($data['priority_task']) ? $data['priority_task'] : null);
        $this->expiration_task = (isset($data['expiration_task']) ? $data['expiration_task'] : null);
        $this->id_user = (isset($data['id_user']) ? $data['id_user'] : null);
    }
    
    public function getArrayCopy() {
        return get_object_vars($this);
    }
}