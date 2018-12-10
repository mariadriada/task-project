<?php
namespace Database;

use Zend\Router\Http\Segment;
use Zend\ServiceManager\Factory\InvokableFactory;


return [
    'controllers' => [        
        'factories' => [
           // Controller\IndexController::class => InvokableFactory::class,
           
            Controller\IndexController::class => Controller\ControllerFactory::class,
            Controller\UserController::class => Controller\ControllerFactory::class,
        ],
    ],
    'router' => [
        'routes' => [           
            'api' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/api[/:action][/:id]',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
            'user' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/user[/:action][/:id]',
                    'defaults' => [
                        'controller' => Controller\UserController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
        ],
    ],
    'view_manager' => [
        'template_path_stack' => [
            'Database' => __DIR__ . '/../view',
        ],
        /*'strategies' => [
            'ViewJsonStrategy',
        ]*/
    ],
];
