<?php
namespace Database;

use Zend\Router\Http\Segment;

return [
    'controllers' => [        
        'factories' => [           
            Controller\TaskController::class => Controller\ControllerFactory::class,
            Controller\UserController::class => Controller\ControllerFactory::class,
        ],
    ],
    'router' => [
        'routes' => [           
            'task' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/task[/:action][/:id]',
                    'defaults' => [
                        'controller' => Controller\TaskController::class,
                        'action'     => 'select',
                    ],
                ],
            ],
            'user' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/user[/:action][/:id]',
                    'defaults' => [
                        'controller' => Controller\UserController::class,
                        'action'     => 'select',
                    ],
                ],
            ],
        ],
    ],
    'view_manager' => [
        'template_path_stack' => [
            'Database' => __DIR__ . '/../view',
        ],
    ],
];
