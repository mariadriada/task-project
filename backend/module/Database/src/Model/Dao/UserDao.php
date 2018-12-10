<?php

/* 
 * Data Object Access(DAO)for User
 */

namespace Database\Model\Dao;

use Zend\Db\TableGateway\TableGateway;
use RuntimeException;
use Database\Model\Entity\User;

class UserDao implements IUserDao {    

    protected $tableGateway;
    
    public function __construct(TableGateway $tableGateway) {
        $this->tableGateway = $tableGateway;
    }
    
    public function getAll() {
        $resultSet = $this->tableGateway->select();
        return $resultSet;
    }
    
    public function getToID($id) {
        $rowset = $this->tableGateway->select(['id_user'=> (int)$id]);
        $row = $rowset->current();
        if ( !$row ) {
            //throw new RuntimeException("Not found user: $id");
            $row = false;
        }      
        return $row;
    }
    
    public function save(User $user) {    
        
        $data = [
            'id_user' => $user->getId(),
            'email_user' => $user->getEmail(),
            'passwd' => $user->getPasswd(),
            'type_user' => $user->getType(),
        ];
        
        $id = (int) $user->getId();
        
        if ( $id == 0 ) {
            // Insert new user
            $this->tableGateway->insert($data);
        }
        else {
            // Update exist data user 
            if ($this->getToID($id)) {
                $this->tableGateway->update($data, ['id_user' => $id]);
            }
            else {
                throw new RuntimeException("User id not exists: $id");
            }
        }
    }
    
    public function delete($id) {
        if ($id > 0)
        { $this->tableGateway->delete(['id_user' => (int)$id]); }
    }
    
    public function lastInsertValue() {
        return $this->tableGateway->lastInsertValue;
    }
    
    public function updateSesionUser(User $user) {
         $data = [
            'id_user' => $user->getId(),            
            'connected' => $user->getConnected()
        ];
        $this->tableGateway->update($data, ['id_user' => $user->getId()]);
    }
}