-- `t_member`
CREATE TABLE `t_member`
(
  `seq`           bigint(20)    unsigned NOT NULL AUTO_INCREMENT,
  `uuid`          varchar(64)            NOT NULL COMMENT 'member uuid',
  `name`          varchar(50)            NOT NULL COMMENT 'member name',
  `nickname`      varchar(50)            NOT NULL COMMENT 'member nickname',
  `email`         varchar(128)           NOT NULL COMMENT 'member email',
  `password`      varchar(256)           NOT NULL COMMENT 'member password',
  `gender`        varchar(10)            NOT NULL COMMENT 'member gender',
  `birth_date`    varchar(20)            NOT NULL COMMENT 'member birth date',
  `nationality`   varchar(10)            NOT NULL COMMENT 'member nationality',
  `phone`         varchar(20)            NOT NULL COMMENT 'member phone',
  `status`        varchar(30)            NOT NULL DEFAULT 'CREATED' COMMENT 'user status (CREATED, ACTIVE, BLOCKED, DORMANT, LEAVED_REQUESTED, LEAVED)',
  `access_token`  varchar(64)            NOT NULL COMMENT 'access token for external api',
  `created_at`    timestamp              NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    timestamp              NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`seq`),
  UNIQUE KEY `uix-member-uuid` (`uuid`),
  KEY `idx-member-email` (`email`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT 'member';

-- `t_id_info`
CREATE TABLE `t_id_info`
(
  `seq`           bigint(20)    unsigned NOT NULL AUTO_INCREMENT,
  `uuid`          varchar(64)            NOT NULL COMMENT 'ID info uuid',
  `member_id`     varchar(64)            NOT NULL COMMENT 'member name',
  `id_number`     varchar(255)           NOT NULL COMMENT 'member nickname',
  `picture`       varchar(255)           NOT NULL COMMENT 'member email',
  `status`        varchar(30)            NOT NULL DEFAULT 'SUBMITTED' COMMENT 'id info status (SUBMITTED, APPROVED, REJECTED)',
  `admin_memo`    varchar(255)           NULL     DEFAULT NULL COMMENT 'member email',
  `created_at`    timestamp              NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    timestamp              NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`seq`),
  UNIQUE KEY `uix-id_info-uuid` (`uuid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT 'ID info';

-- `t_lv_pin`
CREATE TABLE `t_lv_pin`
(
  `seq`           bigint(20)    unsigned NOT NULL AUTO_INCREMENT,
  `member_id`     varchar(64)            NOT NULL COMMENT 'member name',
  `pin`           varchar(256)           NOT NULL COMMENT 'lv pin',
  `created_at`    timestamp              NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    timestamp              NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`seq`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT 'lv pin';

-- `t_board`
CREATE TABLE `t_board`
(
  `seq`           bigint(20)    unsigned NOT NULL AUTO_INCREMENT,
  `uuid`          varchar(64)            NOT NULL COMMENT 'board uuid',
  `member_id`     varchar(64)            NOT NULL COMMENT 'member name',
  `text_type`     varchar(10)            NOT NULL COMMENT 'plain or hash',
  `payment_type`  varchar(10)            NOT NULL COMMENT 'won or lv token',
  `is_private`    varchar(10)            NOT NULL COMMENT 'public or private',
  `board_text`    varchar(256)           NOT NULL COMMENT 'board text',
  `status`        varchar(30)            NOT NULL DEFAULT 'SUBMITTED' COMMENT 'board status (SUBMITTED, APPROVED, REJECTED)',
  `tx_id`         varchar(256)           NULL     DEFAULT NULL COMMENT 'tx id',
  `confirm_count` int(10)                NOT NULL DEFAULT '0' COMMENT 'block confirm count',
  `nickname`      varchar(256)           NOT NULL COMMENT 'writer nickname',
  `created_at`    timestamp              NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    timestamp              NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`seq`),
  UNIQUE KEY `uix-board-uuid` (`uuid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT 'board';