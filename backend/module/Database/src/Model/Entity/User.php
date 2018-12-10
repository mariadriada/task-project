<?php

/* 
 * User class to management the database users from IUserDao
 */

namespace Database\Model\Entity;

class User {
    
    private $id_user;
    private $email_user;
    private $passwd;
    private $type_user;
    private $connected;
    
    //SET and GET Methods
    
    public function getId() {
        return $this->id_user;
    }

    public function setId($value) {
        $this->id_user = $value;
    }
    
    public function getEmail() {
        return $this->email_user;
    }

    public function setEmail($value) {
        $this->email_user = $value;
    }
    
    public function getPasswd() {
        return $this->passwd;
    }

    public function setPasswd($value) {
        $this->passwd = $value;
    }
    
    public function getType() {
        return $this->type_user;
    }

    public function setType($value) {
        $this->type_user = $value;
    }
         
    public function getConnected() {
        return $this->connected;
    }

    public function setConnected($value) {
        $this->connected = $value;
    }
    
    public function exchangeArray($data) {
        $this->id_user = (isset($data['id_user']) ? $data['id_user'] : null);
        $this->email_user = (isset($data['email_user']) ? $data['email_user'] : null);
        $this->passwd = (isset($data['passwd']) ? $data['passwd'] : null);
        $this->type_user = (isset($data['type_user']) ? $data['type_user'] : null);
        $this->connected = (isset($data['connected']) ? $data['connected'] : null);       
    }
    
    public function getArrayCopy() {
        return get_object_vars($this);
    }
}