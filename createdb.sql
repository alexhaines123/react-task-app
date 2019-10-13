CREATE DATABASE IF NOT EXISTS `taskboard`;
USE `taskboard`;
CREATE TABLE IF NOT EXISTS `taskboard`.`lists` (
`listId` INT AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(150) NOT NULL
)
ENGINE = InnoDB;

CREATE  TABLE IF NOT EXISTS `taskboard`.`tasks` (
`taskId` INT  AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(250) NOT NULL ,
`description` VARCHAR(250) NOT NULL,
`listId` INT NOT NULL,
CONSTRAINT fk_task
FOREIGN KEY (listId) 
        REFERENCES lists(listId)
        ON DELETE CASCADE
)
ENGINE = InnoDB;

INSERT INTO lists (listId, name) VALUES (1, 'Garden');
INSERT INTO lists (listId, name) VALUES (2, 'House');

INSERT INTO tasks (taskId, name, description, listId) VALUES (1, 'Create raised bed', 'Raised use for growing carrots and herbs', 1);
INSERT INTO tasks (taskId, name, description, listId) VALUES (2, 'Fill raisedbed  with compost', 'Use compost from big compost bag', 1);
INSERT INTO tasks (taskId, name, description, listId) VALUES (3, 'Sow seed in raised bed', '', 1);
INSERT INTO tasks (taskId, name, description, listId) VALUES (4, 'Water seed with watering can', 'Fill can with water', 1);

INSERT INTO tasks (taskId, name, description, listId) VALUES (5, 'Put up the coat hooks', 'Need to drill holes into wall,fill with wall plugx and have drill charged', 2);
INSERT INTO tasks (taskId, name, description, listId) VALUES (6, 'Put up curtain rails', 'Needed before putting up curtains', 2);
INSERT INTO tasks (taskId, name, description, listId) VALUES (7, 'Put up curtains', '', 2);

SELECT * FROM tasks; SELECT * FROM lists;