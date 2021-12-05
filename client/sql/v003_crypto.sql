-- `t_wallet_info`
CREATE TABLE `t_wallet_info`
(
  `seq`         bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid`        varchar(64)         NOT NULL COMMENT 'wallet uuid',
  `member_id`   varchar(64)         NOT NULL COMMENT 'wallet owner uuid',
  `asset`       varchar(30)         NOT NULL COMMENT 'type of wallet assets (ex> LoveCoin ...)',
  `address`     varchar(255)        NOT NULL COMMENT 'wallet address (ex> 0xaaaaaaaa..)',
  `private_key` varchar(255)        NOT NULL COMMENT 'wallet private key',
  `balance`     decimal(30, 8)      NOT NULL COMMENT 'balance',
  `created_at`  timestamp           NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  timestamp           NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`seq`),
  UNIQUE KEY `uix-wallet_info-uuid` (`uuid`),
  KEY `idx-wallet_info-address` (`address`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT 'wallet info';

-- `t_wallet_history`
CREATE TABLE `t_wallet_history`
(
  `seq`                    bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `asset`                  varchar(30)         NOT NULL COMMENT 'type of asset corresponding to this history',
  `member_id`              varchar(64)         NOT NULL COMMENT 'uuid of owner of this history',
  `wallet_id`              varchar(64)         NOT NULL COMMENT 'uuid of wallet of this history',
  `type`                   varchar(30)         NOT NULL COMMENT 'history type (ex> DEPOSIT, WITHDRAW, ..)',
  `event_type`             varchar(30)         NOT NULL COMMENT 'event type (BOARD, EXTERNAL, REGISTER, ..)',
  `event_id`               varchar(64)         NOT NULL COMMENT 'event id',
  `event_status`           varchar(30)         NOT NULL COMMENT 'event status (PENDING, DONE, ..)',
  `amount`                 decimal(25, 8)      NOT NULL COMMENT 'amount',
  `fee_amount`             decimal(25, 8)      NOT NULL COMMENT 'fee',
  `result_amount`          decimal(25, 8)      NOT NULL COMMENT 'result amount',
  `external_txid`          varchar(255)        NULL     DEFAULT NULL COMMENT 'txid for external event',
  `external_address`       varchar(255)        NULL     DEFAULT NULL COMMENT 'address for external event',
  `created_at`             timestamp           NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`             timestamp           NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`seq`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT 'wallet history';