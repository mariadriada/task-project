<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Database\Controller;

use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

use Database\Model\Dao\ITaskDao;
use Database\Model\Dao\IUserDao;

class ControllerFactory  implements FactoryInterface
{
    
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        switch ($requestedName) {
            
            case TaskController::class :
                $taskDao = $container->get(ITaskDao::class);
                $dbAdapter = $container->get('adapter');
                $controller = new TaskController($taskDao, $dbAdapter);
            break;
        
            case UserController::class :
                $userDao = $container->get(IUserDao::class);
                $controller = new UserController($userDao);
            break;
        
            default:
                 return (null === $options) ? new $requestedName : new $requestedName($options);
                
        }
        
        return $controller;
    }
}