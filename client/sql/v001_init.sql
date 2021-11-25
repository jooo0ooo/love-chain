-- `t_member`
CREATE TABLE `t_member`
(
  `seq`           bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid`          varchar(64)         NOT NULL COMMENT 'member uuid',
  `username`      varchar(50)         NOT NULL DEFAULT 'UNASSIGNED' COMMENT 'member name',
  `email`         varchar(128)        NOT NULL DEFAULT 'UNASSIGNED' COMMENT 'member email',
  `password`      varchar(256)        NOT NULL DEFAULT 'UNASSIGNED' COMMENT 'member password',
  `access_token`  varchar(64)         NOT NULL COMMENT 'access token for external api',
  `created_at`    timestamp           NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    timestamp           NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`seq`),
  UNIQUE KEY `uix-member-uuid` (`uuid`),
  KEY `idx-member-email` (`email`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT 'member';