
# About this project

Manage task. 

##  Architecture

Api REST for backend with MySql database,applied dependency injection.
Simple frontend using components with Vue.js and apllied POO js when is necessary.


## Technologies

**-Backend:** 

Zend Framework(use composer), MySql database, PHP7. 

**-Frontend:** 

Vue.js, Bootstrap-vue

**-Development environment:**

Ubuntu, Netbeans, VS Code, Apache 2


## Functionality

+ *Type of users:* admin, task.
+ Login 
+ CRUD task
+ Alert about upcoming task to expire. Criterion applied:  days before expire >=3
+ Create users (Only administrators)


## **How to get start**

### Prerequisites

#### 1. Apache2

sudo apt install apache2

#### 2. MySql 5.7

sudo apt install mysql-server

#### 3. Composer
sudo apt install composer

#### 4. PHP 7.2

sudo apt-get install software-properties-common

sudo add-apt-repository ppa:ondrej/php

sudo apt install php7.1 php7.1-common php7.1-opcache php7.1-mcrypt php7.1-cli php7.1-gd php7.1-curl php7.1-mysql

### **Repository**

Clone repository in directory of reference to http://localhost in order with your apache installation (example ‘/var/www/html’)

*Apply the comands with ‘sudo’ if its neccesary;*

cd /var/www/html

git clone https://github.com/mariadriada/task-project.git

### **Database**

**Name database:** task_db

*Create the database based on the sql file:*

task-project/backend/script_task_db.sql

*Create MySql user for connect to database*

mysql -u root -p

CREATE USER 'task'@'localhost' IDENTIFIED BY 'task';

GRANT ALL PRIVILEGES ON *.* TO 'task'@'localhost' WITH GRANT OPTION;

exit

*If you don't want create a database user, you can configure the mysql user exists, in the file*

task-project/backend/config/autoload/local.php

*The database driver config it's not neccesary change, but for you information it's in file:*

task-project/backend/config/autoload/global.php

### **Install backend project with composer**

cd task-project/backend/

composer install

*For verify you can go to:*
http://localhost/task-project/backend/public/task

The response must be:

{"task":[],"status":true}

###  **Start frontend project and review**

The database have to default 2 users:

- User: admin@admin.com, password: admin.
- User: task@task.com, password: task.

If you want, you can review the database table: user.

**Finally:**

**Go to:** http://localhost/task-project/frontend/


*Thanks a lot for review!*

**About Maria Giraldo!**

I am software developer and I love the software in all around it.

mariagiraldo4@gmail.com

https://www.linkedin.com/in/mariadriada/


