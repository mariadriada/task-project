<?php
/**
 * @link      http://github.com/zendframework/ZendSkeletonModule for the canonical source repository
 * @copyright Copyright (c) 2005-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Database;

use Zend\Db\Adapter\Adapter;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;

use Database\Model\Entity\Task;
use Database\Model\Entity\User;
use Database\Model\Dao\ITaskDao;
use Database\Model\Dao\TaskDao;
use Database\Model\Dao\IUserDao;
use Database\Model\Dao\UserDao;

class Module
{
    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }
    
    public function getServiceConfig(){
        return [
            'factories' => [
                'TaskTableGateway' => function($sm) {
            
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new Task());
                    return new TableGateway('task', $dbAdapter, null, $resultSetPrototype);                                        
                    
            
                },
                ITaskDao::class => function($sm) {
                    $tableGateway = $sm->get('TaskTableGateway');
                    $dao = new TaskDao($tableGateway);
                    return $dao;
                },
                'adapter' => function($sm) {
                     $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                     return $dbAdapter;
                },
                'UserTableGateway' => function($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new User());
                    return new TableGateway('user', $dbAdapter, null, $resultSetPrototype);                        
                },
                IUserDao::class => function($sm) {
                    $tableGateway = $sm->get('UserTableGateway');
                    $dao = new UserDao($tableGateway);
                    return $dao;
                }
            ],
        ];
    }
}
