<?php

/* Interface for the User DAO
 */


namespace Database\Model\Dao;
use Database\Model\Entity\User;

interface IUserDao {
    
    public function getAll();
    
    public function getToID($id);  
    
    public function save(User $user); 
    
    public function delete($id);
    
    public function lastInsertValue();
    
    public function updateSesionUser(User $user);  
}