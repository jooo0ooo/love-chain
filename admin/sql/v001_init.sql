-- `t_admin_member`
CREATE TABLE `t_admin_member`
(
  `seq`           		    bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid`          		    varchar(64)         NOT NULL COMMENT 'admin uuid',
  `name`          		    varchar(50)         NOT NULL COMMENT 'admin name',
  `email`         		    varchar(128)        NOT NULL COMMENT 'admin email',
  `password`      		    varchar(256)        NOT NULL COMMENT 'admin password',
  `phone`         		    varchar(30)         NOT NULL COMMENT 'admin phone',
  `status`        		    varchar(30)         NOT NULL DEFAULT 'CREATED' COMMENT 'user status (CREATED, ACTIVE, BLOCKED, DORMANT, LEAVED_REQUESTED, LEAVED)',
  `otp_secret` 			      varchar(64) 			  NULL 	   DEFAULT NULL COMMENT 'otp secret',
  `otp_try_count` 		    int(2) 				      NOT NULL DEFAULT 0 COMMENT 'otp try count',
  `otp_max_count` 		    int(2) 				      NOT NULL DEFAULT 0 COMMENT 'otp max count',
  `otp_authenticated_at`  timestamp 				  NULL 	   DEFAULT NULL comment 'otp 인증 시간',
  `password_updated_at`   timestamp           NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at`    		    timestamp           NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    		    timestamp           NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`seq`),
  UNIQUE KEY `uix-admin_member-uuid` (`uuid`),
  KEY `idx-admin_member-email` (`email`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT 'admin member';