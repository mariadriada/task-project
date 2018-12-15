-- DATABASE SCRIPT
CREATE DATABASE task_db;
USE task_db;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema task_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema task_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `task_db` DEFAULT CHARACTER SET utf8 ;
USE `task_db` ;

-- -----------------------------------------------------
-- Table `task_db`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `task_db`.`user` ;

CREATE TABLE IF NOT EXISTS `task_db`.`user` (
  `id_user` INT(11) NOT NULL AUTO_INCREMENT,
  `email_user` VARCHAR(255) NOT NULL,
  `passwd` VARCHAR(255) NOT NULL,
  `type_user` VARCHAR(45) NOT NULL DEFAULT 'task',
  `connected` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `email_user_UNIQUE` (`email_user` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8
COMMENT = 'Stores system users';


-- -----------------------------------------------------
-- Table `task_db`.`task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `task_db`.`task` ;

CREATE TABLE IF NOT EXISTS `task_db`.`task` (
  `id_task` INT(11) NOT NULL AUTO_INCREMENT,
  `name_task` VARCHAR(255) NOT NULL,
  `priority_task` INT(11) NOT NULL DEFAULT '0',
  `expiration_task` DATETIME NULL DEFAULT NULL,
  `id_user` INT(11) NOT NULL,
  PRIMARY KEY (`id_task`, `id_user`),
  INDEX `fk_tareas_usuarios_idx` (`id_user` ASC),
  CONSTRAINT `fk_tareas_usuarios`
    FOREIGN KEY (`id_user`)
    REFERENCES `task_db`.`user` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COMMENT = 'Stores user tasks';

USE `task_db` ;

-- -----------------------------------------------------
-- procedure sp_ChangeStatusUser
-- -----------------------------------------------------

USE `task_db`;
DROP procedure IF EXISTS `task_db`.`sp_ChangeStatusUser`;

DELIMITER $$
USE `task_db`$$
CREATE DEFINER=`task`@`localhost` PROCEDURE `sp_ChangeStatusUser`(
	IN _id INT,
	IN _connected BOOLEAN 
)
BEGIN

	UPDATE user 
    SET connected = _connected
    WHERE id_user = _id;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_SelectTasks
-- -----------------------------------------------------

USE `task_db`;
DROP procedure IF EXISTS `task_db`.`sp_SelectTasks`;

DELIMITER $$
USE `task_db`$$
CREATE DEFINER=`task`@`localhost` PROCEDURE `sp_SelectTasks`(
	IN _user int
)
BEGIN

	SELECT id_task as id, name_task as name, 
    priority_task as priority, expiration_task as expiration,
    DATEDIFF(expiration_task, CURDATE()) AS expiration_days
    FROM task
    WHERE id_user = _user
    ORDER BY priority_task DESC;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_ValidateUser
-- -----------------------------------------------------

USE `task_db`;
DROP procedure IF EXISTS `task_db`.`sp_ValidateUser`;

DELIMITER $$
USE `task_db`$$
CREATE DEFINER=`task`@`localhost` PROCEDURE `sp_ValidateUser`(
	IN _email VARCHAR(255),
    IN _passwd VARCHAR(255)    
)
BEGIN

	SELECT id_user, type_user FROM user
    WHERE email_user = _email
    AND passwd = _passwd;
    
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- -----------------------------------------------------
-- INSERT DEFAULT USERS
-- -----------------------------------------------------
INSERT INTO `task_db`.`user` (`email_user`, `passwd`, `type_user`) VALUES ('admin@admin.com', 'admin', 'admin');
INSERT INTO `task_db`.`user` (`email_user`, `passwd`, `type_user`) VALUES ('task@task.com', 'task', 'task');


