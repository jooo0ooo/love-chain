-- `t_ob_auth`
CREATE TABLE `t_ob_auth_log`
(
  `seq`                 bigint(20) unsigned  NOT NULL AUTO_INCREMENT,
  `client_info`         varchar(256)         NULL     DEFAULT NULL COMMENT 'value set by client',
  `code`                varchar(256)         NULL     DEFAULT NULL COMMENT 'code returned when user auth successful',
  `scope`               varchar(256)         NULL     DEFAULT NULL COMMENT 'access token permission range',
  `error`               varchar(512)         NULL     DEFAULT NULL COMMENT 'error code',
  `error_description`   varchar(512)         NULL     DEFAULT NULL COMMENT 'error description',
  `created_at`          timestamp            NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`seq`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT 'openbanking authorize log';

-- `t_ob_token`
CREATE TABLE `t_ob_token`
(
  `seq`             bigint(20) unsigned  NOT NULL AUTO_INCREMENT,
  `user_seq`        varchar(256)         NOT NULL COMMENT 'user seq',
  `access_token`    varchar(512)         NULL     DEFAULT NULL COMMENT 'access token issued by openbanking',
  `expires_in`      varchar(256)         NULL     DEFAULT NULL COMMENT 'access token expire time',
  `refresh_token`   varchar(512)         NULL     DEFAULT NULL COMMENT 'refresh token for renewing access token',
  `scope`           varchar(256)         NULL     DEFAULT NULL COMMENT 'access token permission range',
  `user_seq_no`     varchar(256)         NULL     DEFAULT NULL COMMENT 'user num by openbanking',
  `rsp_code`        varchar(256)         NULL     DEFAULT NULL COMMENT 'error code',
  `rsp_message`     varchar(512)         NULL     DEFAULT NULL COMMENT 'error description',
  `created_at`      timestamp            NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`      timestamp            NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`seq`),
  UNIQUE KEY `uix-ob_token-access_token` (`access_token`),
  UNIQUE KEY `uix-ob_token-user_seq_no` (`user_seq_no`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT 'openbanking token';
