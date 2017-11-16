CREATE TABLE `news` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键自增',
  `title` varchar(80) NOT NULL DEFAULT '' COMMENT '标题',
  `author` varchar(50) NOT NULL DEFAULT '' COMMENT '作者',
  `summary` varchar(255) NOT NULL DEFAULT '' COMMENT '简介',
  `content` text NOT NULL COMMENT '新闻内容',
  `status` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '状态：0隐藏，1显示',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='新闻表';



CREATE TABLE `user_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键自增',
  `email` varchar(120) NOT NULL DEFAULT '' COMMENT '邮箱',
  `password` varchar(64) NOT NULL DEFAULT '' COMMENT '密码',
  `name` varchar(35) NOT NULL DEFAULT '' COMMENT '用户姓名',
  `nick` varchar(30) NOT NULL DEFAULT '' COMMENT '昵称',
  `icon` varchar(150) NOT NULL DEFAULT '' COMMENT '用户图像',
  `remark` longtext NOT NULL COMMENT '详细资料',
  `level` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '用户等级',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_email` (`email`),
  UNIQUE KEY `uk_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

